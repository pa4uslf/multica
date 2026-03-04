import { createRequire } from 'node:module'
import log from 'electron-log/main'

type ElectronModuleLike =
  | {
      app?: {
        isPackaged?: boolean
      }
    }
  | string
  | null
  | undefined

const require = createRequire(import.meta.url)

function loadElectronModule(): ElectronModuleLike {
  try {
    return require('electron') as ElectronModuleLike
  } catch {
    return null
  }
}

export function resolveIsDev(
  electronModule: ElectronModuleLike = loadElectronModule(),
  nodeEnv: string | undefined = process.env.NODE_ENV
): boolean {
  if (electronModule && typeof electronModule === 'object') {
    const packaged = electronModule.app?.isPackaged
    if (typeof packaged === 'boolean') {
      return !packaged
    }
  }
  return nodeEnv !== 'production'
}

const isDev = resolveIsDev()

// Initialize electron-log
log.initialize()

// Configure log levels
// Production: write to file (info and above)
// Development: console only, no file
log.transports.file.level = isDev ? false : 'info'
log.transports.console.level = 'debug'

// Log file location (production): ~/Library/Logs/Multica/main.log (macOS)

// Catch unhandled errors
log.errorHandler.startCatching()

export default log
