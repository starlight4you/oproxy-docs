# 快速开始

本页带你完成 Oproxy 注册、创建 API Key，并将密钥用于聊天应用或常见 Coding 工具。

## 三步开始

| 步骤 | 做什么 | 去哪 |
| --- | --- | --- |
| 1 | 注册或登录 Oproxy | [登录页面](https://oproxy.world/login) |
| 2 | 创建并配置 API Key | [API 密钥页面](https://oproxy.world/keys) |
| 3 | 选择聊天应用或 Coding 工具 | 见下方接入方式 |

::: tip 注册范围
目前仅支持部分学校或组织成员注册。无法注册时，可通过页面上的“首页 / 支持查看支持的学校/组织”入口确认支持范围，或联系支持人员。
:::

## 注册与登录

### 注册

1. 打开 [Oproxy 登录页面](https://oproxy.world/login)。
2. 在登录页底部点击 **注册**，进入 **创建账户** 页面。
3. 阅读条款更新弹窗中的用户协议、隐私政策、个人信息跨境传输说明和内容安全规则。只有本人点击 **同意并继续** 后，注册输入框才会启用。
4. 填写邮箱、密码和专属邀请码。其中密码至少需要 6 个字符，邀请码可选。
5. 点击 **继续**，再按页面提示完成注册。

### 登录

1. 打开 [Oproxy 登录页面](https://oproxy.world/login)。
2. 首次进入或条款更新后，先阅读并由本人确认四份最新条款；未同意前账号和密码输入框会保持禁用。
3. 在 **邮箱或手机号** 中填写注册信息。
4. 输入密码，然后点击 **登录**。
5. 忘记密码时，点击 **忘记密码？** 进入找回流程。

登录成功后会进入控制台，可以继续创建 API Key。

## 获取 API Key

登录后，在左侧导航栏点击 **API 密钥**，或直接打开 [API 密钥页面](https://oproxy.world/keys)。

### 创建密钥

1. 点击 **创建密钥**。
2. 根据使用场景检查以下设置：

| 设置 | 说明 |
| --- | --- |
| 名称 | 用于区分用途，例如 `chat-client`、`codex` 或 `claude-code` |
| 分组 | 决定密钥能访问哪些模型，选项会随账户和订阅变化 |
| 自定义密钥 | 仅在确实需要自定义 Key 时开启 |
| IP 限制 | 需要限制调用来源时开启 |
| 额度限制 | 设置该密钥最多可消费的金额；`0` 表示不限制 |
| 速率限制 | 需要限制请求速度时开启 |
| 密钥有效期 | 需要定期失效时开启并设置期限 |

3. 检查无误后点击 **创建**。
4. 返回密钥列表，在对应行复制密钥，或者点击 **使用密钥** 获取客户端配置。

![创建 API 密钥弹窗，可填写名称、选择分组并设置访问限制](/images/oproxy-steps/create-key-dialog.png)

*图：创建密钥弹窗。截图中的表单保持空白，没有展示真实密钥。*

::: tip 密钥管理建议
建议为不同的聊天客户端、Coding 工具和生产服务分别创建密钥，并设置合适的额度、有效期或 IP 限制。密钥泄露时，可以单独禁用或删除对应密钥，避免影响其他应用。
:::

## 使用 API Key

::: warning 密钥安全
**使用密钥** 弹窗会直接显示完整 API Key。不要截取原始密钥画面，不要提交到代码仓库，也不要发送给他人。
:::

<DocsTabs default-tab="chat">
  <DocsTab title="聊天 / 智能体" name="chat">

### 使用 Oproxy 自带应用

1. 登录控制台并创建 API Key。
2. 点击左侧的 **聊天/智能体应用**。
3. 在 **聊天/智能体管理** 卡片中使用 API Key 创建聊天会话。
4. 填入自己的 API Key，并选择密钥有效期。

![聊天和智能体应用中心](/images/oproxy-steps/app-centre.png)

*图：控制台中的聊天/智能体应用中心，可从卡片进入应用或管理入口。*

::: warning 应用状态
**打开聊天** 会跳转到 `chat.oproxy.world`。如果页面显示 Cloudflare Tunnel 错误，通常表示聊天应用正在维护；请先查看控制台公告或联系支持，不要反复创建密钥。
:::

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

完成配置并重新启动客户端后，发送一条最小测试消息；能够正常返回内容即表示接入成功。
