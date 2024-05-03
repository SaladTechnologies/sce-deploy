import * as core from '@actions/core'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    core.warning('Starting action')
    const org = core.getInput('salad_organization')
    const proj = core.getInput('salad_project')
    const containerGroup = core.getInput('salad_container_group')
    const apiKey = core.getInput('salad_api_key')
    const imageName = core.getInput('image_name')

    // AWS private registry
    const awsKeyId = core.getInput(`access_key_id`)
    const secretAccessKey = core.getInput(`secret_access_key`)

    core.info(
      `Starting to deploy ${imageName} to ${org}/${proj}/${containerGroup}`
    )

    const body: any = { container: { image: imageName } }

    if (awsKeyId && secretAccessKey) {
      core.info(`Adding AWS Credentials`)

      body.registry_authentication = {
        aws_ecr: {
          access_key_id: awsKeyId,
          secret_access_key: secretAccessKey
        }
      }
    }

    const response = await fetch(
      `https://api.salad.com/api/public/organizations/${org}/projects/${proj}/containers/${containerGroup}`,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/merge-patch+json',
          'Salad-Api-Key': apiKey,
          'User-Agent': 'Salad SCE Deploy/0.1'
        }
      }
    )

    if (!response.ok) {
      throw new Error('❌Unable to deploy updated container to Salad.❌')
    }

    core.info('✅ The SCE Container Group was successfully updated!✅')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
