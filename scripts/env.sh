#!/bin/bash
export REACT_APP_OAUTH_CLIENT_ID=`aws ssm get-parameter --name REACT_APP_OAUTH_CLIENT_ID --query "Parameter.Value" --with-decryption --output text`
