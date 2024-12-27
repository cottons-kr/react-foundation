import React from 'react'

import { BaseLayoutProps } from '../../../types/props'
import cn from 'classnames'

import s from './style.module.scss'

export interface FlexProps extends BaseLayoutProps {
  direction?: 'row' | 'column'
  justify?: 'start' | 'end' | 'center' | 'between' | 'around'
  align?: 'start' | 'end' | 'center' | 'stretch'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | boolean
  gap?: string | number
  tag?: keyof JSX.IntrinsicElements
  children?: React.ReactNode
}

export function Flex(props: FlexProps) {
  const {
    tag, children, className, style,
    direction, justify, align, wrap, gap,
    fitContent, fullWidth, fullHeight,
    ...rest
  } = props

  return React.createElement(
    tag || 'div',
    {
      ...rest,
      className: cn(
        s.flex,
        {
          [s.flexRow]: direction === 'row',
          [s.flexColumn]: direction === 'column',
          [s.flexJustifyStart]: justify === 'start',
          [s.flexJustifyEnd]: justify === 'end',
          [s.flexJustifyCenter]: justify === 'center',
          [s.flexJustifyBetween]: justify === 'between',
          [s.flexJustifyAround]: justify === 'around',
          [s.flexAlignStart]: align === 'start',
          [s.flexAlignEnd]: align === 'end',
          [s.flexAlignCenter]: align === 'center',
          [s.flexAlignStretch]: align === 'stretch',
          [s.flexWrap]: typeof wrap === 'boolean' ? wrap : wrap === 'wrap',
          [s.flexWrapNowrap]: wrap === 'nowrap',
          [s.flexWrapReverse]: wrap === 'wrap-reverse',
          [s.fitContent]: fitContent,
          [s.fullWidth]: fullWidth,
          [s.fullHeight]: fullHeight,
        },
        className,
      ),
      style: {
        gap,
        ...style,
      },
    },
    children,
  )
}
