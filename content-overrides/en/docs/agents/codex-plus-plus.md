# Client Configuration and Account Security

Store keys in environment variables, system credential stores, or permission-restricted files. Never commit `.env`, `auth.json`, `settings.json`, or exported provider files. Use one key per device and application.

Oproxy Profile supports username/avatar, email bindings, password changes, low-balance alerts, notification emails, and authenticator-app 2FA. Password, email, and 2FA changes must be performed by the account owner.

![Create key dialog with security limits](/images/oproxy-steps/create-key-dialog.png)

*Figure: IP, spending, rate, and expiration limits reduce the impact of a leaked client key.*

If a key may be exposed:

1. Disable it immediately.
2. Review timestamps, models, cost, endpoint, and User-Agent in Usage.
3. Create and deploy a replacement key.
4. Delete the old key only after dependencies are removed.
5. Submit a ticket for suspicious spending without sending the full key or password.

![New support ticket dialog](/images/oproxy-steps/ticket-dialog.png)

*Figure: Include timing and symptoms in a ticket, but never paste the full API key.*
