# Claude Code 接入

Claude Code 使用 Anthropic 兼容环境变量连接 Oproxy。

## 准备 Key

在 API 密钥页创建或选择 **Claude** 分组的 Key，确认模型定价页已列出目标 Claude 模型。

![创建密钥弹窗中的分组和限制设置](/images/oproxy-steps/create-key-dialog.png)

*图：为 Claude Code 单独创建密钥，并按需设置额度和有效期。*

## macOS / Linux

```bash
export ANTHROPIC_BASE_URL="https://api.oproxy.world"
export ANTHROPIC_AUTH_TOKEN="YOUR_OPROXY_API_KEY"
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

## Windows CMD

```bat
set ANTHROPIC_BASE_URL=https://api.oproxy.world
set ANTHROPIC_AUTH_TOKEN=YOUR_OPROXY_API_KEY
set CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

## PowerShell

```powershell
$env:ANTHROPIC_BASE_URL="https://api.oproxy.world"
$env:ANTHROPIC_AUTH_TOKEN="YOUR_OPROXY_API_KEY"
$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

这些命令只对当前终端生效。

## VS Code 持久配置

文件路径：

- macOS / Linux：`~/.claude/settings.json`
- Windows：`%userprofile%\.claude\settings.json`

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

保存后重启终端、VS Code 和 Claude Code。

## 验证

发起一个最小请求，在 Oproxy **使用记录** 中应看到 `/v1/messages`、Claude 模型、流式/同步状态和费用。失败时检查 Key 是否属于 Claude 分组，以及 `ANTHROPIC_BASE_URL` 不要重复追加 `/v1`。

![使用记录页面的筛选操作](/images/oproxy-steps/usage-filters.png)

*图：选择 Claude Code 配置中使用的 API Key 和请求时间段后刷新记录。*
