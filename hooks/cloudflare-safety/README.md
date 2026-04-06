# cloudflare-safety

Block destructive Cloudflare Wrangler operations — worker deletion, KV purge, D1 drops, and secret changes.

## Install

```bash
npx @cmds-cc/hooks add cmds-cc/cmds.cc/hooks/cloudflare-safety
```

## Hooks

| Hook                                            | Default | Description                                                                       |
| ----------------------------------------------- | ------- | --------------------------------------------------------------------------------- |
| Block worker and pages deletion                 | On      | Prevents wrangler delete, wrangler pages project delete, and deployment rollbacks |
| Block KV namespace deletion and bulk operations | On      | Prevents wrangler kv namespace delete and kv bulk delete                          |
| Block D1 destructive operations                 | On      | Prevents wrangler d1 delete and dangerous SQL via d1 execute                      |
| Block R2 bucket deletion                        | On      | Prevents wrangler r2 bucket delete which removes object storage                   |
| Block secret changes                            | Off     | Prevents wrangler secret put and delete which modify worker secrets               |

## License

MIT
