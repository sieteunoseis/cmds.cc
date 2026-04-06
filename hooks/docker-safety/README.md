# docker-safety

Block destructive Docker commands — system prune, force remove, and volume deletion.

## Install

```bash
npx @cmds-cc/hooks add cmds-cc/cmds.cc/hooks/docker-safety
```

## Hooks

| Hook                                | Default | Description                                                                            |
| ----------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| Block Docker prune and force remove | On      | Blocks docker system prune, docker rm -f, docker volume rm, and docker compose down -v |

## License

MIT
