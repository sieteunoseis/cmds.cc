# network-safety

Block destructive network and infrastructure commands — SSH, firewall, routing, and interface changes.

## Install

```bash
npx @cmds-cc/hooks add cmds-cc/cmds.cc/hooks/network-safety
```

## Hooks

| Hook                              | Default | Description                                                                                         |
| --------------------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| Block SSH to production devices   | Off     | Prevents direct SSH sessions to network devices — use read-only tools or get approval first         |
| Block Terraform destroy and taint | On      | Prevents terraform destroy and terraform taint which remove infrastructure                          |
| Block Ansible playbook runs       | On      | Prevents ansible-playbook execution without explicit approval — playbooks can change device configs |
| Block SNMP write operations       | On      | Prevents snmpset which can modify device configuration via SNMP                                     |

## License

MIT
