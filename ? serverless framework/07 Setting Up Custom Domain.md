### Setting Up Custom Domain

---

Can be done through the AWS Management console. Here we do it through serverless framework config.

Plugin

- Serverless Domain Manager
  - Only in dev, not in prod

```bash
yarn add -D serverless-domain-manager
```

Add the domain to the config plugin section.

Add a section `customDomain` under the `custom`.

Already have a domain and hosted zone in `Route53`. Will use a sub domain,

```yml
custom:
  customDomain:
    domainName: tour-api.my-tour-assistant.com
```

We also need to add the `basePath`. A base path is after the domain and before the resource path.

For example, in `https://something.amazonaws.com/dev/todo`, the `/dev` is the base path.

In our case, we will replace the base path with `v1` or `v2` etc.

Updated config should be,

```yml
custom:
  customDomain:
    domainName: tour-api.my-tour-assistant.com
    basePath: "v1"
```

stage:

```yml
custom:
  customDomain:
    domainName: tour-api.my-tour-assistant.com
    basePath: "v1"
    stage: ${self:provider.stage}
```

Certificate:

```yml
custom:
  customDomain:
    domainName: tour-api.my-tour-assistant.com
    basePath: "v1"
    stage: ${self:provider.stage}
    certificateName: my-tour-assistant.com
```

need to create a `route53` record,

```yml
custom:
  customDomain:
    domainName: tour-api.my-tour-assistant.com
    basePath: "v1"
    stage: ${self:provider.stage}
    certificateName: my-tour-assistant.com
    createRoute53Record: true
```

Create domain by,

```bash
sls create_domain
```

In api gateway, under the `Custom Domain Names` I should see the new domain name being added as well as ssl certificate.

Now deploy the serverless stack,

```bash
sls deploy
```
