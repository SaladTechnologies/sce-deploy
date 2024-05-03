# Automatically Deploy Containers to Salad's SCE

<!--
[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg) -->

## Usage Example

Place the following in step in your github actions

```yml
 - name: Deploy Update to SCE
        uses: SaladTechnologies/sce-deploy@v0.1.0
        with:
          salad_organization: <salad organization name>
          salad_project: <salad project name>
          salad_container_group: <salad container group name>
          salad_api_key: ${{secrets.SALAD_API_KEY}}
          image_name: <registry:tag>

```

## Requirements

- You must already have a Salad account with an existing container group. This
  github action will simply update the image for the container group. All other
  updates can be made using either the portal or the public API.
- You must get your Salad API key [here](https://portal.salad.com/api-key). It
  is highly recommended to store this in Github as a secret (see example above).

## Setup Steps

1. Create a Salad account at https://portal.salad.com
2. Get the API key for your Salad account
   [here](https://portal.salad.com/api-key)
3. Create a container group to configure hardware requirements, env vars...
4. Update the github action to include the salad organization, project &
   container group

## Settings

Keys can be added directly to your .yml config file or referenced from your
project `Secrets` storage.

To add a `secret` go to the `Settings` tab in your project then select
`Secrets`. We strongly recommend you store your `password` as a secret.

| Key Name                | Required | Example                    | Description                                                        |
| ----------------------- | -------- | -------------------------- | ------------------------------------------------------------------ |
| `salad_organization`    | Yes      | `salad`                    | The Salad organization name. Can be found in the portal url        |
| `salad_project`         | Yes      | `production`               | The Salad project name. Can be found in the portal url             |
| `salad_container_group` | Yes      | `my-container-group`       | The Salad container group name. Can be found in the portal url bar |
| `salad_api_key`         | Yes      | `********`                 | The Salad API key                                                  |
| `image_name`            | Yes      | `ghcr.io/my-container:0.1` | The full image name, including registry, image name and tag        |
