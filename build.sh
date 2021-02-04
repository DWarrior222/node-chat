#!/bin/sh
APP_NAME="node-chat"

rm -rf dist node_modules

npm i

npm run build

rm -rf output

mkdir -p output/$APP_NAME

#拷贝代码文件
cp -r dist/*  output/$APP_NAME

cd output

#打包
tar -zcf $APP_NAME.tar.gz  $APP_NAME/
rm -rf $APP_NAME


scp -i ~/.ssh/id_rsa_travis -r $APP_NAME.tar.gz root@49.235.241.244:/usr/share/nginx/html/web/
ssh -i ~/.ssh/id_rsa_travis root@49.235.241.244 -o StrictHostKeyChecking=no "cd /usr/share/nginx/html/web/ && rm -rf $APP_NAME/ && tar -xvf $APP_NAME.tar.gz && rm -rf $APP_NAME.tar.gz"