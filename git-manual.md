# Git 使用手册

## 目录

1. [Git 简介](#git-简介)
2. [安装与配置](#安装与配置)
3. [基础操作](#基础操作)
4. [分支管理](#分支管理)
5. [远程仓库操作](#远程仓库操作)
6. [冲突解决](#冲突解决)
7. [高级功能](#高级功能)
8. [最佳实践](#最佳实践)
9. [常见问题解答](#常见问题解答)

## Git 简介

Git 是一个分布式版本控制系统，由 Linux 之父 Linus Torvalds 在 2005 年创建。它能跟踪文件的变化，方便多人协作开发，并且可以恢复到之前的任何版本。

### Git 与其他版本控制系统的区别

- **分布式架构**：每个开发者都拥有完整的代码仓库副本
- **高效处理**：本地操作速度快，不依赖网络连接
- **数据完整性**：使用 SHA-1 哈希算法确保数据完整性
- **分支管理**：轻量级分支创建和合并

## 安装与配置

### 安装 Git

#### Windows

1. 访问 [Git 官网](https://git-scm.com/download/win) 下载安装包
2. 运行安装程序，按照向导完成安装
3. 安装完成后，可以通过命令提示符或 Git Bash 使用 Git

#### macOS

1. 通过 Homebrew 安装：`brew install git`
2. 或访问 [Git 官网](https://git-scm.com/download/mac) 下载安装包

#### Linux

- Debian/Ubuntu：`sudo apt-get install git`
- Fedora：`sudo dnf install git`
- CentOS：`sudo yum install git`

### 基本配置

安装 Git 后，需要进行一些基本配置：

```bash
# 设置用户名和邮箱
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"

# 设置默认编辑器
git config --global core.editor "编辑器名称"

# 查看配置
git config --list
```

## 基础操作

### 创建仓库

```bash
# 初始化新仓库
git init

# 克隆现有仓库
git clone <仓库URL>
```

### 文件状态

Git 中的文件有四种状态：

1. **未跟踪（Untracked）**：新文件，Git 未跟踪
2. **已修改（Modified）**：已跟踪文件被修改
3. **已暂存（Staged）**：修改已添加到暂存区
4. **已提交（Committed）**：文件已安全存储在本地数据库

### 基本工作流

```bash
# 查看文件状态
git status

# 添加文件到暂存区
git add <文件名>    # 添加指定文件
git add .          # 添加所有文件

# 提交更改
git commit -m "提交说明"

# 查看提交历史
git log
git log --oneline  # 简洁模式
```

### 撤销操作

```bash
# 撤销工作区修改
git checkout -- <文件名>

# 撤销暂存区修改
git reset HEAD <文件名>

# 修改最后一次提交
git commit --amend

# 回退到指定版本
git reset --hard <提交ID>
```

## 分支管理

分支是 Git 的核心功能之一，可以让你在不影响主线开发的情况下进行新功能开发或问题修复。

### 基本分支操作

```bash
# 查看分支
git branch          # 列出本地分支
git branch -r       # 列出远程分支
git branch -a       # 列出所有分支

# 创建分支
git branch <分支名>

# 切换分支
git checkout <分支名>

# 创建并切换分支
git checkout -b <分支名>

# 删除分支
git branch -d <分支名>    # 安全删除（会检查是否合并）
git branch -D <分支名>    # 强制删除
```

### 合并分支

```bash
# 合并指定分支到当前分支
git merge <分支名>

# 使用变基合并
git rebase <分支名>
```

## 远程仓库操作

### 添加远程仓库

```bash
# 添加远程仓库
git remote add <远程名> <仓库URL>

# 查看远程仓库
git remote -v
```

### 推送与拉取

```bash
# 推送到远程仓库
git push <远程名> <分支名>

# 从远程仓库拉取
git fetch <远程名>

# 拉取并合并（相当于 fetch + merge）
git pull <远程名> <分支名>
```

### 远程分支管理

```bash
# 跟踪远程分支
git checkout --track <远程名>/<分支名>

# 删除远程分支
git push <远程名> --delete <分支名>
```

## 冲突解决

当多人修改同一文件的同一部分时，可能会产生冲突。Git 会在合并时标记冲突区域：

```
<<<<<<< HEAD
当前分支的内容
=======
合并分支的内容
>>>>>>> 分支名
```

### 解决冲突步骤

1. 打开冲突文件，找到冲突区域
2. 编辑文件，决定保留哪些内容
3. 删除冲突标记（<<<<<<< HEAD, =======, >>>>>>> 分支名）
4. 保存文件
5. 添加到暂存区并提交

```bash
git add <冲突文件>
git commit -m "解决冲突"
```

## 高级功能

### 标签管理

```bash
# 创建标签
git tag <标签名>            # 轻量标签
git tag -a <标签名> -m "标签说明"  # 附注标签

# 查看标签
git tag

# 推送标签到远程
git push <远程名> <标签名>
git push <远程名> --tags    # 推送所有标签
```

### 储藏（Stash）

当你需要切换分支但又不想提交当前工作时，可以使用储藏功能：

```bash
# 储藏当前工作
git stash

# 查看储藏列表
git stash list

# 应用储藏
git stash apply          # 应用最近的储藏
git stash apply stash@{n}  # 应用指定的储藏

# 删除储藏
git stash drop stash@{n}

# 应用并删除储藏
git stash pop
```

### 子模块（Submodule）

```bash
# 添加子模块
git submodule add <仓库URL> <路径>

# 初始化子模块
git submodule init

# 更新子模块
git submodule update
```

### Git 钩子（Hooks）

Git 钩子是在特定事件发生时自动执行的脚本，位于 `.git/hooks` 目录下。常用钩子包括：

- `pre-commit`：提交前执行
- `post-commit`：提交后执行
- `pre-push`：推送前执行

## 最佳实践

### 提交规范

- 保持提交小而频繁
- 编写清晰的提交信息
- 使用约定式提交格式（如 `feat: 添加新功能`）

### 分支策略

- **主分支（master/main）**：稳定版本
- **开发分支（develop）**：最新开发版本
- **功能分支（feature/*）**：新功能开发
- **发布分支（release/*）**：版本发布准备
- **修复分支（hotfix/*）**：生产环境问题修复

### 工作流模型

- **Git Flow**：适合有计划发布周期的项目
- **GitHub Flow**：简化版，适合持续部署
- **GitLab Flow**：结合环境分支的工作流

## 常见问题解答

### 如何撤销已推送的提交？

```bash
# 本地撤销
git reset --hard HEAD~1

# 强制推送
git push --force
```

> 注意：这会改变历史，在共享分支上慎用！

### 如何查看特定文件的修改历史？

```bash
git log --follow <文件路径>
```

### 如何比较两个分支的差异？

```bash
git diff <分支1>..<分支2>
```

### 如何清理未跟踪的文件？

```bash
git clean -n  # 预览将删除的文件
git clean -f  # 强制删除未跟踪的文件
```

### 如何修改历史提交？

```bash
git rebase -i HEAD~3  # 交互式变基，修改最近3次提交
```

---

本手册涵盖了 Git 的基础和进阶用法，希望能帮助你更好地使用 Git 进行版本控制和协作开发。如有更多问题，可以参考 [Git 官方文档](https://git-scm.com/doc) 或 [Pro Git 书籍](https://git-scm.com/book/zh/v2)。