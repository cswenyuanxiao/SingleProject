#!/bin/bash

# 构建站点到 public 目录
echo "Building site..."
hugo

# 如果没有初始化 git，则先初始化
if [ ! -d .git ]; then
  echo "Initializing git repository..."
  git init
  git add .
  git commit -m "Initial commit"
fi

# 检查是否已存在 gh-pages 分支
if git rev-parse --verify gh-pages >/dev/null 2>&1; then
  echo "Updating gh-pages branch..."
else
  echo "Creating gh-pages branch..."
  git checkout -b gh-pages
fi

# 将 public 目录内容推送到 gh-pages 分支
echo "Preparing deployment..."
rm -rf /tmp/hugo-public
cp -r public /tmp/hugo-public
git checkout gh-pages
rm -rf *
cp -r /tmp/hugo-public/* .
git add .
git commit -m "Deploy website - $(date)"

# 提示用户推送到 GitHub
echo ""
echo "=========================================================="
echo "Deployment files prepared! Now run:"
echo "git remote add origin https://github.com/USERNAME/REPO.git (如果尚未添加)"
echo "git push -u origin gh-pages --force"
echo "=========================================================="
echo ""
echo "然后在 GitHub 仓库设置中启用 GitHub Pages，选择 gh-pages 分支作为源。" 