# Create an API Key

1. Sign in and open [API Keys](https://oproxy.world/keys).
2. Select **Create key**.
3. Enter a purpose-specific name and choose a group for the target model.
4. Optionally configure a custom value, IP restriction, spending limit, rate limit, and expiration.
5. Review the settings before selecting **Create**.

![Create API key dialog](/images/oproxy-steps/create-key-dialog.png)

*Figure: Configure the name, group, and optional access limits. The form is blank and contains no real key.*

The list supports search, group/status filters, sorting, refresh, and pagination. Per-key actions include copy, client setup, disable, edit, and delete.

::: warning Security
Use separate keys for each device, client, and production service. If a key may be exposed, disable it immediately, review usage, rotate clients, and delete it only after dependencies are removed.
:::

## Endpoints shown on the page

- Default: `https://api.oproxy.world`
- Mainland-optimized: `https://open.oproxy.world`

![Default and mainland-optimized API endpoints](/images/oproxy-steps/api-endpoints.png)

*Figure: The API Keys page provides copy and latency-test actions for both endpoints.*

The page also provides copy and latency-test actions.
