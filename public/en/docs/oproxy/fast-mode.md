# Dashboard, Monitoring, and Usage

## Dashboard

The dashboard summarizes balance, keys, requests, spending, tokens, RPM/TPM, average latency, provider breakdown, model distribution, trends, recent use, and quick actions. Time range, granularity, and refresh only change the display.

## Usage

Filter by API key and a preset or custom date range. The table includes model, reasoning effort, endpoint, streaming mode, billing mode, tokens, cost, time to first token, total duration, timestamp, and User-Agent. You can reset, refresh, sort, paginate, and export CSV.

![Usage filters for API key and date range](/images/oproxy-steps/usage-filters.png)

*Figure: Select a key and time range before refreshing, resetting, or exporting the result.*

::: warning Export privacy
CSV exports can contain key names, timestamps, and client identifiers. Store them only in a trusted location.
:::

## Model Monitoring

The monitoring page provides 7-, 15-, and 30-day views with current status, conversation latency, endpoint ping, availability, recent probes, manual refresh, and automatic refresh. Use it together with local network, endpoint, key, and billing checks.

![Model monitoring dashboard](/images/oproxy-steps/model-monitor.png)

*Figure: Channel status, conversation latency, endpoint ping, and availability are shown together.*
