import React from 'react'

import { BaseLayoutProps } from '../../../types/props'
import cn from 'classnames'

import s from './style.module.scss'

export interface ViewportProps extends BaseLayoutProps {
  direction?: 'row' | 'column' | 'all' | 'none'
  children?: React.ReactNode
}

export function Viewport(props: ViewportProps) {
  return <>
    <div
      className={cn(
        props.className,
        s[props.direction || 'none'],
        {
          [s.fullWidth]: props.fullWidth,
          [s.fullHeight]: props.fullHeight,
        },
      )}
    >{props.children}</div>
  </>
}
