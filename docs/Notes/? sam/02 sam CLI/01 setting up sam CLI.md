### setting up sam CLI
---

[instruction](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-linux.html)

cmd: sha256sum aws-sam-cli-linux-x86_64.zip
01f9d2059c02ace13f3cc1429f6a9a89a6b50e3d339585aab36f395dba0e8ae8  aws-sam-cli-linux-x86_64.zip

cmd: unzip aws-sam-cli-linux-x86_64.zip -d sam-installation

From home directory

`--update`, since already aws cli is installed

cmd: sudo ./sam-installation/install --update

cmd: /usr/local/bin/sam --version
SAM CLI, version 1.23.0

cmd: sam --version
SAM CLI, version 1.23.0