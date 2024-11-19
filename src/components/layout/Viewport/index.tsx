import React from 'react'

import { BaseProps } from '../../../types/props'

import s from './style.module.scss'
import cn from 'classnames'

export interface ViewportProps extends BaseProps {
  direction?: 'row' | 'column' | 'all' | 'none'
  children?: React.ReactNode
}

export function Viewport(props: ViewportProps) {
  return <>
    <div
      className={cn(
        s[props.direction || 'none'],
        props.className,
      )}
    >{props.children}</div>
  </>
}
