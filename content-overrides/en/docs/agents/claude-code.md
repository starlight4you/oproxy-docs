# Claude Code Setup

Create a key in the Claude group, then set:

![Create key dialog with groups and limits](/images/oproxy-steps/create-key-dialog.png)

*Figure: Create a dedicated Claude Code key and add a spending limit or expiration when appropriate.*

```bash
export ANTHROPIC_BASE_URL="https://api.oproxy.world"
export ANTHROPIC_AUTH_TOKEN="YOUR_OPROXY_API_KEY"
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

For VS Code, add the same variables to `~/.claude/settings.json` or `%userprofile%\.claude\settings.json`:

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

Restart the terminal, editor, and Claude Code. A successful request should appear under `/v1/messages` in Oproxy Usage. Do not append a second `/v1` to `ANTHROPIC_BASE_URL`.

![Usage filters](/images/oproxy-steps/usage-filters.png)

*Figure: Filter by the Claude Code key and request time to verify the call.*
