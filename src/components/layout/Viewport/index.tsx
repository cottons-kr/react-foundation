import React, { forwardRef, useCallback, useEffect, useRef } from 'react'

import { BaseLayoutProps } from '../../../types/props'
import cn from 'classnames'

import s from './style.module.scss'

interface ScrollState {
  isStart: boolean
  isEnd: boolean
  isMiddle: boolean
}

export interface ViewportProps extends BaseLayoutProps {
  direction?: 'row' | 'column' | 'all' | 'none'
  onScrollChange?: (isStart: boolean, isEnd: boolean, isMiddle: boolean) => void
  children?: React.ReactNode
}

function useMergedRef<T>(...refs: (React.Ref<T> | null | undefined)[]) {
  return useCallback((element: T | null) => {
    refs.forEach(ref => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(element)
      } else {
        (ref as React.MutableRefObject<T | null>).current = element
      }
    })
  }, refs)
}

export const Viewport = forwardRef<HTMLDivElement, ViewportProps>((props, forwardedRef) => {
  const {
    children,
    className,
    style,
    direction = 'none',
    fullWidth,
    fullHeight,
    onScrollChange,
    ...rest
  } = props
  
  const innerRef = useRef<HTMLDivElement>(null)
  const prevStateRef = useRef<ScrollState>({ isStart: false, isEnd: false, isMiddle: false })
  const mergedRef = useMergedRef(innerRef, forwardedRef)

  const getScrollState = useCallback((element: HTMLDivElement): ScrollState => {
    const { scrollLeft, scrollWidth, clientWidth } = element
    
    if (scrollWidth <= clientWidth) {
      return { isStart: false, isEnd: false, isMiddle: false }
    }
    
    return {
      isStart: scrollLeft <= 0,
      isEnd: Math.abs(scrollWidth - clientWidth - scrollLeft) <= 1,
      isMiddle: scrollLeft > 0 && Math.abs(scrollWidth - clientWidth - scrollLeft) > 1
    }
  }, [])

  const shouldUpdateState = (current: ScrollState, prev: ScrollState): boolean => {
    return current.isStart !== prev.isStart || current.isEnd !== prev.isEnd
  }

  const checkScrollPosition = useCallback(() => {
    const element = innerRef.current
    if (!element) return

    const newState = getScrollState(element)
    const prevState = prevStateRef.current

    if (shouldUpdateState(newState, prevState)) {
      prevStateRef.current = newState
      onScrollChange?.(newState.isStart, newState.isEnd, newState.isMiddle)
    }
  }, [getScrollState, onScrollChange])

  useEffect(() => {
    const element = innerRef.current
    if (!element) return

    element.addEventListener('scroll', checkScrollPosition)
    checkScrollPosition()

    return () => {
      element.removeEventListener('scroll', checkScrollPosition)
    }
  }, [checkScrollPosition])

  return <>
    <div
      {...rest}
      ref={mergedRef}
      className={cn(
        className,
        s[direction],
        {
          [s.fullWidth]: fullWidth,
          [s.fullHeight]: fullHeight,
        }
      )}
      style={style}
    >
      {children}
    </div>
  </>
})
