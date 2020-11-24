#!/bin/bash
su - << EOF
cd /home/centos/deploy/ThreeGoodThings-React
yarn production > yarn_start.log
EOF
