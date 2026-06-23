// HAM10000 Dataset - 7 Disease Classes
export const DISEASES = [
  {
    id: 'mel',
    name: 'Melanoma',
    shortName: 'MEL',
    description: 'Melanoma is the most dangerous form of skin cancer. It develops from melanocytes and can spread to other parts of the body if not detected early.',
    riskLevel: 'High',
    riskColor: 'bg-red-100 text-red-800',
    percentage: 12,
    symptoms: [
      'Irregular shape or borders',
      'Multiple colors or uneven pigmentation',
      'Diameter larger than a pencil eraser',
      'Change in size, shape, or color',
      'Bleeding or itching lesion',
    ],
    recommendations: [
      'Consult a dermatologist immediately',
      'Avoid sun exposure and wear protective clothing',
      'Regular professional skin checks',
      'Consider biopsy if recommended by specialist',
    ],
  },
  {
    id: 'nv',
    name: 'Melanocytic Nevi',
    shortName: 'NV',
    description: 'Melanocytic nevi are common benign skin growths, commonly known as moles. They are usually harmless but should be monitored for changes.',
    riskLevel: 'Low',
    riskColor: 'bg-green-100 text-green-800',
    percentage: 67,
    symptoms: [
      'Round or oval shape',
      'Uniform color (brown, black, or tan)',
      'Flat or slightly raised',
      'Well-defined borders',
      'Typically less than 6mm diameter',
    ],
    recommendations: [
      'Monitor for any changes over time',
      'Protect from sun exposure',
      'Perform regular self-examinations',
      'Annual skin check-up with dermatologist',
    ],
  },
  {
    id: 'bcc',
    name: 'Basal Cell Carcinoma',
    shortName: 'BCC',
    description: 'Basal cell carcinoma is the most common form of skin cancer. It grows slowly and rarely spreads to other parts of the body.',
    riskLevel: 'Medium',
    riskColor: 'bg-yellow-100 text-yellow-800',
    percentage: 10,
    symptoms: [
      'Pearly or waxy bump',
      'Scar-like appearance',
      'Bleeding or crusting lesion',
      'Flat, scaly area',
      'Usually painless',
    ],
    recommendations: [
      'Schedule appointment with dermatologist',
      'Avoid further sun damage to the area',
      'Discuss treatment options (surgical or topical)',
      'Use strict sun protection going forward',
    ],
  },
  {
    id: 'akiec',
    name: 'Actinic Keratoses',
    shortName: 'AKIEC',
    description: 'Actinic keratoses are precancerous lesions caused by sun damage. They can potentially develop into squamous cell carcinoma if left untreated.',
    riskLevel: 'Medium',
    riskColor: 'bg-yellow-100 text-yellow-800',
    percentage: 4,
    symptoms: [
      'Rough, scaly texture',
      'Red or brown color',
      'Tender to touch',
      'Flat or slightly raised',
      'Usually on sun-exposed areas',
    ],
    recommendations: [
      'Dermatology consultation for treatment',
      'Cryotherapy (freezing treatment) options',
      'Topical medications available',
      'Strict sun protection and screening',
    ],
  },
  {
    id: 'bkl',
    name: 'Benign Keratosis',
    shortName: 'BKL',
    description: 'Benign keratosis includes seborrheic keratosis and other common, harmless skin growths. They do not transform into cancer.',
    riskLevel: 'Low',
    riskColor: 'bg-green-100 text-green-800',
    percentage: 3,
    symptoms: [
      'Raised, wart-like appearance',
      'Greasy or waxy surface',
      'Brown, black, or tan color',
      'Well-defined borders',
      'Often appear in clusters',
    ],
    recommendations: [
      'No medical treatment required',
      'Monitor for any changes',
      'Removal if cosmetically bothersome',
      'Regular observation during skin checks',
    ],
  },
  {
    id: 'df',
    name: 'Dermatofibroma',
    shortName: 'DF',
    description: 'Dermatofibroma is a benign tumor of the skin. It is harmless and typically does not require treatment unless cosmetically concerning.',
    riskLevel: 'Low',
    riskColor: 'bg-green-100 text-green-800',
    percentage: 2,
    symptoms: [
      'Firm, dome-shaped bump',
      'Red, brown, or purple color',
      'Dimple appearance when pinched',
      'Usually less than 1cm diameter',
      'Painless',
    ],
    recommendations: [
      'No treatment required if asymptomatic',
      'Surgical removal if desired for cosmetic reasons',
      'No medical intervention needed',
      'Regular monitoring during skin checks',
    ],
  },
  {
    id: 'vasc',
    name: 'Vascular Lesions',
    shortName: 'VASC',
    description: 'Vascular lesions are benign skin growths involving blood vessels. They include angiomas and hemangiomas.',
    riskLevel: 'Low',
    riskColor: 'bg-green-100 text-green-800',
    percentage: 2,
    symptoms: [
      'Red or purple color',
      'Blanches with pressure',
      'Raised or flat appearance',
      'Variable size',
      'Painless',
    ],
    recommendations: [
      'No treatment if asymptomatic',
      'Laser therapy options available',
      'Cosmetic removal possible if desired',
      'Regular monitoring for any changes',
    ],
  },
] as const

