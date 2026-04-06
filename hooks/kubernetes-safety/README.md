# kubernetes-safety

Block destructive kubectl operations — delete, drain, cordon, and exec into pods.

## Install

```bash
npx @cmds-cc/hooks add cmds-cc/cmds.cc/hooks/kubernetes-safety
```

## Hooks

| Hook                              | Default | Description                                                                           |
| --------------------------------- | ------- | ------------------------------------------------------------------------------------- |
| Block kubectl delete              | On      | Blocks kubectl delete on namespaces, deployments, services, pods, and other resources |
| Block kubectl drain and cordon    | On      | Prevents draining or cordoning nodes which evicts pods and blocks scheduling          |
| Block kubectl exec                | Off     | Prevents exec into pods which grants shell access to running containers               |
| Block kubectl apply to production | Off     | Blocks kubectl apply when targeting production namespaces or contexts                 |
| Block helm uninstall and rollback | On      | Prevents helm uninstall which removes releases and helm rollback without approval     |

## License

MIT
