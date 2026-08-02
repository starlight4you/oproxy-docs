# 通用客户端接入

多数支持自定义 Provider 的客户端都可以通过 Oproxy 接入。核心是正确填写协议、Base URL、API Key 和模型名。

## 配置清单

| 字段 | OpenAI 兼容客户端 | Anthropic 兼容客户端 |
| --- | --- | --- |
| Provider | OpenAI compatible | Anthropic compatible |
| Base URL | `https://api.oproxy.world/v1` | `https://api.oproxy.world` |
| API Key | `YOUR_OPROXY_API_KEY` | `YOUR_OPROXY_API_KEY` |
| 模型 | 模型定价页中的完整 ID | Claude 分组支持的完整 ID |

使用国内优化端点时，将域名换为 `open.oproxy.world`，路径规则保持不变。

![Oproxy 默认端点和国内优化端点](/images/oproxy-steps/api-endpoints.png)

*图：在 API 密钥页复制或测速端点，避免手工录入错误。*

## 接入步骤

1. 创建专用 API Key，并选择匹配模型的分组。
2. 在客户端新增自定义 Provider。
3. 填写 Base URL、Key 与精确模型 ID。
4. 先发送最小文本请求，再测试流式、图片、工具调用或长上下文。
5. 在 Oproxy **使用记录** 中确认模型、端点、费用和 User-Agent。

![使用记录筛选栏](/images/oproxy-steps/usage-filters.png)

*图：按专用 Key 和时间范围筛选，可快速确认客户端请求是否到达。*

## 配置管理器

使用 CC Switch 或类似工具时，可以集中管理 Codex、Claude Code 和 OpenCode 配置，但仍需注意：

- 不要把真实 Key 导出到公开文件或云同步目录。
- 切换 Provider 后重启客户端。
- 不同协议使用不同 Base URL 形式。
- 不要把一个 Key 同时共享给个人、团队和生产环境。

## 故障排查

先在 Oproxy 模型定价页确认模型，再检查 Key 分组、端点、余额/订阅和监控状态。客户端显示的“模型不存在”通常不是安装问题，而是模型 ID 或分组不匹配。
