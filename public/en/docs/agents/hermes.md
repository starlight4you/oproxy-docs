# Hermes Setup

Hermes and similar agents can use Oproxy through a custom OpenAI-compatible provider:

```yaml
provider: openai
base_url: https://api.oproxy.world/v1
api_key: YOUR_OPROXY_API_KEY
model: gpt-5.4
```

Field names vary by client version. Use an exact model ID, a matching OpenAI-group key, and a protected environment variable or config file. Test plain text first, verify the request in Oproxy Usage, then enable tools and long context.

![Model pricing page](/images/oproxy-steps/model-pricing.png)

*Figure: Confirm the exact model ID and available key group before configuring Hermes.*

![Usage filters](/images/oproxy-steps/usage-filters.png)

*Figure: Filter by the Hermes key and test period to confirm the request reached Oproxy.*
