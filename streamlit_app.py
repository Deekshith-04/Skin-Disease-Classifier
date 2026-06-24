import streamlit as st
import tensorflow as tf
import numpy as np
from PIL import Image
from tensorflow.keras.applications.efficientnet import preprocess_input

# ---------------- PAGE CONFIG ---------------- #

st.set_page_config(
    page_title="AI Skin Disease Classifier",
    page_icon="🩺",
    layout="wide"
)

# ---------------- CUSTOM CSS ---------------- #

st.markdown("""
<style>
.main {
    padding-top: 2rem;
}

.big-title {
    text-align: center;
    font-size: 42px;
    font-weight: bold;
    color: #1E88E5;
}

.sub-title {
    text-align: center;
    font-size: 18px;
    color: gray;
    margin-bottom: 30px;
}

.result-box {
    padding: 15px;
    border-radius: 10px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
}
</style>
""", unsafe_allow_html=True)

# ---------------- MODEL ---------------- #

@st.cache_resource
def load_skin_model():
    try:
        model = tf.keras.models.load_model("skin_model.h5")
        st.success("✅ Model loaded successfully")
        return model
    except Exception as e:
        st.error(f"❌ Model loading failed: {e}")
        st.stop()

model = load_skin_model()

# ---------------- LABELS ---------------- #

class_names = {
    "akiec": "Actinic Keratoses",
    "bcc": "Basal Cell Carcinoma",
    "bkl": "Benign Keratosis",
    "df": "Dermatofibroma",
    "mel": "Melanoma",
    "nv": "Melanocytic Nevus",
    "vasc": "Vascular Lesion"
}

labels = list(class_names.keys())

# ---------------- HEADER ---------------- #

st.markdown(
    '<div class="big-title">🩺 AI Skin Disease Classification System</div>',
    unsafe_allow_html=True
)

st.markdown(
    '<div class="sub-title">Deep Learning Based Skin Disease Prediction using EfficientNetB0</div>',
    unsafe_allow_html=True
)

st.divider()

# ---------------- MAIN UI ---------------- #

left, right = st.columns([1, 1])

with left:

    uploaded_file = st.file_uploader(
        "📤 Upload a Skin Image",
        type=["jpg", "jpeg", "png"]
    )

    if uploaded_file:

        image = Image.open(uploaded_file).convert("RGB")

        st.image(
            image,
            caption="Uploaded Image",
            use_container_width=True
        )

with right:

    if uploaded_file:

        img = image.resize((224, 224))
        img = np.array(img).astype(np.float32)

        img = preprocess_input(img)

        img = np.expand_dims(
            img,
            axis=0
        )

        with st.spinner("Analyzing image..."):
            prediction = model.predict(
                img,
                verbose=0
            )

        predicted_class = labels[np.argmax(prediction)]

        confidence = float(np.max(prediction) * 100)

        st.success("Prediction Completed")

        st.markdown("### Prediction Result")

        st.markdown(
            f"""
            <div class="result-box">
            <h3>{class_names[predicted_class]}</h3>
            <h4>Confidence: {confidence:.2f}%</h4>
            </div>
            """,
            unsafe_allow_html=True
        )

        st.progress(
            min(int(confidence), 100)
        )

        st.markdown("### Probability Distribution")

        probs = prediction[0]

        for i, label in enumerate(labels):

            st.write(
                f"{class_names[label]} : {probs[i]*100:.2f}%"
            )

# ---------------- FOOTER ---------------- #

st.divider()

st.caption(
    "Developed using TensorFlow, EfficientNetB0, Streamlit and HAM10000 Dataset"
)