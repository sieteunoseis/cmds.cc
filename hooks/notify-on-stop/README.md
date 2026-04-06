# notify-on-stop

Desktop notification when Claude finishes a task.

## Install

```bash
npx @cmds-cc/hooks add cmds-cc/cmds.cc/hooks/notify-on-stop
```

## Hooks

| Hook                       | Default | Description                                                          |
| -------------------------- | ------- | -------------------------------------------------------------------- |
| macOS notification on stop | On      | Sends a macOS notification via osascript when Claude stops           |
| cmux notification on stop  | Off     | Sends a cmux notification when Claude stops (requires cmux terminal) |

## License

MIT