export type Disease = (typeof DISEASES)[number]

export const STATS = {
  diseaseClasses: 7,
  trainingImages: 10015,
  modelType: 'CNN Deep Learning',
  accuracy: '~90%',
}

export const FEATURES = [
  {
    icon: 'Brain',
    title: 'Deep Learning Powered',
    description: 'Advanced CNN trained on HAM10000 dataset for accurate classification',
  },
  {
    icon: 'Zap',
    title: 'Real-Time Classification',
    description: 'Instant results with confidence scores for each prediction',
  },
  {
    icon: 'Upload',
    title: 'Image Upload & Camera',
    description: 'Upload dermatoscopic images or capture directly from your device',
  },
  {
    icon: 'TrendingUp',
    title: 'Confidence Scoring',
    description: 'View top predictions and probability distributions',
  },
  {
    icon: 'FileText',
    title: 'Disease Information',
    description: 'Comprehensive details about detected lesions and recommendations',
  },
  {
    icon: 'Lock',
    title: 'Secure Processing',
    description: 'All analysis performed locally on your device',
  },
]

export const WORKFLOW_STEPS = [
  { step: 1, title: 'Upload Image', description: 'Upload or capture dermatoscopic image' },
  { step: 2, title: 'Image Preprocessing', description: 'Normalize and prepare image data' },
  { step: 3, title: 'Feature Extraction', description: 'Extract relevant visual features' },
  { step: 4, title: 'CNN Prediction', description: 'Run deep learning classification model' },
  { step: 5, title: 'Confidence Calculation', description: 'Calculate prediction probabilities' },
  { step: 6, title: 'Result Generation', description: 'Generate comprehensive analysis report' },
]

export const FAQ_ITEMS = [
  {
    question: 'How accurate is the model?',
    answer:
      'The CNN model achieves approximately 90% accuracy on the HAM10000 test set. However, this tool is intended for educational and research purposes only and should not replace professional dermatological diagnosis.',
  },
  {
    question: 'What dataset is used for training?',
    answer:
      'The model is trained on the HAM10000 (Human Against Machine with 10,000 Training Images) dataset, a benchmark dermatology dataset containing 10,015 dermatoscopic images of pigmented skin lesions.',
  },
  {
    question: 'Which diseases can be detected?',
    answer:
      'The model can classify 7 types of skin lesions: Melanoma, Melanocytic Nevi, Basal Cell Carcinoma, Actinic Keratoses, Benign Keratosis, Dermatofibroma, and Vascular Lesions.',
  },
  {
    question: 'Is my image stored or used for training?',
    answer:
      'No. All image processing is performed locally on your device. Images are not stored on any server, uploaded to external services, or used for model retraining.',
  },
  {
    question: 'Can this tool replace a dermatologist?',
    answer:
      'Absolutely not. This tool is intended for educational and research purposes only. Always consult with a qualified dermatologist for professional medical diagnosis and treatment recommendations.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'The model accepts JPG, JPEG, and PNG image formats. For best results, use clear, high-resolution dermatoscopic images taken under consistent lighting conditions.',
  },
]
