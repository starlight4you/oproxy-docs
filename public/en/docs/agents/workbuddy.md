# WorkBuddy and Desktop Agents

For a custom OpenAI-compatible model form, use:

| Field | Value |
| --- | --- |
| Provider | Custom / OpenAI compatible |
| Endpoint | `https://api.oproxy.world/v1/chat/completions` |
| API key | `YOUR_OPROXY_API_KEY` |
| Model | Exact model ID from Oproxy |

If the client asks for **Base URL** rather than **Endpoint**, use `https://api.oproxy.world/v1`. Enable tools, images, or reasoning only when both the client and model support them.

![Oproxy API endpoints](/images/oproxy-steps/api-endpoints.png)

*Figure: Copy the gateway domain, then add `/v1` or the full request path according to the client field.*

After saving, send a minimal message and verify the model, endpoint, and User-Agent in Oproxy Usage. A `401` indicates key/authentication; model-not-found usually indicates the ID or key group.

![Model monitoring page](/images/oproxy-steps/model-monitor.png)

*Figure: When a client cannot connect, check channel status, latency, and endpoint ping as well.*
