import { spawn, ChildProcess } from "child_process"

export default async function spawnCommand(command: string, path?: string) {
  const parts = command.split(" ")
  command = parts[0]
  const args = parts.slice(1)
  const cp = spawn(command, args, {
    stdio: "inherit",
    cwd: path,
  })
  return await onExit(cp)
}

function onExit(childProcess: ChildProcess): Promise<void> {
  return new Promise((resolve, reject) => {
    childProcess.once("exit", (code: number, signal: string) => {
      if (code === 0) {
        resolve(undefined)
      } else {
        reject(new Error("Exit with error code: " + code))
      }
    })
    childProcess.once("error", (err: Error) => {
      reject(err)
    })
  })
}
