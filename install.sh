echo 'chaning power saving modes for wifi connectivity'
cp 8192cu.conf /etc/modprobe.d/8192cu.conf
echo 'removing old ev3 int script'
rm -rf /etc/init.d/ev3-server
echo 'copying init script to init.d'
cp ev3-server /etc/init.d/ev3-server
echo 'making init script executable'
chmod +x /etc/init.d/ev3-server
echo 'adding sript to default run levels'
update-rc.d ev3-server defaults
echo 'done'
