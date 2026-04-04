# hooks.automate.builders

Landing page, API, and curated hook collections for [cc-hooks-install](https://github.com/sieteunoseis/cc-hooks-install).

**Live site:** [hooks.automate.builders](https://hooks.automate.builders)

## Install any hook collection

```bash
npx cc-hooks-install add sieteunoseis/hooks.automate.builders/hooks/<collection>
```

## Available Hooks

### General Safety

| Collection          | Hooks | Description                                                      |
| ------------------- | ----- | ---------------------------------------------------------------- |
| `safety-essentials` | 4     | Block rm -rf, force push, git reset --hard, secrets in commits   |
| `secrets-safety`    | 4     | Block .env/.pem reads, env dumps, Vault writes, 1Password writes |
| `database-safety`   | 2     | Block DROP TABLE, TRUNCATE, migrate:fresh/reset                  |
| `docker-safety`     | 1     | Block docker system prune, force remove, volume deletion         |

### Cloud & Infrastructure

| Collection          | Hooks | Description                                                 |
| ------------------- | ----- | ----------------------------------------------------------- |
| `cloud-safety`      | 3     | Block destructive AWS, GCP, and Azure CLI operations        |
| `kubernetes-safety` | 5     | Block kubectl delete, drain, exec, helm uninstall           |
| `cloudflare-safety` | 5     | Block wrangler delete, KV purge, D1 drops, R2 deletion      |
| `network-safety`    | 4     | Block SSH, Terraform destroy, Ansible playbook, SNMP writes |

### Network Engineering & Cisco UC

| Collection         | Hooks | Description                                                                    |
| ------------------ | ----- | ------------------------------------------------------------------------------ |
| `cisco-cli-safety` | 5     | Block writes across cisco-axl, cisco-ise, cisco-yang, audiocodes-cli, spok-api |
| `windmill-safety`  | 7     | Require pull before push, block runs, block secret reads                       |

### Productivity

| Collection           | Hooks | Description                                               |
| -------------------- | ----- | --------------------------------------------------------- |
| `auto-format`        | 1     | Run prettier after Claude writes or edits files           |
| `bash-audit-log`     | 1     | Log all bash commands to ~/.claude/bash-log.txt           |
| `notify-on-stop`     | 2     | Desktop notification when Claude finishes (macOS or cmux) |
| `npm-publish-safety` | 4     | Block npm unpublish, deprecate, owner, and access changes |

## Quick start

```bash
# Essential safety guardrails
npx cc-hooks-install add sieteunoseis/hooks.automate.builders/hooks/safety-essentials

# Add cloud protection
npx cc-hooks-install add sieteunoseis/hooks.automate.builders/hooks/cloud-safety

# Add Cisco UC protection
npx cc-hooks-install add sieteunoseis/hooks.automate.builders/hooks/cisco-cli-safety
```

## How it works

Each collection is a folder with a `claude-hooks.json` file. The CLI fetches it from GitHub, shows an interactive prompt to select which hooks to install, and merges them into `~/.claude/settings.json`.

```
hooks/
├── safety-essentials/claude-hooks.json
├── cloud-safety/claude-hooks.json
├── kubernetes-safety/claude-hooks.json
└── ...
```

## For CLI-specific hooks

Some tools ship `claude-hooks.json` in their own repos:

```bash
npx cc-hooks-install add sieteunoseis/spok-api
npx cc-hooks-install add sieteunoseis/cisco-axl
```

## Contributing

Add a new collection:

1. Create a folder under `hooks/` with a descriptive name
2. Add a `claude-hooks.json` following the [convention format](https://github.com/sieteunoseis/cc-hooks-install#for-cli-authors)
3. Open a PR

## License

MIT
