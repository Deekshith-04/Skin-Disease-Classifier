from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model("skin_model.h5")

class_names = [
    "akiec",
    "bcc",
    "bkl",
    "df",
    "mel",
    "nv",
    "vasc"
]

full_names = {
    "akiec": "Actinic Keratoses",
    "bcc": "Basal Cell Carcinoma",
    "bkl": "Benign Keratosis",
    "df": "Dermatofibroma",
    "mel": "Melanoma",
    "nv": "Melanocytic Nevus",
    "vasc": "Vascular Lesion"
}


@app.get("/")
def home():
    return {"message": "Skin Disease API Running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    
    image_bytes = await file.read()

    image = Image.open(io.BytesIO(image_bytes))
    image = image.convert("RGB")
    image = image.resize((224, 224))

    img = np.array(image).astype(np.float32)

    img = tf.keras.applications.efficientnet.preprocess_input(img)

    img = np.expand_dims(img, axis=0)

    prediction = model.predict(img)

    predicted_index = int(np.argmax(prediction))

    confidence = float(np.max(prediction)) * 100

    if confidence < 60:
        return {
            "prediction": "Unknown",
            "confidence": confidence,
            "message": "Please upload a valid skin lesion image."
        }
    disease_code = class_names[predicted_index]

    return {
        "prediction": full_names[disease_code],
        "confidence": round(confidence, 2),
        "probabilities": {
            class_names[i]: float(prediction[0][i] * 100)
            for i in range(len(class_names))
        }
    }
import uvicorn

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)