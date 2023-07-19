/**
 * Expects the code to be transpiled to the target browser to be executed sucessfully.
 * @param transpiledCode
 */
export function executeCode(transpiledCode: string) {
  try {
    new Function(transpiledCode)()
  } catch (error) {
    console.error('There was an error executing the code. ', error)
  }
}
