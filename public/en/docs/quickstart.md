# Quickstart

![Oproxy quickstart overview](/images/oproxy-steps/quickstart-overview.png)

*Figure: The public quickstart page groups sign-in, API key creation, and client setup into one flow.*

::: info Screenshot note
Screenshots come from the live Oproxy interface and exclude email addresses, balances, order numbers, and complete API keys. The captured UI is in Chinese; field order is the same in English.
:::

## Register or sign in

1. Open the [Oproxy login page](https://oproxy.world/login).
2. Read the updated User Agreement, Privacy Policy, Cross-Border Transfer Notice, and Content Safety Notice. The form stays disabled until you personally select **Agree and continue**.
3. To register, choose **Sign up**, enter an email, a password of at least six characters, and an optional invitation code, then select **Continue**.
4. To sign in, enter your email or phone number and password. Use **Forgot password?** for the reset flow.

Registration is limited to supported education domains, valid invitations, and approved organizations. Check the [support page](https://oproxy.world/support) if your school is not recognized.

## Create an API key

1. Open [API Keys](https://oproxy.world/keys) and select **Create key**.
2. Name the key and choose a group that contains the target model.
3. Optionally set a custom key, IP restriction, spending limit, rate limit, and expiration.
4. Review the form and create the key.

![Create API key dialog](/images/oproxy-steps/create-key-dialog.png)

*Figure: Name, group, and optional access limits are configured in one dialog. No real key is shown.*

Use a separate key for every client and environment. Do not place real keys in screenshots, repositories, tickets, or chat messages.

## Endpoints

- Default: `https://api.oproxy.world`
- Mainland-optimized: `https://open.oproxy.world`
- OpenAI-compatible SDKs commonly use `https://api.oproxy.world/v1`

## Connect a client

### Codex

```toml
model_provider = "OpenAI"
model = "gpt-5.4"

[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.oproxy.world"
wire_api = "responses"
requires_openai_auth = true
```

Store the key in `~/.codex/auth.json` (or `%userprofile%\.codex\auth.json` on Windows):

```json
{ "OPENAI_API_KEY": "YOUR_OPROXY_API_KEY" }
```

### Claude Code

```bash
export ANTHROPIC_BASE_URL="https://api.oproxy.world"
export ANTHROPIC_AUTH_TOKEN="YOUR_OPROXY_API_KEY"
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

### OpenCode

Use an OpenAI provider with `https://api.oproxy.world/v1`, or an Anthropic provider for a Claude-group key. See the dedicated guide for examples.

## Built-in chat

The console lists **Chat / Agent Management** under the app center. If **Open chat** displays a Cloudflare Tunnel error, the chat application is usually under maintenance. Check announcements or contact support instead of recreating keys.

![Chat and agent app center](/images/oproxy-steps/app-centre.png)

*Figure: The console app center provides chat and agent entry points.*

## Verify

Send a minimal request, then open **Usage** to confirm the model, endpoint, tokens, cost, latency, and User-Agent. For failures, check key status, group, Base URL, balance or subscription, key limits, and model monitoring.
