from magicswitchbot import MagicSwitchbot
import time, logging
import os

logging.basicConfig(level=logging.DEBUG)

os.system(“sudo hciconfig hci0 down”)
os.system(“sudo hciconfig hci0 up”)

MAC = "00:11:22:33:44:55"
PASSWORD = None

device = MagicSwitchbot(mac=MAC, connect_timeout=15, disconnect_timeout=10, password=PASSWORD)

print(f"Connecting to MagicSwitchbot device at {MAC}...")

res = device.get_battery()

if res:

    print(f"Connected to MagicSwitchbot device at {MAC} with {res}% of battery remaining")

    time.sleep(1)

    print("Turning on...")

    ok = device.push()

    if ok:
        print("Command executed successfully")

    else:
        print("Error sending command")

else:
    print("Can not connect to device")
