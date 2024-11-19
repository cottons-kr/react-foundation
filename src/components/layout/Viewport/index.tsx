import React from 'react'

import { BaseLayoutProps } from '../../../types/props'
import cn from 'classnames'

import s from './style.module.scss'

export interface ViewportProps extends BaseLayoutProps {
  direction?: 'row' | 'column' | 'all' | 'none'
  children?: React.ReactNode
}

export function Viewport(props: ViewportProps) {
  const {
    children, className, style,
    direction,
    fullWidth, fullHeight,
    ...rest
  } = props

  return <>
    <div
      {...rest}
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
