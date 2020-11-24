#!/bin/bash
su - << EOF
cd /home/centos/deploy/ThreeGoodThings-React
yarn --frozen-lockfile
EOF
