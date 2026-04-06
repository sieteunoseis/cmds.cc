# cisco-cli-safety

Block write operations across all Cisco UC CLI tools — AXL, ISE, YANG, DIME, and AudioCodes.

## Install

```bash
npx @cmds-cc/hooks add cmds-cc/cmds.cc/hooks/cisco-cli-safety
```

## Hooks

| Hook                        | Default | Description                                                                                        |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| Block cisco-axl writes      | On      | Blocks add, update, remove, execute, and sql update on Cisco CUCM via AXL                          |
| Block cisco-ise writes      | On      | Blocks add, update, delete, create, extend, suspend, and reinstate on Cisco ISE                    |
| Block cisco-yang writes     | On      | Blocks set, delete, and rpc operations on IOS-XE devices via RESTCONF                              |
| Block audiocodes-cli writes | On      | Blocks device save and test-call dial/drop on AudioCodes SBCs                                      |
| Block spok-api writes       | On      | Blocks send-page, change-status, add, update, delete, assign, set, and datafeed on Spok SmartSuite |

## Companion skill

For full Cisco UC orchestration (troubleshooting, provisioning, monitoring), install the [cisco-uc-engineer skill](https://github.com/cmds-cc/skills/tree/master/skills/cisco-uc-engineer):

```bash
npx skills add cmds-cc/skills
```

## License

MIT
