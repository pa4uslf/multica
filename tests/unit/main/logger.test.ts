import { describe, it, expect } from 'vitest'

import { resolveIsDev } from '../../../src/main/logger'

describe('logger', () => {
  describe('resolveIsDev', () => {
    it('should return false when app is packaged', () => {
      const result = resolveIsDev({ app: { isPackaged: true } }, 'development')
      expect(result).toBe(false)
    })

    it('should return true when app is not packaged', () => {
      const result = resolveIsDev({ app: { isPackaged: false } }, 'production')
      expect(result).toBe(true)
    })

    it('should fallback to NODE_ENV when app is unavailable', () => {
      const productionResult = resolveIsDev(undefined, 'production')
      const testResult = resolveIsDev('/path/to/electron-binary', 'test')

      expect(productionResult).toBe(false)
      expect(testResult).toBe(true)
    })
  })
})
