import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// 全局配置
afterEach(() => {
  // 每个测试用例执行后自动清理测试环境
  cleanup()
})
