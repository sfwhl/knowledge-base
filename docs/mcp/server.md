---
title: MCP Server 实现
category: mcp
tags: [python, mcp, server, 实战]
date: 2026-03-11
readTime: 6
summary: 从零开始实现 MCP Server
---

# MCP Server 实现

## 安装依赖

```bash
pip install mcp
```

## 创建 Server

```python
from mcp.server import Server

app = Server("my-server")

@app.list_tools()
async def list_tools():
    return [...]
```
