import React from 'react'

import { Flex, FlexProps } from '../Flex'

export function HStack(props: FlexProps) {
  return <>
    <Flex {...props} fullWidth direction='row' />
  </>
}
