# GitHub Actions 使用手册

## 目录

1. [GitHub Actions 简介](#github-actions-简介)
2. [基本概念](#基本概念)
3. [工作流配置](#工作流配置)
4. [触发器](#触发器)
5. [作业和步骤](#作业和步骤)
6. [环境变量和密钥](#环境变量和密钥)
7. [矩阵构建](#矩阵构建)
8. [缓存依赖](#缓存依赖)
9. [构建和部署](#构建和部署)
10. [自定义操作](#自定义操作)
11. [最佳实践](#最佳实践)
12. [常见问题解答](#常见问题解答)

## GitHub Actions 简介

GitHub Actions 是 GitHub 提供的持续集成和持续部署（CI/CD）平台，允许你自动化软件开发工作流程。通过 GitHub Actions，你可以构建、测试和部署代码，以及自动化其他各种任务。

### GitHub Actions 的优势

- **集成于 GitHub**：无需使用外部 CI/CD 工具
- **免费额度**：对公共仓库完全免费，私有仓库有每月免费额度
- **多平台支持**：支持 Linux、Windows 和 macOS
- **可复用的工作流**：社区提供了大量现成的工作流模板
- **矩阵构建**：可以在多个操作系统和语言版本上测试代码

## 基本概念

在深入了解 GitHub Actions 之前，先熟悉一些基本概念：

### 工作流（Workflow）

工作流是一个可配置的自动化过程，由一个或多个作业组成。工作流由 YAML 文件定义，存储在仓库的 `.github/workflows` 目录中。

### 事件（Event）

事件是触发工作流的特定活动，如推送代码、创建拉取请求或发布版本。

### 作业（Job）

作业是工作流中的一组步骤，在同一运行器上执行。默认情况下，多个作业并行运行，但也可以配置为按顺序运行。

### 步骤（Step）

步骤是可以在作业中运行命令的单个任务。步骤可以是一个操作或 shell 命令。

### 操作（Action）

操作是 GitHub Actions 平台的最小可移植构建块，可以组合成步骤创建作业。你可以创建自己的操作，或使用 GitHub 社区创建的操作。

### 运行器（Runner）

运行器是安装了 GitHub Actions 运行器应用程序的服务器，用于执行工作流中的作业。GitHub 提供 Ubuntu Linux、Windows 和 macOS 运行器，你也可以托管自己的运行器。

## 工作流配置

### 创建工作流文件

工作流文件使用 YAML 格式，存储在仓库的 `.github/workflows` 目录中。文件扩展名为 `.yml` 或 `.yaml`。

基本工作流文件结构：

```yaml
name: 工作流名称

on: # 触发器
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs: # 作业
  build:
    runs-on: ubuntu-latest # 运行器
    
    steps: # 步骤
    - uses: actions/checkout@v3 # 检出代码
    
    - name: 步骤名称
      run: echo "Hello, GitHub Actions!"
```

### 工作流文件示例

以下是一个简单的 Node.js 项目的工作流示例：

```yaml
name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]

    steps:
    - uses: actions/checkout@v3
    
    - name: 使用 Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: 安装依赖
      run: npm ci
    
    - name: 运行测试
      run: npm test
```

## 触发器

触发器定义了何时执行工作流。以下是常用的触发器类型：

### 推送和拉取请求触发器

```yaml
on:
  push:
    branches: [ main, develop ]
    paths:
      - 'src/**'
      - 'package.json'
    tags:
      - 'v*'
  pull_request:
    branches: [ main ]
    types: [opened, synchronize, reopened]
```

### 计划触发器

使用 cron 语法按计划运行工作流：

```yaml
on:
  schedule:
    # 每天北京时间早上 8 点运行（UTC 时间 0 点）
    - cron: '0 0 * * *'
```

### 手动触发器

允许手动触发工作流：

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: '部署环境'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production
```

### 仓库调度触发器

当其他工作流完成时触发：

```yaml
on:
  workflow_run:
    workflows: ["CI"]
    branches: [main]
    types: [completed]
```

### 外部事件触发器

响应外部事件，如 webhook：

```yaml
on:
  repository_dispatch:
    types: [deploy]
```

## 作业和步骤

### 作业配置

作业可以配置多种属性：

```yaml
jobs:
  build:
    name: 构建应用
    runs-on: ubuntu-latest # 运行器类型
    timeout-minutes: 60 # 超时时间
    environment: production # 环境
    concurrency: # 并发控制
      group: production
      cancel-in-progress: true
```

### 作业依赖

控制作业的执行顺序：

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    # ...
  
  deploy:
    needs: build # 依赖 build 作业完成
    runs-on: ubuntu-latest
    # ...
```

### 条件执行

根据条件决定是否执行作业或步骤：

```yaml
jobs:
  deploy:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: 仅在主分支上执行
        if: success() && github.ref == 'refs/heads/main'
        run: echo "部署到生产环境"
```

### 步骤类型

步骤可以是操作或 shell 命令：

```yaml
steps:
  # 使用操作
  - name: 检出代码
    uses: actions/checkout@v3
  
  # 运行命令
  - name: 安装依赖
    run: npm install
  
  # 带有工作目录的命令
  - name: 构建前端
    working-directory: ./frontend
    run: npm run build
  
  # 多行命令
  - name: 多步骤构建
    run: |
      echo "第一步"
      echo "第二步"
      echo "第三步"
```

## 环境变量和密钥

### 默认环境变量

GitHub Actions 提供了许多默认环境变量：

```yaml
steps:
  - name: 打印 GitHub 信息
    run: |
      echo "仓库: ${{ github.repository }}"
      echo "分支: ${{ github.ref }}"
      echo "提交: ${{ github.sha }}"
      echo "工作流: ${{ github.workflow }}"
```

### 设置环境变量

可以在不同级别设置环境变量：

```yaml
# 工作流级别
env:
  GLOBAL_VAR: "全局变量"

jobs:
  build:
    # 作业级别
    env:
      JOB_VAR: "作业变量"
    runs-on: ubuntu-latest
    steps:
      # 步骤级别
      - name: 设置步骤变量
        env:
          STEP_VAR: "步骤变量"
        run: echo "变量: $GLOBAL_VAR, $JOB_VAR, $STEP_VAR"
```

### 使用密钥

敏感信息应存储为密钥，而不是直接在工作流文件中：

1. 在仓库设置中添加密钥（Settings > Secrets and variables > Actions）
2. 在工作流中使用密钥：

```yaml
steps:
  - name: 部署到服务器
    env:
      SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
      API_TOKEN: ${{ secrets.API_TOKEN }}
    run: |
      echo "$SSH_PRIVATE_KEY" > key.pem
      chmod 600 key.pem
      # 使用密钥进行部署
```

### 环境文件

在作业执行过程中设置环境变量：

```yaml
steps:
  - name: 设置环境变量
    run: echo "RELEASE_VERSION=1.0.0" >> $GITHUB_ENV
  
  - name: 使用环境变量
    run: echo "版本: $RELEASE_VERSION"
```

## 矩阵构建

矩阵策略允许你使用单个作业定义在不同配置下运行的多个作业：

```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [14.x, 16.x, 18.x]
        include:
          # 添加特定配置
          - os: ubuntu-latest
            node-version: 18.x
            experimental: true
        exclude:
          # 排除特定配置
          - os: windows-latest
            node-version: 14.x
      # 允许部分失败
      fail-fast: false
      # 最大并行作业数
      max-parallel: 3
    
    steps:
    - uses: actions/checkout@v3
    
    - name: 使用 Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    
    - name: 运行测试
      run: npm test
```

## 缓存依赖

缓存依赖项可以加速工作流执行：

### 使用 actions/cache

```yaml
steps:
  - uses: actions/checkout@v3
  
  - name: 缓存 npm 依赖
    uses: actions/cache@v3
    with:
      path: ~/.npm
      key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
      restore-keys: |
        ${{ runner.os }}-node-
  
  - name: 安装依赖
    run: npm ci
```

### 语言特定的缓存操作

对于常见语言，GitHub 提供了专用的缓存操作：

```yaml
# Node.js
- uses: actions/setup-node@v3
  with:
    node-version: '16'
    cache: 'npm'

# Python
- uses: actions/setup-python@v4
  with:
    python-version: '3.10'
    cache: 'pip'

# Java
- uses: actions/setup-java@v3
  with:
    java-version: '17'
    distribution: 'temurin'
    cache: 'maven'
```

## 构建和部署

### 构建和测试应用

```yaml
name: 构建和测试

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: 设置 Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: 安装依赖
      run: npm ci
    
    - name: 运行 lint
      run: npm run lint
    
    - name: 运行测试
      run: npm test
    
    - name: 构建应用
      run: npm run build
    
    - name: 上传构建产物
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: dist/
```

### 部署到 GitHub Pages

```yaml
name: 部署到 GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: 设置 Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: 安装依赖
      run: npm ci
    
    - name: 构建
      run: npm run build
    
    - name: 部署到 GitHub Pages
      uses: JamesIves/github-pages-deploy-action@v4
      with:
        folder: dist # 构建输出目录
        branch: gh-pages # 部署分支
```

### 部署到云服务器

```yaml
name: 部署到云服务器

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: 设置 SSH 密钥
      uses: webfactory/ssh-agent@v0.7.0
      with:
        ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
    
    - name: 添加服务器到已知主机
      run: ssh-keyscan -H ${{ secrets.SERVER_IP }} >> ~/.ssh/known_hosts
    
    - name: 部署到服务器
      run: |
        rsync -avz --delete ./ ${{ secrets.SSH_USER }}@${{ secrets.SERVER_IP }}:/var/www/app/
        ssh ${{ secrets.SSH_USER }}@${{ secrets.SERVER_IP }} "cd /var/www/app && npm install && npm run build && pm2 restart app"
```

### 发布到 Docker Hub

```yaml
name: 发布 Docker 镜像

on:
  push:
    tags: [ 'v*' ]

jobs:
  push:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: 登录到 Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
    
    - name: 提取元数据
      id: meta
      uses: docker/metadata-action@v4
      with:
        images: username/app-name
        tags: |
          type=semver,pattern={{version}}
          type=semver,pattern={{major}}.{{minor}}
    
    - name: 构建并推送
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
```

## 自定义操作

自定义操作是可重用的代码单元，可以在多个工作流中使用。有三种类型的操作：

### JavaScript 操作

JavaScript 操作在 Node.js 环境中运行，可以直接访问 GitHub API。

目录结构：

```
├── action.yml
├── index.js
├── node_modules/
└── package.json
```

`action.yml` 文件示例：

```yaml
name: '问候操作'
description: '向用户发送问候'
inputs:
  who-to-greet:
    description: '要问候的人'
    required: true
    default: 'World'
outputs:
  time:
    description: '问候的时间'
    value: ${{ steps.hello.outputs.time }}
runs:
  using: 'node16'
  main: 'index.js'
```

`index.js` 文件示例：

```javascript
const core = require('@actions/core');
const github = require('@actions/github');

try {
  // 获取输入
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  
  // 获取当前时间
  const time = new Date().toTimeString();
  
  // 设置输出
  core.setOutput("time", time);
  
  // 获取事件信息
  const payload = JSON.stringify(github.context.payload, null, 2);
  console.log(`事件信息: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
```

### Docker 容器操作

Docker 容器操作在 Docker 容器中运行，适合需要特定环境的操作。

目录结构：

```
├── action.yml
├── Dockerfile
└── entrypoint.sh
```

`action.yml` 文件示例：

```yaml
name: '容器操作示例'
description: '在 Docker 容器中运行命令'
inputs:
  command:
    description: '要运行的命令'
    required: true
outputs:
  result:
    description: '命令执行结果'
    value: ${{ steps.run-command.outputs.result }}
runs:
  using: 'docker'
  image: 'Dockerfile'
  args:
    - ${{ inputs.command }}
```

`Dockerfile` 示例：

```dockerfile
FROM alpine:3.16

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
```

`entrypoint.sh` 示例：

```bash
#!/bin/sh -l

echo "执行命令: $1"
RESULT=$(eval $1)

echo "::set-output name=result::$RESULT"
```

### 复合操作

复合操作将多个工作流步骤组合成一个操作，无需编写代码。

`action.yml` 文件示例：

```yaml
name: '复合操作示例'
description: '设置 Node.js 环境并安装依赖'
inputs:
  node-version:
    description: 'Node.js 版本'
    required: false
    default: '16'
runs:
  using: 'composite'
  steps:
    - name: 设置 Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ inputs.node-version }}
        cache: 'npm'
    
    - name: 安装依赖
      run: npm ci
      shell: bash
```

### 使用自定义操作

```yaml
steps:
  # 使用本地操作
  - name: 使用本地操作
    uses: ./.github/actions/my-action
    with:
      param1: value1
  
  # 使用 GitHub 仓库中的操作
  - name: 使用仓库操作
    uses: username/repo-name@v1
    with:
      param1: value1
  
  # 使用 Docker Hub 中的操作
  - name: 使用 Docker 操作
    uses: docker://alpine:3.16
    with:
      args: echo hello
```

## 最佳实践

### 工作流优化

1. **使用缓存**：缓存依赖项以加速构建
2. **并行作业**：将独立任务拆分为并行作业
3. **矩阵构建**：使用矩阵策略测试多种配置
4. **条件执行**：仅在需要时运行作业或步骤
5. **超时设置**：为作业设置合理的超时时间

```yaml
jobs:
  build:
    timeout-minutes: 10 # 防止作业卡住
    runs-on: ubuntu-latest
    steps:
      # 使用缓存
      - uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
      
      # 条件执行
      - name: 仅在主分支上部署
        if: github.ref == 'refs/heads/main'
        run: echo "部署到生产环境"
```

### 安全最佳实践

1. **使用密钥**：敏感信息存储为密钥，不要硬编码
2. **最小权限**：使用 GITHUB_TOKEN 时限制权限
3. **依赖扫描**：使用 Dependabot 扫描依赖漏洞
4. **代码扫描**：使用 CodeQL 进行安全分析

```yaml
# 限制 GITHUB_TOKEN 权限
permissions:
  contents: read
  issues: write

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      # 依赖扫描
      - name: 依赖审查
        uses: actions/dependency-review-action@v2
      
      # 代码扫描
      - name: 初始化 CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: javascript
      
      - name: 执行 CodeQL 分析
        uses: github/codeql-action/analyze@v2
```

### 工作流组织

1. **模块化**：将复杂工作流拆分为多个小工作流
2. **可重用工作流**：创建可在多个仓库中重用的工作流
3. **命名约定**：使用一致的命名约定

```yaml
# 可重用工作流 (.github/workflows/reusable.yml)
name: 可重用构建工作流

on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: '16'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci
      - run: npm run build

# 调用可重用工作流
name: 主工作流

on: [push]

jobs:
  call-build:
    uses: ./.github/workflows/reusable.yml
    with:
      node-version: '18'
```

## 常见问题解答

### 如何调试工作流？

1. **启用调试日志**：设置密钥 `ACTIONS_RUNNER_DEBUG` 和 `ACTIONS_STEP_DEBUG` 为 `true`
2. **使用 tmate 会话**：添加以下步骤进行交互式调试

```yaml
- name: 设置 tmate 会话
  uses: mxschmitt/action-tmate@v3
  if: ${{ failure() }}
```

### 如何在工作流之间共享数据？

1. **使用构件**：上传和下载构件

```yaml
# 上传构件
- name: 上传构件
  uses: actions/upload-artifact@v3
  with:
    name: my-artifact
    path: path/to/artifact/

# 下载构件
- name: 下载构件
  uses: actions/download-artifact@v3
  with:
    name: my-artifact
    path: path/to/download/
```

2. **使用缓存**：缓存依赖项或构建产物

```yaml
- name: 缓存构建产物
  uses: actions/cache@v3
  with:
    path: path/to/build/
    key: ${{ runner.os }}-build-${{ github.sha }}
```

### 如何处理工作流中的错误？

1. **继续执行**：即使某些步骤失败也继续执行

```yaml
- name: 可能失败的步骤
  run: might-fail-command
  continue-on-error: true
```

2. **条件执行**：基于前一步骤的结果执行

```yaml
- name: 第一步
  id: step1
  run: echo "::set-output name=status::success"

- name: 第二步
  if: steps.step1.outputs.status == 'success'
  run: echo "第一步成功了"
```

### 如何限制工作流的触发频率？

使用并发控制限制工作流的执行：

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### 如何在自托管运行器上运行工作流？

指定自托管运行器标签：

```yaml
jobs:
  build:
    runs-on: self-hosted # 使用自托管运行器
    # 或者指定标签
    # runs-on: [self-hosted, linux, x64]
```

---

本手册涵盖了 GitHub Actions 的基础和进阶用法，希望能帮助你更好地使用 GitHub Actions 进行持续集成和持续部署。如有更多问题，可以参考 [GitHub Actions 官方文档](https://docs.github.com/cn/actions)。