import cv2
import mediapipe as mp
import pyautogui
from time import sleep
from math import sqrt
import tensorflow as tf
import numpy as np
import time
from gesture import is_pinch, is_scroll, number_of_fingers
from server import start_server, is_keyboard_mode
from lm_processing import lm_to_np, align_points, remove_reference_points

def clamp(val, min, max):
    if val > max:
        return max
    if val < min:
        return min
    return val

def map(v, range_min, range_max, map_min, map_max):
    ratio = (v - range_min) / (range_max - range_min)
    mapped_value = map_min + (ratio * (map_max - map_min))
    return mapped_value

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=False,  # Use for live video
    max_num_hands=2,  # Maximum number of hands to detect
    min_detection_confidence=0.5,  # Minimum confidence value for detection
    min_tracking_confidence=0.5)  # Minimum confidence value for tracking

# Initialize MediaPipe Drawing
mp_drawing = mp.solutions.drawing_utils

# Load models
pinch_model = tf.keras.models.load_model('pinch_gesture/pinch_model.keras')
number_model = tf.keras.models.load_model('number_gesture/number_model_3.keras')
tf.keras.utils.disable_interactive_logging()

lm_arr_histoty = []
lm_arr_history_time = []

# number_ges_dict = {2: 0, 1: 1, 4: 2, 3: 3, 0: 4}
number_ges_dict = {3: -1, 2: 0, 1: 1, 5: 2, 4: 3, 0: 4}

# Capture video from the webcam
cap = cv2.VideoCapture(0)

# Get screen size
screen_width, screen_height = pyautogui.size()
pyautogui.FAILSAFE = False

clicked = False
is_dragging = False
start_x_coord = -1
start_cursor_pos = 0

scroll_sleep_duration_default = 0.1
scroll_sleep_duration = 0.1

