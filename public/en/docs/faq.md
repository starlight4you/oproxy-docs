# Frequently Asked Questions

## Why is the login form disabled?

You must personally review and accept the latest four legal notices before the form is enabled.

## Who can register?

Users with a valid invitation, a supported education email, or an approved organization. Search the [support page](https://oproxy.world/support) for the school and email domain.

## Which key group should I use?

Choose a group that lists the target model. The console currently exposes aggregate pay-as-you-go, OpenAI, Claude, Gemini, and DeepSeek groups, but account access can differ.

## Which Base URL should I use?

Use `https://api.oproxy.world` for Codex Responses and Claude Code, and usually `https://api.oproxy.world/v1` for OpenAI-compatible SDKs and OpenCode.

## Why does a request fail?

Check the complete key, active status, group/model match, Base URL, balance or subscription, key expiration/IP/rate/spending limits, and [model monitoring](https://oproxy.world/monitor). See [Error Codes and Resolutions](/en/docs/tokenflux/error-codes.html) for detailed handling.

## What is the difference between 429 and 503?

`429` normally means RPM, TPM, concurrency, plan quota, or a per-key rate limit is exhausted. Reduce concurrency first; upgrade the plan or buy an add-on if normal traffic repeatedly reaches the limit. `503` normally means an upstream model or channel is temporarily unavailable; check monitoring, retry later, or switch models.

## Does Oproxy retain API content?

Normal full API input/output is not intended for long-term storage. Metadata is retained for 30 days and in-memory API context is normally released after 1,800 seconds. Risk and violation records may be retained for 180 days.

## How do I contact support?

Email `support@oproxy.world`, use the WeCom link on the support page, or submit a ticket after signing in.
