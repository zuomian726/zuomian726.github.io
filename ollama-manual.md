# Ollama 使用手册

## 简介

Ollama 是一个强大的本地大语言模型运行框架，它允许你在本地设备上运行各种开源大语言模型。本手册将指导你如何安装、配置和使用 Ollama。

## 安装指南

### macOS 安装

1. 使用 Homebrew 安装：
```bash
brew install ollama
```

2. 或直接从官网下载安装包：
   - 访问 [Ollama官网](https://ollama.ai)
   - 下载并安装最新版本的 Ollama

### Linux 安装

使用官方安装脚本：
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Windows 安装

目前 Ollama 原生 Windows 支持正在开发中，但你可以通过以下方式使用：
1. 使用 WSL2（Windows Subsystem for Linux）
2. 使用 Docker Desktop for Windows

## 基本使用

### 启动 Ollama

安装完成后，打开终端并运行：
```bash
ollama serve
```

### 拉取模型

```bash
# 拉取 Llama 2 模型
ollama pull llama2

# 拉取其他模型
ollama pull mistral
ollama pull codellama
```

### 运行模型

```bash
# 启动交互式对话
ollama run llama2

# 单次查询
ollama run llama2 "写一个 Python 的 Hello World 程序"
```

## 模型管理

### 查看已安装模型

```bash
ollama list
```

### 删除模型

```bash
ollama rm llama2
```

### 创建自定义模型

使用 Modelfile 创建自定义模型：

```plaintext
FROM llama2
SYSTEM You are a helpful AI assistant that specializes in programming.

# 构建模型
ollama create custom-model -f Modelfile
```

## API 使用

Ollama 提供了 REST API 接口，可以通过 HTTP 请求与模型交互：

### 基本请求示例

```bash
# 生成回复
curl http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "讲个笑话"
}'

# 聊天接口
curl http://localhost:11434/api/chat -d '{
  "model": "llama2",
  "messages": [
    { "role": "user", "content": "你好" }
  ]
}'
```

## 性能优化

### 内存管理

- 使用 `OLLAMA_HOST` 环境变量指定运行地址
- 使用 `OLLAMA_MODELS` 环境变量指定模型存储位置

### GPU 加速

Ollama 支持 NVIDIA GPU 加速：
- 确保已安装 CUDA 工具包
- GPU 将被自动识别和使用

## 常见问题解决

1. 模型下载失败
   - 检查网络连接
   - 确保有足够的磁盘空间
   - 尝试使用代理服务器

2. 内存不足
   - 使用较小的模型
   - 关闭不必要的应用程序
   - 增加系统虚拟内存

3. API 连接问题
   - 确认 Ollama 服务正在运行
   - 检查端口是否被占用
   - 验证防火墙设置

## 最佳实践

1. 模型选择
   - 根据任务需求选择合适的模型
   - 考虑设备性能限制
   - 在小模型和大模型之间权衡

2. 提示工程
   - 使用清晰具体的提示
   - 提供足够的上下文
   - 适当使用系统提示定制行为

3. 资源管理
   - 定期清理不需要的模型
   - 监控系统资源使用
   - 使用适当的并发设置

## 更多资源

- [Ollama 官方文档](https://github.com/ollama/ollama)
- [Ollama GitHub 仓库](https://github.com/ollama/ollama)
- [Ollama Discord 社区](https://discord.gg/ollama)

## 更新日志

请关注 [Ollama Releases](https://github.com/ollama/ollama/releases) 页面获取最新版本信息和更新说明。