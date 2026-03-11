---
title: Function Call 完整示例
category: function-call
tags: [python, dashscope, api, 实战]
date: 2026-03-11
readTime: 5
summary: 包含天气查询、计算器等完整代码实现
---

# Function Call 完整示例

## 完整代码

```python
from dashscope import Generation
import json

def call_qwen_with_function_call(user_query: str):
    messages = [{"role": "user", "content": user_query}]
    
    response = Generation.call(
        model="qwen-max",
        messages=messages,
        tools=tools,
        result_format="message"
    )
    
    return response.output.choices[0].message.content
```

## 运行示例

```bash
python example.py
```
