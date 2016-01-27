echo 'changing permissions'
chown robot /home/robot/ev3 -R
echo 'copying init script to init.d'
cp ev3-server /etc/init.d/ev3-server
echo 'making init script executable'
chmod +x /etc/init.d/ev3-server
echo 'adding script to default run levels'
update-rc.d ev3-server defaults
echo 'done'