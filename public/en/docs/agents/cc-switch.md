# Connect Agents Quickly with CC Switch

[CC Switch](https://github.com/farion1231/cc-switch) manages providers for Claude Code, Codex, OpenCode, Hermes, and other agents from one desktop interface. It writes each client's configuration when you switch providers, reducing repeated JSON, TOML, and environment-variable edits.

## Prepare

1. Install CC Switch from the [official releases](https://github.com/farion1231/cc-switch/releases). On macOS, you can also run `brew install --cask cc-switch`.
2. Install the agent you want to connect.
3. Create or select an Oproxy API key in a group that contains the target model.
4. Close the running agent so it does not continue using an old configuration.

::: warning Use official downloads only
CC Switch recommends downloading only from `ccswitch.io`, GitHub Releases, or the project repository. Never enter an Oproxy key on an unrelated site with a similar name.
:::

## One-click import

If the Oproxy API Keys page provides **Import to CCS**:

1. Select **Import to CCS** for the API key you want the agent to use.
2. The browser opens a `ccswitch://` link and launches CC Switch.
3. Check the target app, provider name, endpoint, and masked key in the confirmation dialog.
4. Confirm the import.
5. Open the target agent panel in CC Switch and enable the Oproxy provider.

If the button is unavailable or the protocol link does not open, add the provider manually.

## Add Oproxy manually

1. Select the target agent at the top of CC Switch.
2. Select **+**, then **App-specific Provider**.
3. Choose **Custom**, and enter the name, Base URL, API key, and model.
4. Save and enable the provider card.

![CC Switch Add Provider page](/images/cc-switch/add-provider-en.png)

*Figure: The official CC Switch Add Provider interface. Choose Custom when Oproxy is not listed as a preset. Source: [CC Switch repository](https://github.com/farion1231/cc-switch).*

| Agent | Protocol or format | Base URL | Key group |
| --- | --- | --- | --- |
| Codex | OpenAI Responses | `https://api.oproxy.world` | OpenAI group containing the target GPT model |
| Claude Code | Anthropic Messages | `https://api.oproxy.world` | Claude group |
| OpenCode | OpenAI compatible | `https://api.oproxy.world/v1` | OpenAI group containing the target model |
| Hermes | OpenAI compatible | `https://api.oproxy.world/v1` | OpenAI group containing the target model |

For the mainland-optimized endpoint, replace the domain with `open.oproxy.world` and keep the path rule unchanged.

![Oproxy default and mainland-optimized endpoints](/images/oproxy-steps/api-endpoints.png)

*Figure: Copy the endpoint from Oproxy to avoid typing mistakes.*

::: tip Base URL and full endpoint
CC Switch normally appends the request path to a Base URL. Enable **Full URL Mode** only when a provider requires a complete request endpoint; `/v1/chat/completions` is not the correct Base URL for every agent.
:::

## Activate the switch

| Agent | After switching |
| --- | --- |
| Claude Code | Supports hot switching; new requests normally use the provider immediately |
| Codex | Close and reopen the terminal or Codex |
| OpenCode | Close and reopen the terminal or OpenCode |
| Hermes | Close and reopen the terminal or Hermes |

You can also switch quickly from the CC Switch system-tray menu.

## Verify

1. Start the agent and send a short request without tools.
2. Filter Oproxy [Usage](https://oproxy.world/usage) by the API key configured in CC Switch and the request time.
3. Check the model, endpoint, request type, cost, and User-Agent.
4. Test tools, images, and long context only after the basic request succeeds.

![Usage filters](/images/oproxy-steps/usage-filters.png)

*Figure: Filter by the API key configured in CC Switch and the time range to confirm that Oproxy is active.*

## Troubleshooting and safety

- If the old provider is still active, fully restart the agent and terminal, then check for environment variables that override the written configuration.
- For model-not-found errors, verify the exact model ID and key group. See [Error Codes and Resolutions](/en/docs/tokenflux/error-codes.html).
- To restore official access, enable the agent's **Official Login** provider and restart the client.
- Database-backup import overwrites the current CC Switch database; export a backup first.
- If you need separate limits or revocation, use different Oproxy keys for different agents. Keep exports out of public repositories, and disable a leaked key before replacing the provider configuration.

See the [official CC Switch user manual](https://github.com/farion1231/cc-switch/tree/main/docs/user-manual/en) for current interface details.
