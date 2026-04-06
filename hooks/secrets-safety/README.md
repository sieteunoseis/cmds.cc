# secrets-safety

Prevent exposure and mishandling of secrets — env files, vault, 1password, and printenv.

## Install

```bash
npx @cmds-cc/hooks add cmds-cc/cmds.cc/hooks/secrets-safety
```

## Hooks

| Hook                             | Default | Description                                                                               |
| -------------------------------- | ------- | ----------------------------------------------------------------------------------------- |
| Block cat/echo on secret files   | On      | Prevents reading .env, .pem, .key, and credential files to stdout                         |
| Block printenv and env dump      | On      | Prevents printenv and env commands which dump all environment variables including secrets |
| Block vault write and delete     | On      | Prevents HashiCorp Vault write, delete, and destroy operations                            |
| Block 1Password write operations | On      | Prevents op item create, edit, delete, and vault operations in 1Password CLI              |

## License

MIT
