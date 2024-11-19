import React from 'react'

import { BaseProps } from '../../../types/props'
import cn from 'classnames'

import s from './style.module.scss'

export interface FlexProps extends BaseProps {
  direction?: 'row' | 'column'
  justify?: 'start' | 'end' | 'center' | 'between' | 'around'
  align?: 'start' | 'end' | 'center' | 'stretch'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | boolean
  tag?: keyof JSX.IntrinsicElements
  children?: React.ReactNode
}

export function Flex(props: FlexProps) {
  return React.createElement(
    props.tag || 'div',
    {
      className: cn(
        s.flex,
        {
          [s.flexRow]: props.direction === 'row',
          [s.flexColumn]: props.direction === 'column',
          [s.flexJustifyStart]: props.justify === 'start',
          [s.flexJustifyEnd]: props.justify === 'end',
          [s.flexJustifyCenter]: props.justify === 'center',
          [s.flexJustifyBetween]: props.justify === 'between',
          [s.flexJustifyAround]: props.justify === 'around',
          [s.flexAlignStart]: props.align === 'start',
          [s.flexAlignEnd]: props.align === 'end',
          [s.flexAlignCenter]: props.align === 'center',
          [s.flexAlignStretch]: props.align === 'stretch',
          [s.flexWrap]: typeof props.wrap === 'boolean' ? props.wrap : props.wrap === 'wrap',
          [s.flexWrapNowrap]: props.wrap === 'nowrap',
          [s.flexWrapReverse]: props.wrap === 'wrap-reverse',
        },
        props.className,
      ),
      style: props.style,
    },
    props.children,
  )
}
