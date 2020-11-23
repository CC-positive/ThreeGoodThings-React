#!/bin/bash
su - << EOF
cd /home/centos/deploy/ThreeGoodThings-React
yarn start > yarn_start.log
EOF
