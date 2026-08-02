# Billing, Recharge, and Subscriptions

Oproxy supports pay-as-you-go balance and subscription plans. Prices, discounts, limits, and models are live values.

## Three values to distinguish

| Value | Meaning |
| --- | --- |
| Standard cost | A reference cost based on the standard model price |
| Actual cost | The final charge after current group, channel, subscription, and billing rules; Usage is authoritative |
| Balance / plan quota | Balance funds pay-as-you-go calls; plan quota is constrained by daily, weekly, monthly, and expiration limits |

## Cost calculation

Models can price input tokens, output tokens, cache writes, cache reads, images, or per-request items separately.

```text
Input cost = input tokens ÷ 1,000,000 × input price
Output cost = output tokens ÷ 1,000,000 × output price
Cache cost = cache tokens ÷ 1,000,000 × the applicable cache price
Standard cost ≈ input + output + cache + image/per-request charges
```

For 20,000 input tokens and 5,000 output tokens, the token portions are `0.02 × input price` and `0.005 × output price`. Add cache, image, or per-request items; Oproxy then applies the current group and account benefits to produce the actual cost.

::: info Usage is authoritative
The formula is an estimate. Units, cache rules, group multipliers, and plan discounts differ by model. Use **Actual cost** in Oproxy Usage as the final charge.
:::

## Recharge

Open **Recharge / Subscribe**, switch to **Recharge**, choose or enter an amount, select Alipay or WeChat Pay, and check the account and total. The page shows a CNY 5 minimum; follow the live payment-page notice if the limit changes. Payment begins only after selecting **Confirm payment**.

![Recharge amount, payment method, and confirmation controls](/images/oproxy-steps/recharge-controls.png)

*Figure: The recharge controls. Account name and current balance are excluded; review the live total before confirming.*

## Subscriptions

Plans show a 30-day price, discount, multiplier, concurrency/RPM boosts, and daily, weekly, and monthly limits. Check the live page before buying. **My Subscriptions** shows status, expiration, and quota use; expired historical cards are not active benefits.

![Live model pricing and group information](/images/oproxy-steps/model-pricing.png)

*Figure: Check current model prices, providers, and groups before purchasing.*

## Quota, RPM, and concurrency

- Daily, weekly, and monthly quotas limit the corresponding subscription windows.
- RPM and TPM limit requests or tokens per minute.
- Concurrency limits the number of simultaneous requests and is separate from account balance.
- A concurrency add-on increases concurrency or RPM capacity; it does not replace model usage charges.

For `429`, reduce concurrency and check the key's own rate limit first. If normal traffic repeatedly reaches the plan's RPM or concurrency ceiling, buy an add-on or upgrade the plan. See [Error Codes and Resolutions](/en/docs/tokenflux/error-codes.html).

## Standard and actual cost

The dashboard and Usage show both values. Standard cost is a reference based on standard pricing; actual cost reflects the applied group, channel, subscription, and billing rules.

## Reconcile a charge

1. Filter [Usage](https://oproxy.world/usage) by API key and request time.
2. Check the model, input/output tokens, cache, request type, and billing mode.
3. Compare standard and actual cost and confirm the intended group or plan was used.
4. Check the dashboard total for the same time range.
5. For a billing question, submit the request time, model, and relevant error without the full API key.

## Insufficient balance or quota

- Recharge when pay-as-you-go balance is low.
- Wait for the applicable reset or upgrade when a daily, weekly, or monthly plan quota is exhausted.
- Renew an expired plan and confirm its status before retrying.
- If `429` continues, check RPM, TPM, concurrency, and per-key rate limits instead of balance alone.

## Low-balance alerts

Profile settings can enable email alerts, set a threshold, and add a verified notification email. Saving changes the account notification configuration.

The User Agreement states that unused actual recharge balance may be refundable after verification, while consumed, gifted, discounted, and some subscription benefits are generally non-refundable.
