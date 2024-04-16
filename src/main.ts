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

    core.info(
      `Starting to deploy ${imageName} to ${org}/${proj}/${containerGroup}`
    )

    const response = await fetch(
      `https://api.salad.com/api/public/organizations/${org}/projects/${proj}/containers/${containerGroup}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ container: { image: imageName } }),
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
