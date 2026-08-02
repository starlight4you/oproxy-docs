# API Endpoints and Protocols

| Use case | URL |
| --- | --- |
| Default gateway | `https://api.oproxy.world` |
| Mainland-optimized gateway | `https://open.oproxy.world` |
| Common OpenAI-compatible Base URL | `https://api.oproxy.world/v1` |

![Oproxy API endpoints](/images/oproxy-steps/api-endpoints.png)

*Figure: Copy an endpoint from the API Keys page and use the adjacent test action to compare latency.*

Codex uses the Responses protocol with the gateway URL without `/v1`. Claude Code also uses the gateway URL without `/v1`. OpenAI-compatible SDKs and many custom clients use the `/v1` Base URL.

## Responses example

```bash
curl https://api.oproxy.world/v1/responses \
  -H "Authorization: Bearer YOUR_OPROXY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-5.4","input":"Hello"}'
```

## Anthropic environment

```bash
export ANTHROPIC_BASE_URL="https://api.oproxy.world"
export ANTHROPIC_AUTH_TOKEN="YOUR_OPROXY_API_KEY"
```

Use exact model IDs from **Model Pricing**. A `401` usually indicates authentication, a model error indicates the name or group, and `429` may indicate balance, subscription, concurrency, RPM, or key limits.
