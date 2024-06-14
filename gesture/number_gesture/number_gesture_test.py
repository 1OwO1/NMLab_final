import cv2
import mediapipe as mp
import numpy as np
import pandas as pd
from time import sleep
from math import sqrt
import tensorflow as tf

import sys
sys.path.append("..")
from gesture.lm_processing import lm_to_np, align_points, remove_reference_points

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=False,  # Use for live video
    max_num_hands=2,  # Maximum number of hands to detect
    min_detection_confidence=0.5,  # Minimum confidence value for detection
    min_tracking_confidence=0.5)  # Minimum confidence value for tracking

# Initialize MediaPipe Drawing
mp_drawing = mp.solutions.drawing_utils

# Capture video from the webcam
cap = cv2.VideoCapture(0)

# initialize dataframe
# save_data = pd.DataFrame(columns=[f'x_{i}' for i in range(57)] + ['label'])
# for i in range(58):
#     if i == 57:
#         save_data[save_data.columns[i]] = pd.Series([], dtype='string')
#     else:
#         save_data[save_data.columns[i]] = pd.Series([], dtype='float64')

# labels = ['others', 'one', 'two', 'three', 'four']
# label_idx = 0
model = tf.keras.models.load_model('number_gesture/number_model_3.keras')

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        break

    frame = cv2.flip(frame, 1)

    # Convert the frame color from BGR to RGB
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Process the frame and detect hands
    results = hands.process(frame_rgb)

    # Draw hand annotations on the frame
    if results.multi_hand_landmarks:
        for idx, hand_landmarks in enumerate(zip(results.multi_hand_landmarks, results.multi_hand_world_landmarks)):
            lm = hand_landmarks[0]
            world_lm = hand_landmarks[1]
            label = results.multi_handedness[idx].classification[0].label

            arr = np.array([])

            if label == 'Right':
                arr = lm_to_np(lm, False)
                # print(repr(preprocess_lm(lm, False)))
            elif label == 'Left':
                arr = lm_to_np(lm, True)
                # print(repr(preprocess_lm(lm, True)))

            after_tf = align_points(arr[0], arr[5], arr[17], arr)
            after_tf = remove_reference_points(after_tf)

            # print(after_tf.shape)
            after_tf = np.reshape(after_tf, (1, 57))
            # Make predictions
            predictions = model.predict(after_tf)

            # If it's a classification model, get the class with the highest probability
            predicted_class = np.argmax(predictions, axis=1)

            print(predicted_class)

            mp_drawing.draw_landmarks(frame, lm, mp_hands.HAND_CONNECTIONS)

    # Display the frame
    cv2.imshow('Gesture Data', frame)

    key = cv2.waitKey(10)
    if key == ord('q'):
        break

# Release the webcam and close the window
cap.release()
cv2.destroyAllWindows()
