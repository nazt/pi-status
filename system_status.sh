#!/bin/bash

total=`grep -E 'MemTotal' /proc/meminfo | egrep '[0-9.]{4,}' -o`
free=`grep -E 'MemFree' /proc/meminfo | egrep '[0-9.]{4,}' -o`
temp=`cat /sys/class/thermal/thermal_zone0/temp`

echo "{\"ram\":{\"free\":$free,\"total\":$total},\"temp\":$temp}"

