# CropGuard — Crop Disease Detection

CropGuard is a computer-vision based crop disease detection application that uses deep learning to identify plant diseases from leaf images.

The project combines image preprocessing, convolutional neural networks, and a web interface to provide a simple workflow for analyzing a plant image and returning the predicted disease.

## Overview

The goal of the project is to make image-based crop disease detection accessible through a simple web application.

The overall pipeline is:

```text
Plant Image
     ↓
Image Preprocessing
     ↓
Normalization / Augmentation
     ↓
CNN Model
     ↓
Disease Classification
     ↓
Prediction
     ↓
Web Interface
```

The model learns visual patterns from plant leaf images and uses those patterns to classify an input image into the corresponding disease category.

## Features

* Image-based crop disease detection
* CNN-based image classification
* Image preprocessing and normalization
* Data augmentation during training
* Web-based prediction interface
* Support for analyzing uploaded/captured plant images
* Confidence-based prediction output
* Lightweight inference workflow suitable for a web application

## Tech Stack

### Machine Learning / Computer Vision

* Python
* TensorFlow
* Keras
* OpenCV
* NumPy

### Model

* Convolutional Neural Network
* ResNet-based experimentation
* Image classification

### Web Application

* Flask
* HTML
* CSS
* JavaScript

## Dataset

The project was developed using a labeled plant-disease image dataset.

The images are organized according to their disease/class labels and are processed before being passed to the model.

The preprocessing pipeline includes:

* Image resizing
* Pixel normalization
* Data augmentation
* Image format handling
* Preparation of training and validation data

The purpose of augmentation is to expose the model to variations in the training images and reduce over-reliance on the exact appearance of individual training examples.

## Image Preprocessing

Before an image is passed to the model, it is transformed into the format expected by the neural network.

A simplified version of the pipeline is:

```text
Input Image
     ↓
Resize
     ↓
Convert to required image format
     ↓
Normalize pixel values
     ↓
Prepare model input
     ↓
CNN
```

During training, augmentation techniques such as rotation, flipping, and zooming can be applied to generate additional variations of the training images.

## Model

The core of CropGuard is a convolutional neural network used for image classification.

CNNs are particularly suitable for this problem because they can learn spatial patterns from images, including:

* Leaf texture
* Color variations
* Spots and lesions
* Shape patterns
* Disease-specific visual characteristics

The model processes the input image through convolutional layers and learns increasingly higher-level visual representations before producing a class prediction.

The repository also contains the trained model artifacts/configurations used by the application.

## Training Pipeline

The training workflow can be summarized as:

```text
Dataset
   ↓
Image Loading
   ↓
Preprocessing
   ↓
Data Augmentation
   ↓
Train / Validation Split
   ↓
CNN Training
   ↓
Validation
   ↓
Model Export
```

The trained model is then used during inference rather than retraining the network for every prediction.

## Inference Pipeline

When a user submits an image:

```text
User Uploads Leaf Image
          ↓
      Image Read
          ↓
       Resize
          ↓
      Normalize
          ↓
    Model Inference
          ↓
   Class Probabilities
          ↓
 Predicted Disease
          ↓
     Display Result
```

This separates the training process from the actual prediction process used by the application.

## Patch-Based Analysis

The project also explores image patch extraction for analyzing disease prevalence within an image.

Instead of treating the complete image as a single region, the image can be divided into smaller patches, allowing localized regions to be examined.

For example:

```text
Original Leaf Image

+----+----+----+----+
| P1 | P2 | P3 | P4 |
+----+----+----+----+
| P5 | P6 | P7 | P8 |
+----+----+----+----+
| P9 |P10 |P11 |P12 |
+----+----+----+----+
```

This approach can provide additional information about how widely disease-related visual patterns are distributed across the image.

## Web Application

The machine-learning model is exposed through a web interface so that users do not need to interact directly with the Python model.

The web application handles:

1. Image upload/capture
2. Input validation
3. Image preprocessing
4. Model inference
5. Prediction processing
6. Displaying the result to the user

The application acts as the interface between the user and the trained ML model.

## Project Structure

A simplified structure is:

```text
CropGuard/
│
├── app/
│   ├── templates/
│   ├── static/
│   └── ...
│
├── model/
│   └── trained_model/
│
├── dataset/
│   └── ...
│
├── notebooks/
│   └── ...
│
├── training/
│   └── ...
│
├── app.py
├── requirements.txt
└── README.md
```

> The exact structure may differ depending on the current repository version.

## Running Locally

### Prerequisites

* Python 3.x
* pip
* Git

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
cd CropGuard
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the application:

```bash
python app.py
```

Open the local URL displayed by Flask in your browser.

## Model and Dataset Notes

Large datasets and model files may not be included directly in the repository depending on their size.

If a required model artifact or dataset is not included, download/provide it separately and place it in the expected project directory before running the application.

## Limitations

The prediction depends heavily on the quality and characteristics of the input image and the classes represented in the training dataset.

Real-world agricultural images can differ significantly from controlled dataset images because of:

* Lighting conditions
* Background noise
* Camera quality
* Multiple diseases appearing simultaneously
* Different plant varieties
* Leaf age and condition
* Environmental factors

Therefore, the model's prediction should be treated as an image-based classification result rather than a replacement for professional agricultural diagnosis.

## What I Worked On

This project gave me hands-on experience with the complete machine-learning application pipeline:

* Preparing image data
* Image preprocessing using OpenCV
* Data augmentation
* Building and training CNN models
* Evaluating classification performance
* Saving trained models
* Integrating the model with a Flask application
* Connecting machine-learning inference with a user-facing interface
* Deploying the application for web-based access

The main focus was not only training a model, but taking the trained model and turning it into an application that can actually be used through a web interface.

## Future Improvements

Potential improvements include:

* Better handling of real-world/background images
* Mobile camera optimization
* More crop and disease classes
* Improved model architectures
* Model quantization for faster inference
* Explainable predictions using techniques such as Grad-CAM
* Disease severity estimation
* Better localization of affected regions
* Continuous evaluation using field-collected images

## Author

**Jayanth CN**