# start server
start_server()

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

            if label == 'Right' and is_keyboard_mode():

                arr = lm_to_np(lm, is_left=False)

                after_tf = align_points(arr[0], arr[5], arr[17], arr)
                after_tf = remove_reference_points(after_tf)
                after_tf = np.reshape(after_tf, (1, 57))
                
                predictions = number_model.predict(after_tf)
                predicted_class = number_ges_dict[np.argmax(predictions, axis=1)[0]]

                # is pinch
                if predicted_class == -1:
                    if is_dragging:
                        new_cursor_pos = round((lm.landmark[8].x - start_x_coord) * 30)
                        if new_cursor_pos > cursor_pos:
                            for i in range(new_cursor_pos - cursor_pos):
                                pyautogui.press('right', _pause=False)
                        else:
                            for i in range(cursor_pos - new_cursor_pos):
                                pyautogui.press('left', _pause=False)
                        cursor_pos = new_cursor_pos
                    
                    else:
                        is_dragging = True
                        start_x_coord = lm.landmark[8].x
                        pyautogui.moveTo(2180 / 2, 670 / 2, _pause=False) # only works on my computer
                        pyautogui.click(_pause=False)
                        cursor_pos = 0
                # is number
                else:
                    is_dragging = False

                    index_x = lm.landmark[8].x
                    index_y = lm.landmark[8].y

                    new_mouse_x = clamp(map(index_x, 0.2, 0.8, 0, screen_width), 0, screen_width)
                    new_mouse_y = screen_height - 20 - (5 - predicted_class) * 80

                    pyautogui.moveTo(new_mouse_x, new_mouse_y, _pause=False)


                # detect cursor drag
                # if is_pinch(world_lm):
                #     if is_dragging:
                #         new_cursor_pos = round((lm.landmark[8].x - start_x_coord) * 30)
                #         if new_cursor_pos > cursor_pos:
                #             for i in range(new_cursor_pos - cursor_pos):
                #                 pyautogui.press('right', _pause=False)
                #         else:
                #             for i in range(cursor_pos - new_cursor_pos):
                #                 pyautogui.press('left', _pause=False)
                #         cursor_pos = new_cursor_pos
                    
                #     else:
                #         is_dragging = True
                #         start_x_coord = lm.landmark[8].x
                #         pyautogui.moveTo(2180 / 2, 670 / 2, _pause=False) # only works on my computer
                #         pyautogui.click(_pause=False)
                #         cursor_pos = 0

                # # detect number of fingers
                # else:
                #     is_dragging = False

                #     arr = lm_to_np(lm, is_left=False)

                #     after_tf = align_points(arr[0], arr[5], arr[17], arr)
                #     after_tf = remove_reference_points(after_tf)
                #     after_tf = np.reshape(after_tf, (1, 57))

                #     # Make prediction
                #     predictions = number_model.predict(after_tf)
                #     predicted_class = np.argmax(predictions, axis=1)
                #     finger_count = number_ges_dict[predicted_class[0]]

                #     index_x = lm.landmark[8].x
                #     index_y = lm.landmark[8].y

                #     new_mouse_x = clamp(map(index_x, 0.2, 0.8, 0, screen_width), 0, screen_width)
                #     new_mouse_y = screen_height - 20 - (5 - finger_count) * 80

                #     pyautogui.moveTo(new_mouse_x, new_mouse_y, _pause=False)

            elif label == 'Right' and not is_keyboard_mode():
                # detect scroll gesture
                scroll_level = is_scroll(lm)
                if scroll_level != 0:
                    pyautogui.moveTo(screen_width / 2, screen_height / 2, _pause=False)
                    pyautogui.scroll(1 if scroll_level > 0 else -1, _pause = False)
                    sleep(scroll_sleep_duration)
                    scroll_sleep_duration = max(0, scroll_sleep_duration - 0.003)

                # otherwise, move cursor
                else:
                    scroll_sleep_duration = scroll_sleep_duration_default
                    index_x = lm.landmark[8].x
                    index_y = lm.landmark[8].y

                    new_mouse_x = clamp(map(index_x, 0.2, 0.8, 0, screen_width), 0, screen_width)
                    new_mouse_y = clamp(map(index_y, 0.2, 0.8, 0, screen_height), 0, screen_height)

                    pyautogui.moveTo(new_mouse_x, new_mouse_y, _pause=False)

            elif label == 'Left':
                # TODO: prevent clicking when scrolling
                # detect pinch
                # arr = lm_to_np(lm, is_left=True)

                # after_tf = align_points(arr[0], arr[5], arr[17], arr)
                # after_tf = remove_reference_points(after_tf)
                # after_tf_flat = np.reshape(after_tf, (1, 57))
                
                # predictions = number_model.predict(after_tf_flat)
                # predicted_class = number_ges_dict[np.argmax(predictions, axis=1)[0]]

                # # update history
                # lm_arr_histoty.append(after_tf)

                # left_pinch = False

                # if len(lm_arr_histoty) == 5:
                #     lm_arr_histoty.pop(0)

                # if len(lm_arr_histoty) == 4:
                #     # double check
                #     old_dist = np.linalg.norm(lm_arr_histoty[0][3] - lm_arr_histoty[0][6])
                #     new_dist = np.linalg.norm(lm_arr_histoty[3][3] - lm_arr_histoty[3][6])

                #     # print(new_dist)
                #     if old_dist - new_dist > 0.2:
                #         left_pinch = True
                #         print("True")
                #     else:
                #         left_pinch = False
                #         print("False")

                arr = lm_to_np(lm, is_left=True)

                dist = np.linalg.norm(arr[5] - arr[0])
                arr = arr - np.average(arr, axis=0)
                arr = arr / dist

                lm_arr_histoty.append(arr)
                lm_arr_history_time.append(time.time())

                left_pinch = False

                if len(lm_arr_histoty) == 5:
                    lm_arr_histoty.pop(0)
                    lm_arr_history_time.pop(0)

                    lms = np.array(lm_arr_histoty)
                    time_arr = np.array(lm_arr_history_time)
                    time_arr = (time_arr - time_arr[0])[1:]

                    input_arr = np.reshape(np.concatenate((lms.flatten(), time_arr)), (1, 255))

                    # Make predictions
                    predictions = pinch_model.predict(input_arr)

                    # Double verify
                    old_dist = np.linalg.norm(lms[0, 4] - lms[0, 8])
                    new_dist = np.linalg.norm(lms[3, 4] - lms[3, 8])

                    if predictions[0, 0] < 0.7:
                        if old_dist - new_dist > 0.15:
                            left_pinch = True
                        else:
                            left_pinch = False
                            print("bloc")
                    else:
                        left_pinch = False
                        print("idle")

                if clicked and not left_pinch:
                    clicked = False

                if not clicked and left_pinch:
                    pyautogui.click(_pause=False)
                    print("Click!")
                    clicked = True

            mp_drawing.draw_landmarks(frame, lm, mp_hands.HAND_CONNECTIONS)

    # Display the frame
    cv2.imshow('Hand Tracking', frame)

    # Break the loop if 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close the window
cap.release()
cv2.destroyAllWindows()
