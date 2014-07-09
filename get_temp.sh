#!/bin/bash

NODE_JS_HOME="/opt/node"
PATH="$PATH:$NODE_JS_HOME/bin"
export PATH

/opt/vc/bin/vcgencmd measure_temp | tee /home/pi/pi-status/temp.txt
node /home/pi/pi-status/upload.js
