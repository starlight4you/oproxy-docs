# Error Codes and Resolutions

When a request fails, record the request time, model ID, key name, and complete error message. Never include the full API key in screenshots, tickets, or chat messages.

::: info Status-code scope
The client, Oproxy gateway, and upstream model can each return an error. The same issue may use a different HTTP status across protocols, so check the status, response body, and Oproxy Usage together.
:::

## Quick reference

| Status or message | Common cause | Resolution |
| --- | --- | --- |
| `401` / authentication failed | Incomplete, disabled, or expired key; incorrect authentication variable | Copy the key again and check its status and expiration; Codex uses `OPENAI_API_KEY`, while Claude Code uses `ANTHROPIC_AUTH_TOKEN` |
| `429` / too many requests | Insufficient RPM, TPM, concurrency, subscription quota, or per-key rate limit | Reduce concurrency and retry later; check key and plan limits; buy a concurrency/RPM add-on or upgrade the plan when normal traffic repeatedly reaches the limit |
| `503` / service unavailable | Upstream model or channel outage, congestion, or maintenance | Check Model Monitoring, retry later, or switch model, group, or endpoint |
| Review or suspension | Content review was triggered, or the key/account was suspended for risk or policy reasons | Adjust blocked content; for a suspended key or account, stop retrying, check notices, and submit an appeal ticket |
| Model not found / no channel | Incorrect model ID or a key group that does not include the model | Copy the exact model ID from Model Pricing and use a matching group; test a new key before migrating production |
| Insufficient balance / quota exhausted | Pay-as-you-go balance is low, a daily/weekly/monthly quota is exhausted, or the plan expired | Check balance and subscriptions; recharge, renew, upgrade, or wait for the quota reset |

## 429: RPM, concurrency, or quota

`429` can be caused by RPM, TPM, concurrency, subscription quota, or a limit set on the API key.

1. Pause high-concurrency work and retry after 30–60 seconds.
2. Use exponential backoff with jitter for automation.
3. Check the key's rate and spending limits.
4. Check daily, weekly, and monthly plan use plus concurrency/RPM benefits.
5. If normal traffic repeatedly reaches the limit, buy a concurrency/RPM add-on or upgrade the plan.

::: warning Avoid unlimited retries
Unlimited retries consume more concurrency and amplify an outage. Stop after a defined retry budget and record the error.
:::

## 503: upstream unavailable

`503` normally indicates that an upstream channel is temporarily unavailable; it does not usually mean the API key is invalid.

1. Open [Model Monitoring](https://oproxy.world/monitor) and check the target model's status, latency, and ping.
2. Retry later with exponential backoff.
3. Switch to a comparable model or another available group when the workload allows.
4. Compare the default and mainland-optimized endpoints, but do not recreate keys to solve an upstream outage.

![Model monitoring status, latency, and availability](/images/oproxy-steps/model-monitor.png)

*Figure: Check whether the target model or channel is degraded before retrying a 503 response.*

## Review or suspension

For a content-safety or policy message, stop resubmitting the same input, remove or rewrite the triggering content, and read the content-safety and usage notices.

If the key is disabled or the response explicitly indicates an account suspension:

1. Check console notices, email, and applicable rules.
2. Locate the request time, model, cost, and User-Agent in Usage.
3. Submit a ticket with the time and error message, without the full key or password.
4. Do not create multiple new keys to bypass a platform restriction.

## Incorrect key group

The key group controls model access. Confirm that the exact model ID appears in Model Pricing and that the key uses a matching group. Create a test key in the correct group, send a minimal request, and migrate production only after it succeeds.

## Insufficient balance

Check pay-as-you-go balance, active subscriptions, daily/weekly/monthly quota, and recent actual cost in Usage. Recharge when balance is low; renew or upgrade a plan, buy an add-on, or wait for quota reset when subscription capacity is exhausted.

## Before submitting a ticket

Include the request time and time zone, HTTP status, complete error body, model ID, endpoint, protocol, key name or a short suffix, and the troubleshooting already attempted. Never include the complete key.

![Usage filters for key and date range](/images/oproxy-steps/usage-filters.png)

*Figure: Filter Usage by key and time range to locate calls around the failure.*
