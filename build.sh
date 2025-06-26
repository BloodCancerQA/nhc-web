#!/usr/bin/env bash
# 保证你的build.sh脚本有任何错误就退出
set -e
# 保证你的字符集正确，如果是英文写en_US.UTF-8，如果是中文写zh_CN.UTF-8
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8

# 编译日志中打印出当前的node, npm, yarn, pnpm版本
echo "node: $(node -v)"
echo "npm: $(npm -v)"
echo "yarn: $(yarn -v)"
echo "pnpm: $(pnpm -v)"

if [ -n "$BUILD_REPO_WS" ]; then
    pnpm config set stores-dir "$BUILD_REPO_WS/.pnpm-store"
    pnpm get stores-dir
fi

# 如果NODE_ENV为production, npm5以上版本就不会安装devDependencies。
# 所以，你先把它设置为development，保证你的devDependencies依赖也会被安装。
NODE_ENV=development pnpm i  --registry=http://registry.npm.baidu-int.com

# 为生产环境构建加NODE_ENV=production.
# webpack, babel等工具会使用这个环境变量来决定会不会优化，所以再设置成production。
NODE_ENV=production pnpm build
if [ -d "output" ]; then
  rm -rf output
fi
mkdir -p output
cp -r dist/* conf output/
