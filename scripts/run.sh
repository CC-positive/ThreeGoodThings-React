#!/bin/bash
su - << EOF
cd /home/centos/deploy/ThreeGoodThings-React
source ./scripts/env.sh
yarn production > yarn_start.log
EOF
