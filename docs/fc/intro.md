---
title: Function Call 入门指南
category: function-call
tags: [入门，函数调用，大模型]
date: 2026-03-11
readTime: 3
summary: Function Call 基础概念和使用方法
---

# Function Call 入门指南

## 什么是 Function Call

Function Call（函数调用）允许大模型在需要时调用外部函数来获取信息或执行操作。

## 基本用法

```python
from dashscope import Generation

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取天气信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string"}
                },
                "required": ["city"]
            }
        }
    }
]
```

## 下一步

查看 [完整示例](/fc/example) 了解更多。
