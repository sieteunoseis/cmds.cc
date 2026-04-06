# cloud-safety

Block destructive AWS, GCP, and Azure CLI operations — instance termination, bucket deletion, IAM changes.

## Install

```bash
npx @cmds-cc/hooks add cmds-cc/cmds.cc/hooks/cloud-safety
```

## Hooks

| Hook                               | Default | Description                                                                                           |
| ---------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| Block AWS destructive operations   | On      | Blocks aws ec2 terminate, s3 rb, s3 rm --recursive, rds delete, iam delete, and cloudformation delete |
| Block GCP destructive operations   | On      | Blocks gcloud compute instances delete, storage rm, sql instances delete, and iam changes             |
| Block Azure destructive operations | On      | Blocks az vm delete, az group delete, az storage account delete, and az aks delete                    |

## License

MIT
