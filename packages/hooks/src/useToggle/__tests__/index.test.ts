import { renderHook, act } from '@testing-library/react'
import useToggle from '../index'

// act 用来处理异步操作
// 所有的异步操作都要放在act函数中执行
// 所有状态更新被刷新
// 组件重新渲染完成

const callToggle = (result: any) => {
  act(() => {
    result.current[1].toggle()
  })
}
describe('useToggle', () => {
  it('应该被定义', () => {
    expect(useToggle).toBeDefined()
  })

  it('默认返回一个false', () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current[0]).toBe(false)
  })

  it('可以设置默认值', () => {
    const { result } = renderHook(() => useToggle('hello'))
    expect(result.current[0]).toBe('hello')
  })

  it('可以切换值', () => {
    const { result } = renderHook(() => useToggle('hello'))
    callToggle(result)
    expect(result.current[0]).toBe(false)

    act(() => {
      result.current[1].setLeft()
    })
    expect(result.current[0]).toBe('hello')

    act(() => {
      result.current[1].setRight()
    })
    expect(result.current[0]).toBe(false)
  })

  it('在给定的两个值之间切换', () => {
    const { result } = renderHook(() => useToggle('hello', 'world'))
    expect(result.current[0]).toBe('hello')
    callToggle(result)
    expect(result.current[0]).toBe('world')
    callToggle(result)
    expect(result.current[0]).toBe('hello')
  })
})