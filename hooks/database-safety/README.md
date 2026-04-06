# database-safety

Block destructive database operations — migrations, drops, and resets.

## Install

```bash
npx @cmds-cc/hooks add cmds-cc/cmds.cc/hooks/database-safety
```

## Hooks

| Hook                   | Default | Description                                                                     |
| ---------------------- | ------- | ------------------------------------------------------------------------------- |
| Block destructive SQL  | On      | Blocks DROP DATABASE, DROP TABLE, TRUNCATE, and DELETE without WHERE            |
| Block migration resets | On      | Blocks migrate:fresh, migrate:reset, prisma migrate reset, and similar commands |

## License

MIT
