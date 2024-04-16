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

    core.warning(`Org: ${org}`)
    core.warning(`Project: ${proj}`)
    core.warning(`ContainerGroup: ${containerGroup}`)
    // const ms: string = core.getInput('milliseconds')

    // // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    // core.debug(`Waiting ${ms} milliseconds ...`)

    // // Log the current timestamp, wait, then log the new timestamp
    // core.debug(new Date().toTimeString())
    // await wait(parseInt(ms, 10))
    // core.debug(new Date().toTimeString())

    // // Set outputs for other workflow steps to use
    // core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
