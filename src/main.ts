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

    core.warning(`Org: ${org}`)
    core.warning(`Project: ${proj}`)
    core.warning(`ContainerGroup: ${containerGroup}`)

    core.warning(`Making request`)
    // https.request()

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

    core.warning(response.status.toString())

    if (!response.ok) {
      core.setFailed('Unable to deploy updated container to Salad')
      return
    }

    const body = await response.json()

    core.warning(body)
  } catch (error) {
    core.warning('Had an error')
    core.error(JSON.stringify(error))
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
