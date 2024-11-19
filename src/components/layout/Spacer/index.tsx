import React from 'react'
import { BaseProps } from '../../../types/props'

export interface SpacerProps extends BaseProps {
  width?: string
  height?: string
}

export function Spacer(props: SpacerProps) {
  return <>
    <div
      className={props.className}
      style={{
        ...props.style,
        width: props.width, height: props.height,
      }}
    />
  </>
}
