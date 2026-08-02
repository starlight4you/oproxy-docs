# Codex Setup

Create an OpenAI-group key. Use `~/.codex` on macOS/Linux or `%userprofile%\.codex` on Windows.

![Oproxy API endpoints](/images/oproxy-steps/api-endpoints.png)

*Figure: Codex uses the gateway URL itself as `base_url`; do not append `/v1` in this configuration.*

```toml
model_provider = "OpenAI"
model = "gpt-5.4"

[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.oproxy.world"
wire_api = "responses"
requires_openai_auth = true
```

Create `auth.json` in the same directory:

```json
{ "OPENAI_API_KEY": "YOUR_OPROXY_API_KEY" }
```

Restart Codex and send a minimal request. Verify `/v1/responses` in Oproxy Usage. Keep `auth.json` out of Git and screenshots. Model names and context settings should be checked against the live model page and the installed Codex version.

![Usage filters](/images/oproxy-steps/usage-filters.png)

*Figure: Filter by the Codex key and request time to confirm a Responses request.*
