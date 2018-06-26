#!/usr/bin/env bash

echo -e "\033[32m"
echo "##############################################"
echo "#   usamusicschool Auto-Launch System v1.0   #"
echo "##############################################"
echo "#请注意查看屏幕回显，确保上线完成            #"
echo "#build方式：服务器端拉取当前分支代码并build  #"
echo "#dist方式：本地build，上传dist文件夹到服务器 #"
echo "##############################################"
echo -e "\033[0m"

if [ $# = 2 ];then
    if [ $1 = "test" ];then
        echo "当前上线服务器：test-server"
        addr="root@47.104.111.200"
        path="/var/www/html/"
    else
        echo "Usage: $0 [test] [build|dist]"
        echo "You provided $1 as parameter 1."
    fi
else
    echo "Usage: $0 [test] [build|dist]"
    echo "You provided $# parameters,but 2 is required."
fi

if [ $2 = "dist" ];then
    npm run build
    tar -cf dist.tar dist
    tar -cf dist.tar dist
    echo "输入服务器密码，上传dist文件夹"
    scp -r dist.tar $addr:$path
    echo "再次输入服务器密码，确认覆盖dist"
    ssh -tt "$addr" "cd $path && tar -xvf dist.tar"
elif [ $2 = "build" ];then
    ssh -tt "$addr" "cd $path && git pull && git log -n 1 -p && npm run build"
else
    echo "Usage: $0 [test] [build|dist]"
    echo "You provided $2 as method"
fi
