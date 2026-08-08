# 快速开始

本页带你完成充值或购买套餐、创建 API Key，并接入 Oproxy 自带应用或常见 Coding 工具。

## 充值或购买套餐

登录控制台后，打开 [充值/订阅](https://oproxy.world/purchase)。可选择 **充值** 按量余额，或根据需求购买套餐；价格、折扣和限额以页面实时展示为准。

## 获取 API Key

登录后，在左侧导航栏点击 **API 密钥**，或直接打开 [API 密钥页面](https://oproxy.world/keys)。

### 创建密钥

1. 点击 **创建密钥**。
2. 根据使用场景检查以下设置：

| 设置 | 说明 |
| --- | --- |
| 名称 | 区分用途，如 `chat-client`、`codex` |
| 分组 | 决定可用模型 |
| 自定义密钥 | 按需开启 |
| IP 限制 | 限制调用来源 |
| 额度限制 | 设置消费上限（`0` 不限） |
| 速率限制 | 限制请求速度 |
| 密钥有效期 | 设置失效时间 |

3. 检查无误后点击 **创建**。
4. 返回密钥列表，在对应行复制密钥，或者点击 **使用密钥** 获取客户端配置。

![创建 API 密钥弹窗，可填写名称、选择分组并设置访问限制](/images/oproxy-steps/create-key-dialog.png)

*图：创建密钥弹窗。*

::: tip 密钥管理建议
建议为不同的聊天客户端、Coding 工具和生产服务分别创建密钥，并设置合适的额度、有效期或 IP 限制。密钥泄露时，可以单独禁用或删除对应密钥，避免影响其他应用。
:::

## 使用 API Key

<DocsTabs default-tab="chat">
  <DocsTab title="聊天 / 智能体" name="chat">

### 使用 Oproxy 自带应用

点开 **聊天/智能体应用** 即可开始对话。

![聊天和智能体应用中心](/images/oproxy-steps/app-centre.png)

*图：控制台中的聊天/智能体应用中心，可从卡片进入应用或管理入口。*

  </DocsTab>

  <DocsTab title="Codex" name="codex">

使用 OpenAI 分组的密钥，点击 **使用密钥**，然后选择 **Codex CLI**。

配置文件位于 Codex CLI 的用户目录：

| 系统 | 配置文件 |
| --- | --- |
| macOS / Linux | `~/.codex/config.toml` 和 `~/.codex/auth.json` |
| Windows | `%userprofile%\.codex/config.toml` 和 `%userprofile%\.codex/auth.json` |

macOS / Linux 如果还没有配置目录，先运行：

```bash
mkdir -p ~/.codex
```

将以下内容放在 `config.toml` 的开头部分：

```toml
model_provider = "OpenAI"
model = "gpt-5.4"
review_model = "gpt-5.4"
model_reasoning_effort = "xhigh"
disable_response_storage = true
network_access = "enabled"
windows_wsl_setup_acknowledged = true
model_context_window = 1000000
model_auto_compact_token_limit = 900000

[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.oproxy.world"
wire_api = "responses"
requires_openai_auth = true
```

在 `auth.json` 中保存 API Key：

```json
{
  "OPENAI_API_KEY": "YOUR_OPROXY_API_KEY"
}
```

将 `YOUR_OPROXY_API_KEY` 替换为自己的完整密钥。

### WebSocket 模式（可选）

如果在弹窗中选择 **Codex CLI (WebSocket)**，`config.toml` 的 Provider 还需要开启 WebSocket，并增加 `features` 配置：

```toml
[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.oproxy.world"
wire_api = "responses"
supports_websockets = true
requires_openai_auth = true

[features]
responses_websockets_v2 = true
```

其余顶部配置和 `auth.json` 与普通 Codex CLI 模式相同。保存文件后重新启动 Codex。

  </DocsTab>

  <DocsTab title="Claude Code" name="claude">

使用 Claude 分组的密钥，点击 **使用密钥**，选择 **Claude Code**，再根据操作系统复制环境变量。

**macOS / Linux**

```bash
export ANTHROPIC_BASE_URL="https://api.oproxy.world"
export ANTHROPIC_AUTH_TOKEN="YOUR_OPROXY_API_KEY"
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

**Windows CMD**

```bat
set ANTHROPIC_BASE_URL=https://api.oproxy.world
set ANTHROPIC_AUTH_TOKEN=YOUR_OPROXY_API_KEY
set CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

**PowerShell**

```powershell
$env:ANTHROPIC_BASE_URL="https://api.oproxy.world"
$env:ANTHROPIC_AUTH_TOKEN="YOUR_OPROXY_API_KEY"
$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

上述命令只对当前终端会话生效。需要长期使用时，应写入对应的终端配置文件或系统环境变量。

### VS Code 配置

如果使用 VS Code 中的 Claude Code，可以创建或编辑：

- macOS / Linux：`~/.claude/settings.json`
- Windows：`%userprofile%\.claude\settings.json`

文件内容如下：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.oproxy.world",
    "ANTHROPIC_AUTH_TOKEN": "YOUR_OPROXY_API_KEY",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0"
  }
}
```

保存后重新启动终端或 VS Code，再启动 Claude Code。

  </DocsTab>

  <DocsTab title="OpenCode" name="opencode">

OpenCode 的配置文件路径为 `~/.config/opencode/opencode.json`，也可以使用 `opencode.jsonc`。文件不存在时需要手动创建。API Key 可以直接写入配置，也可以在 OpenCode 中使用 `/connect` 命令配置。

### 使用 OpenAI 分组密钥

在 OpenAI 分组密钥的 **使用密钥** 弹窗中选择 **OpenCode**，Provider 配置如下：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "openai": {
      "options": {
        "baseURL": "https://api.oproxy.world/v1",
        "apiKey": "YOUR_OPROXY_API_KEY"
      },
      "models": {
        "gpt-5.4": {
          "name": "GPT-5.4",
          "limit": {
            "context": 1050000,
            "output": 128000
          },
          "options": {
            "store": false
          },
          "variants": {
            "low": {},
            "medium": {},
            "high": {},
            "xhigh": {}
          }
        }
      }
    }
  },
  "agent": {
    "build": {
      "options": {
        "store": false
      }
    },
    "plan": {
      "options": {
        "store": false
      }
    }
  }
}
```

### 使用 Claude 分组密钥

在 Claude 分组密钥的 **使用密钥** 弹窗中选择 **OpenCode**，Provider 配置如下：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "options": {
        "baseURL": "https://api.oproxy.world/v1",
        "apiKey": "YOUR_OPROXY_API_KEY"
      },
      "npm": "@ai-sdk/anthropic"
    }
  }
}
```

  </DocsTab>
</DocsTabs>

## 连接失败时怎么检查

如果请求失败，按以下顺序检查：

1. API Key 是否完整、是否处于 **活跃** 状态。
2. Base URL 是否与本文对应客户端的示例完全一致：Codex 和 Claude Code 使用 `https://api.oproxy.world`，OpenCode 使用 `https://api.oproxy.world/v1`。
3. 密钥分组是否支持当前模型。
4. 密钥是否受到额度、有效期、IP 或速率限制。
5. 余额或订阅额度是否已经耗尽。
6. 根据 HTTP 状态码查看 [错误码与处理](/docs/oproxy/error-codes.html)，其中包含 `429`、`503`、审核、分组和余额问题。

完成配置并重新启动客户端后，发送一条最小测试消息；能够正常返回内容即表示接入成功。
