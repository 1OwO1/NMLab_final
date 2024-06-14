import cv2
import mediapipe as mp
import numpy as np
import pandas as pd
import time
import random

import sys
sys.path.append("..")
from gesture.lm_processing import lm_to_np, align_points, remove_reference_points

# def beep():
#     while True:
#         print('\a')
#         sleep(1)

# t = Thread(target = beep)
# t.start()

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
save_data = pd.DataFrame(columns=[f'x_{i}' for i in range(255)] + ['label'])
for i in range(256):
    if i == 255:
        save_data[save_data.columns[i]] = pd.Series([], dtype='string')
    else:
        save_data[save_data.columns[i]] = pd.Series([], dtype='float64')

label = 'click'
click_count = 0
no_click_count = 0

lm_arr_histoty = []
lm_arr_history_time = []
lm_arr_histoty_raw = []

clicked = False

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
            handedness = results.multi_handedness[idx].classification[0].label

            arr = np.array([])

            if handedness == 'Right':
                arr = lm_to_np(lm, False)
                # print(repr(preprocess_lm(lm, False)))
            elif handedness == 'Left':
                arr = lm_to_np(lm, True)
                # print(repr(preprocess_lm(lm, True)))

            dist = np.linalg.norm(arr[5] - arr[0])
            arr = arr - np.average(arr, axis=0)
            arr = arr / dist

            # after_tf = align_points(arr[0], arr[5], arr[17], arr)
            # after_tf = remove_reference_points(after_tf)

            lm_arr_histoty.append(arr)
            lm_arr_history_time.append(time.time())
            if len(lm_arr_histoty) == 5:
                lm_arr_histoty.pop(0)
                lm_arr_history_time.pop(0)

            if clicked:
                lms = np.array(lm_arr_histoty)
                time_arr = np.array(lm_arr_history_time)
                time_arr = (time_arr - time_arr[0])[1:]

                new_row = np.concatenate((lms.flatten(), time_arr, [label]))
                save_data.loc[len(save_data)] = new_row
                print(click_count, no_click_count)
                
                clicked = False
                

            
            # new_row = np.concatenate((after_tf.flatten(), [labels[label_idx]]))
            # save_data.loc[len(save_data)] = new_row

            # print(len(save_data))

            mp_drawing.draw_landmarks(frame, lm, mp_hands.HAND_CONNECTIONS)

    # Display the frame
    cv2.imshow('Gesture Data', frame)

    key = cv2.waitKey(10)
    if key == ord('q'):
        break
    elif key == ord(' '):
        clicked = True
        label = 'click'
        click_count += 1
        print(label)
    elif key == ord('n'):
        clicked = True
        label = 'not click'  
        no_click_count += 1
        print(label)

# save dataframe as csv
save_data.to_csv('pinch_gesture/pinch_gesture_data_new.csv', index=False)

# Release the webcam and close the window
cap.release()
cv2.destroyAllWindows()
