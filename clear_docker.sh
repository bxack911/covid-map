sudo docker rm -vf $(docker ps -a -q)
sudo docker rmi -f $(docker images -a -q)