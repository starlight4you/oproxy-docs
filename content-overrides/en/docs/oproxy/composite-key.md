# Key Groups and Model Access

Key groups determine model access, routing, multipliers, and billing. The create-key dialog currently lists aggregate pay-as-you-go, OpenAI pay-as-you-go, Claude, Gemini, and DeepSeek groups.

![Model pricing page with model cards and available groups](/images/oproxy-steps/model-pricing.png)

*Figure: Search or filter the live model catalog before selecting a key group.*

## Choose a group

- Codex and OpenAI Responses: a group that lists the target GPT model.
- Claude Code: the Claude group.
- Gemini or DeepSeek: the dedicated group or an aggregate group that explicitly lists the model.
- Mixed OpenCode workflows: separate keys and providers for OpenAI and Claude.

Before changing a key's group, verify the model list and price, test a new key, and migrate clients gradually. Do not assume one key can access every model.

The [Model Pricing](https://oproxy.world/available-channels) page supports search and provider filters and shows input, output, cache, image or per-request pricing plus available channels.
