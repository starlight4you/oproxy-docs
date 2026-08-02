# Generic Client Setup

For clients that support custom providers:

| Field | OpenAI-compatible | Anthropic-compatible |
| --- | --- | --- |
| Provider | OpenAI compatible | Anthropic compatible |
| Base URL | `https://api.oproxy.world/v1` | `https://api.oproxy.world` |
| API key | `YOUR_OPROXY_API_KEY` | `YOUR_OPROXY_API_KEY` |
| Model | Exact ID from Model Pricing | Exact Claude ID allowed by the key |

Create a dedicated key, enter the provider fields, send a minimal request, and verify the model, endpoint, tokens, cost, and User-Agent in Oproxy Usage.

![Oproxy API endpoints](/images/oproxy-steps/api-endpoints.png)

*Figure: Copy or test the gateway from the API Keys page before entering it in a client.*

![Usage filters](/images/oproxy-steps/usage-filters.png)

*Figure: Filter by the dedicated key and test time to verify that the client request arrived.*

Configuration managers can centralize Codex, Claude Code, and OpenCode settings. Keep exports and secrets out of public repositories and cloud-synced folders, and restart clients after provider changes.
