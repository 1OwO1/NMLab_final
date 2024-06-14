import cv2
import mediapipe as mp
import numpy as np
import pandas as pd
from time import sleep
from math import sqrt
import tensorflow as tf
import time

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

model = tf.keras.models.load_model('pinch_gesture/pinch_model.keras')

lm_arr_histoty = []
lm_arr_history_time = []

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

            dist = np.linalg.norm(arr[5] - arr[0])
            arr = arr - np.average(arr, axis=0)
            arr = arr / dist

            lm_arr_histoty.append(arr)
            lm_arr_history_time.append(time.time())
            if len(lm_arr_histoty) == 5:
                lm_arr_histoty.pop(0)
                lm_arr_history_time.pop(0)

                lms = np.array(lm_arr_histoty)
                time_arr = np.array(lm_arr_history_time)
                time_arr = (time_arr - time_arr[0])[1:]

                input_arr = np.reshape(np.concatenate((lms.flatten(), time_arr)), (1, 255))

                # Make predictions
                predictions = model.predict(input_arr)

                # Double verify
                old_dist = np.linalg.norm(lms[0, 4] - lms[0, 8])
                new_dist = np.linalg.norm(lms[3, 4] - lms[3, 8])

                if predictions[0, 0] < 0.65:
                    if old_dist - new_dist > 0.1:
                        print("click")
                    else:
                        print("idle")
                else:
                    print("idle")

            mp_drawing.draw_landmarks(frame, lm, mp_hands.HAND_CONNECTIONS)

    # Display the frame
    cv2.imshow('Gesture Data', frame)

    key = cv2.waitKey(10)
    if key == ord('q'):
        break

# Release the webcam and close the window
cap.release()
cv2.destroyAllWindows()
