# 🩺 AI Skin Disease Classification

An AI-powered web application for skin disease classification using Deep Learning, TensorFlow, FastAPI, and Next.js. Users can upload skin lesion images and receive disease predictions with confidence scores and probability distributions.

---

## 🌐 Live Demo

🔗 Demo: https://your-demo-link.vercel.app

---

## 📌 Features

- Upload skin lesion images
- AI-powered disease prediction
- Confidence score calculation
- Probability distribution for all classes
- Invalid image detection
- Analysis history tracking
- Responsive modern UI
- Browser-based usage with no installation required

---

## 🧠 Diseases Supported

The model is trained on the HAM10000 dataset and can classify:

| Disease Code | Disease Name |
|-------------|-------------|
| AKIEC | Actinic Keratoses |
| BCC | Basal Cell Carcinoma |
| BKL | Benign Keratosis |
| DF | Dermatofibroma |
| MEL | Melanoma |
| NV | Melanocytic Nevus |
| VASC | Vascular Lesion |

---

## 📊 Dataset

### HAM10000 Dataset

The Human Against Machine with 10,000 Training Images (HAM10000) dataset contains dermatoscopic images of common pigmented skin lesions.

Dataset Link:

https://www.kaggle.com/datasets/kmader/skin-cancer-mnist-ham10000

---

## 🏗️ Project Architecture

```text
User Uploads Image
        │
        ▼
Next.js Frontend
        │
        ▼
FastAPI Backend
        │
        ▼
TensorFlow Model
        │
        ▼
Prediction Result
        │
        ▼
Confidence & Probabilities
```

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- Python

### Deep Learning

- TensorFlow
- NumPy
- Pillow

### Deployment

- Vercel (Frontend)
- Render / Railway (Backend)

---

## 📷 Screenshots

### Home Page

![Home Page](screenshots/home-page.png)

### Upload Page

![Upload Page](screenshots/upload-page.png)

### Analysis Page

![Analysis Page](screenshots/analysis-page.png)

### Results Page

![Results Page](screenshots/results-page.png)

### Invalid Image Detection

![Invalid Page](screenshots/invalid-page.png)

### History Page

![History Page](screenshots/history-page.png)

---

## 📈 Model Information

### Architecture

- EfficientNetB0
- TensorFlow/Keras
- Image Size: 224 × 224
- RGB Images
- Softmax Classification Layer

### Preprocessing

- Image Resize (224×224)
- RGB Conversion
- Tensor Conversion
- EfficientNet Preprocessing

---

## 🚀 Future Improvements

- Grad-CAM Visualizations
- Doctor Recommendation System
- Disease Information Database
- PDF Medical Reports
- User Authentication
- Cloud Storage
- Mobile Application
- Multi-language Support

---

## 📂 Project Structure

```text
Skin-Disease-Classifier
│
├── screenshots/
├── skin-disease-classifier/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── lib/
│   └── utils/
│
├── app.py
├── skin_model.h5
├── requirements.txt
├── README.md
└── vercel.json
```

---


## ⚠️ Disclaimer

This project is developed for educational and research purposes only and should not be considered a replacement for professional medical diagnosis.
