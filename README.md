# K-GESTURE: Kiosk with Gesture-Enabled Smart Touchless User Response Environment

This is a final project of NM Lab. In this project we create K-GESTURE, a system that combines a gesture-controlled user experience with a secure credential system for accessing remote services.

To try this system, please follow the steps below to run the independent service in each folder.

`frontend`

For the best user experience, we recommend using our meticulously designed UI on a 13.3-inch display.

Some functions are not availible on larger screen.

```
cd ./frontend
npm install
npm start
```

`backend server`:

maybe you should modify "c" to capital "C" after you install Crypto

change the address in each file to your IP

```
cd rpi_server
pip install -r requirements.txt
python new_server.py
```


`backend Database`:
```
cd rpi_server
pip install -r requirements.txt
python DB.py
```


`backend rpi`:

Change requirements.txt to other file name, and change requirements_rpi.txt file name into requirements.txt

```
cd rpi_server
pip install -r requirements.txt
python client.py
```


`gesture`:

```
cd ./gesture
pip install -r requirements.txt
python hand_tracking.py
```
