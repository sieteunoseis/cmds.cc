# safety-essentials

Essential safety hooks for Claude Code — block destructive commands and protect sensitive files.

## Install

```bash
npx @cmds-cc/hooks add cmds-cc/cmds.cc/hooks/safety-essentials
```

## Hooks

| Hook                            | Default | Description                                                  |
| ------------------------------- | ------- | ------------------------------------------------------------ |
| Block destructive commands      | On      | Blocks rm -rf, drop table, and truncate commands             |
| Block force push to main/master | On      | Prevents git push --force to main or master branches         |
| Block git reset --hard          | On      | Prevents git reset --hard which discards uncommitted changes |
| Block secrets in commits        | On      | Prevents git add on .env, credentials, and key files         |

## License

MIT
