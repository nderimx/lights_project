import requests
from gpiozero import LED
from time import sleep

URL = "http://35.246.141.93:9090/state"
green = LED(14)
red = LED(16)

while True:
    sleep(0.5)
    r = requests.get(url = URL)
    data = r.json()
    if(data['red']==True):
        red.on()
    else:
        red.off()
    if(data['green']==True):
        green.on()
    else:
        green.off()
