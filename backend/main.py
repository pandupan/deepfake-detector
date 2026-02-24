import io
import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

# Helper class untuk SE Block agar nama layernya cocok (fc1, fc2)
class SEBlock(nn.Module):
    def __init__(self, in_channels):
        super(SEBlock, self).__init__()
        # Definisikan layer dengan nama 'fc1' dan 'fc2'
        self.fc1 = nn.Linear(in_channels, in_channels // 16)
        self.relu = nn.ReLU(inplace=True)
        self.fc2 = nn.Linear(in_channels // 16, in_channels)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        x = self.sigmoid(x)
        return x

# 1. Definisikan Arsitektur Model Utama
class EfficientNetSE(nn.Module):
    def __init__(self, num_classes=2):
        super(EfficientNetSE, self).__init__()
        
        base_model = models.efficientnet_b0(weights='IMAGENET1K_V1')
        self.feature_extractor = base_model.features
        
        in_channels = 1280
        
        self.avgpool = nn.AdaptiveAvgPool2d(1)
        
        # Gunakan SEBlock helper class yang sudah kita buat
        # Ini akan membuat layer dengan nama se_block.fc1 dan se_block.fc2
        self.se_block = SEBlock(in_channels)
        
        # Classifier untuk 2 kelas
        self.classifier = nn.Linear(in_channels, num_classes)

    def forward(self, x):
        x = self.feature_extractor(x)
        x = self.avgpool(x)
        x = torch.flatten(x, 1)
        
        se_weights = self.se_block(x)
        x = x * se_weights
        
        x = self.classifier(x)
        return x

# 2. Inisialisasi Aplikasi FastAPI
app = FastAPI(title="Deepfake Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Muat Model
model = EfficientNetSE(num_classes=2)
model.load_state_dict(torch.load("best_model.pth", map_location=torch.device('cpu')))
model.eval()

# 4. Definisikan Transformasi Gambar
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# 5. Buat Endpoint Prediksi
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    
    image_tensor = transform(image).unsqueeze(0)
    
    with torch.no_grad():
        logits = model(image_tensor)
        probabilities = torch.softmax(logits, dim=1)[0]
        predicted_class_index = torch.argmax(probabilities).item()
        
    # Asumsikan kelas 0 = Deepfake, kelas 1 = Real
    class_map = {0: "Deepfake", 1: "Real"} 
    prediction = class_map.get(predicted_class_index, "Unknown")
    probability = probabilities[predicted_class_index].item()
    
    return {
        "filename": file.filename,
        "prediction": prediction,
        "probability": f"{probability:.4f}"
    }

@app.get("/")
def read_root():
    return {"message": "Welcome to the Deepfake Detection API"}