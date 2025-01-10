import React, { useCallback, useEffect, useRef } from 'react'

import { BaseLayoutProps } from '../../../types/props'
import cn from 'classnames'

import s from './style.module.scss'

export interface ViewportProps extends BaseLayoutProps {
  direction?: 'row' | 'column' | 'all' | 'none'
  onScrollChange?: (isStart: boolean, isEnd: boolean) => unknown
  children?: React.ReactNode
}

export function Viewport(props: ViewportProps) {
  const {
    children, className, style,
    direction,
    fullWidth, fullHeight,
    onScrollChange,
    ...rest
  } = props
  const scrollRef = useRef<HTMLDivElement>(null)

  const checkScrollPosition = useCallback(() => {
    const element = scrollRef.current
    if (!element) return

    const { scrollLeft, scrollWidth, clientWidth } = element
    
    if (scrollWidth <= clientWidth) {
      onScrollChange?.(false, false)
      return
    }
    
    const newIsAtStart = scrollLeft <= 0
    const newIsAtEnd = Math.abs(scrollWidth - clientWidth - scrollLeft) <= 1

    onScrollChange?.(newIsAtStart, newIsAtEnd)
  }, [scrollRef, onScrollChange])

  useEffect(() => {
    const element = scrollRef.current
    element?.addEventListener('scroll', checkScrollPosition)
    checkScrollPosition()

    return () => element?.removeEventListener('scroll', checkScrollPosition)
  }, [scrollRef, checkScrollPosition])

  return <>
    <div
      {...rest}
      ref={scrollRef}
      className={cn(
        className,
        s[direction || 'none'],
        {
          [s.fullWidth]: fullWidth,
          [s.fullHeight]: fullHeight,
        },
      )}
      style={style}
    >{children}</div>
  </>
}
