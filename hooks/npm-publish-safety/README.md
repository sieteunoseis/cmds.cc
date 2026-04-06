# npm-publish-safety

Guard npm publish, unpublish, deprecate, and access changes.

## Install

```bash
npx @cmds-cc/hooks add cmds-cc/cmds.cc/hooks/npm-publish-safety
```

## Hooks

| Hook                     | Default | Description                                                             |
| ------------------------ | ------- | ----------------------------------------------------------------------- |
| Block npm unpublish      | On      | Prevents npm unpublish which removes packages from the registry         |
| Block npm deprecate      | On      | Prevents npm deprecate which marks packages as deprecated for all users |
| Block npm access changes | On      | Prevents npm access which modifies package permissions and visibility   |
| Block npm owner changes  | On      | Prevents npm owner add/rm which changes package ownership               |

## License

MIT
