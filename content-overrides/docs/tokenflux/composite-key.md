# 密钥分组与模型访问

Oproxy 的 Key 通过 **分组** 决定可用模型、倍率和计费渠道。不要假设一个 Key 能访问全部模型。

## 可用分组

创建密钥时可选择以下分组，实际列表会随账户和服务配置变化：

- **按量计费**：OpenAI、Anthropic、Google、DeepSeek 聚合分组。
- **OpenAI-按量计费**：更高并发/RPM，并支持更多推理场景。
- **Claude**：Claude 按量计费渠道。
- **Gemini**：Gemini 渠道。
- **DeepSeek**：DeepSeek 官方 API 渠道。

分组均显示倍率；具体名称、模型和权限以登录后的 **模型定价** 为准。

![模型定价页面，展示模型卡片和可用分组](/images/oproxy-steps/model-pricing.png)

*图：模型定价页可以按名称与提供商筛选，并查看每个模型的价格和可用分组。*

## 如何选择

| 目标 | 建议 |
| --- | --- |
| Codex / OpenAI Responses | 选择支持目标 GPT 模型的 OpenAI 分组 |
| Claude Code | 选择 Claude 分组 |
| OpenCode 混合模型 | 为 OpenAI 与 Claude 分别建 Key 或 Provider |
| Gemini / DeepSeek | 选择对应专用分组，或确认聚合分组已列出模型 |

## 更换分组

密钥列表中，每一行的分组按钮可进入分组选择。更换前确认：

1. 现有客户端是否依赖当前模型。
2. 新分组是否支持同名模型。
3. 价格、倍率和订阅权益是否变化。
4. 切换后用最小请求验证。

为了降低影响，推荐新建一个 Key 完成测试，再迁移应用；不要直接修改所有生产应用共用的 Key。

## 模型定价页

[模型定价](https://oproxy.world/available-channels) 支持按名称搜索和提供商筛选。每张模型卡展示输入、输出、缓存写入/读取、图片或按次费用，以及可用渠道和分组。

价格与模型会变化，文档不固定复制完整价目表。
