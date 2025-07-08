import { useState, useMemo } from "react";

export interface Actions<T> {
  toggle: () => void
  set: (value: T) => void
  setLeft: () => void
  setRight: () => void
}
function useToggle<T = boolean>(): [boolean, Actions<T>]
function useToggle<T>(defaultValue: T): [T, Actions<T>]
function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>]
function useToggle<D, R>(defaultValue: D = false as D, reverseValue?: R) {
  const [state, setState] = useState<D | R>(defaultValue)

  const actions = useMemo(() => {
    const reverseValueOrign = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R

    const toggle = () => {
      setState((s) => (s === defaultValue ? reverseValueOrign : defaultValue))
    }
    const set = (value: D | R) => {
      setState(value)
    }
    const setLeft = () => {
      setState(defaultValue)
    }
    const setRight = () => {
      setState(reverseValueOrign)
    }

    return {
      toggle,
      set,
      setLeft,
      setRight
    }
  }, [])

  return [state, actions]
}

export default useToggle