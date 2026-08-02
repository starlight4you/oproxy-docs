# Cherry Studio Setup

Create a chat-specific key, add an OpenAI-compatible provider, and enter:

| Field | Value |
| --- | --- |
| API Host / Base URL | `https://api.oproxy.world/v1` |
| API key | `YOUR_OPROXY_API_KEY` |
| Model ID | Exact ID from Model Pricing |

![Oproxy API endpoints](/images/oproxy-steps/api-endpoints.png)

*Figure: Copy the gateway from Oproxy; Cherry Studio's OpenAI-compatible provider normally uses a `/v1` Base URL.*

Save, add or fetch the model, and send a minimal message. Verify the request in Oproxy Usage. Images, tools, browsing, reasoning, and long context require both client and model support.

![Usage filters](/images/oproxy-steps/usage-filters.png)

*Figure: Filter by the chat-specific key to verify model, time, and cost.*

Use a spending limit for desktop chat keys. If latency is poor, compare the default and mainland-optimized endpoints and check Model Monitoring.
