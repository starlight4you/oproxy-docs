# 使用 CC Switch 快速接入 Agent

[CC Switch](https://github.com/farion1231/cc-switch) 可以集中管理 Claude Code、Codex、OpenCode、Hermes 等 Agent 的 Provider。切换 Provider 时由 CC Switch 写入对应客户端配置，不需要手工反复编辑 JSON、TOML 或环境变量。

## 准备工作

1. 从 [CC Switch 官方发布页](https://github.com/farion1231/cc-switch/releases) 下载并安装应用。macOS 也可以使用 `brew install --cask cc-switch`。
2. 安装需要接入的 Agent，例如 Claude Code、Codex、OpenCode 或 Hermes。
3. 在 Oproxy 创建一个 Agent 专用 API Key，并选择包含目标模型的分组。
4. 关闭正在运行的 Agent，避免旧进程继续读取旧配置。

::: warning 只使用官方安装包
CC Switch 官方说明仅建议从 `ccswitch.io`、GitHub Releases 或项目仓库下载。不要向名称相似的第三方网站提交 Oproxy Key。
:::

## 一键导入

如果 Oproxy 的 API 密钥列表提供 **导入到 CCS**：

1. 找到准备给 Agent 使用的 Key，点击 **导入到 CCS**。
2. 浏览器会调用 `ccswitch://` 链接并打开 CC Switch。
3. 在导入确认页检查应用类型、Provider 名称、API 端点和被遮挡的 Key。
4. 确认信息无误后点击 **确认导入**。
5. 回到 CC Switch 的目标 Agent 页面，找到 Oproxy Provider 并点击 **启用**。

::: info 没有导入按钮
如果页面没有 **导入到 CCS**，或浏览器没有成功唤起 CC Switch，请使用下面的手动添加方式。不要安装来源不明的浏览器协议处理程序。
:::

## 手动添加 Oproxy

1. 在 CC Switch 顶部选择要接入的 Agent。
2. 点击右上角 **+**，选择 **应用专属供应商**。
3. 选择 **自定义配置**，填写名称、Base URL、API Key 和模型。
4. 保存后在 Provider 卡片上点击 **启用**。

![CC Switch 添加 Provider 页面](/images/cc-switch/add-provider-zh.png)

*图：CC Switch 官方的添加 Provider 页面。Oproxy 不在预设列表时选择“自定义配置”。图片来源：[CC Switch 官方仓库](https://github.com/farion1231/cc-switch)。*

### 填写值

| Agent | 协议或格式 | Base URL | Key 分组 |
| --- | --- | --- | --- |
| Codex | OpenAI Responses | `https://api.oproxy.world` | 支持目标 GPT 模型的 OpenAI 分组 |
| Claude Code | Anthropic Messages | `https://api.oproxy.world` | Claude 分组 |
| OpenCode | OpenAI compatible | `https://api.oproxy.world/v1` | 支持目标模型的 OpenAI 分组 |
| Hermes | OpenAI compatible | `https://api.oproxy.world/v1` | 支持目标模型的 OpenAI 分组 |

使用国内优化端点时，将域名换成 `open.oproxy.world`，路径规则保持不变。

![Oproxy 默认端点和国内优化端点](/images/oproxy-steps/api-endpoints.png)

*图：从 Oproxy API 密钥页复制端点，避免手工输入错误。*

::: tip Base URL 与完整 Endpoint
CC Switch 的普通 Base URL 会由应用补充请求路径。只有 Provider 明确要求完整请求地址时才启用 **Full URL Mode**；不要把 `/v1/chat/completions` 当作所有 Agent 的 Base URL。
:::

## 启用后如何生效

| Agent | 切换后的操作 |
| --- | --- |
| Claude Code | 支持热切换；新请求通常可以直接使用新 Provider |
| Codex | 关闭并重新打开终端或 Codex |
| OpenCode | 关闭并重新打开终端或 OpenCode |
| Hermes | 关闭并重新打开终端或 Hermes |

需要频繁切换时，可以右键系统托盘中的 CC Switch 图标，直接选择 Agent 和 Provider。

## 验证接入

1. 启动 Agent，发送一个不调用工具的简短请求。
2. 在 Oproxy [使用记录](https://oproxy.world/usage) 中选择该专用 Key 和请求时间。
3. 核对模型、端点、请求类型、费用和 User-Agent。
4. 基础请求成功后，再测试工具调用、图片或长上下文。

![使用记录筛选栏](/images/oproxy-steps/usage-filters.png)

*图：按 Agent 专用 Key 和时间范围筛选，确认 CC Switch 已切换到 Oproxy。*

## 常见问题

### 切换后仍然使用旧 Provider

先完全关闭 Agent 和旧终端，再重新启动。检查系统环境变量是否仍写有旧的 Base URL 或 API Key；环境变量可能覆盖 CC Switch 写入的配置。

### 模型不存在

确认模型 ID 与 Oproxy 模型定价页完全一致，并检查 Key 分组是否包含该模型。参见 [错误码与处理](/docs/tokenflux/error-codes.html)。

### 恢复官方登录

在 CC Switch 中启用对应 Agent 的 **Official Login / 官方登录** Provider，然后重启客户端并按官方流程登录。

### 导入数据库备份

数据库备份导入会覆盖 CC Switch 现有数据库。执行前先在 **设置 → 高级 → 数据管理** 导出当前配置；普通 `ccswitch://` Provider 导入只需在确认页检查将要添加的内容。

## 安全建议

- 每个 Agent 使用独立 Oproxy Key，并设置额度和有效期。
- 不要把 CC Switch 数据库、配置导出或完整 Key 上传到公开仓库。
- 云同步 CC Switch 配置前，确认同步目录和访问权限可信。
- Key 泄露时先在 Oproxy 禁用，再替换 CC Switch 中的 Provider 配置。

更多界面说明参见 [CC Switch 官方用户手册](https://github.com/farion1231/cc-switch/tree/main/docs/user-manual/en)。
