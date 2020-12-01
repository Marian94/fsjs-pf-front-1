#!/bin/bash
sudo yum update -y
sudo yum install -y docker 
sudo systemctl start docker 
sudo aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin 389683505237.dkr.ecr.us-west-1.amazonaws.com
sudo docker pull 389683505237.dkr.ecr.us-west-1.amazonaws.com/test:latest
sudo docker run -p 80:3000 389683505237.dkr.ecr.us-west-1.amazonaws.com/test
