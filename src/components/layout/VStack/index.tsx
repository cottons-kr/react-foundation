import React from 'react'

import { Flex, FlexProps } from '../Flex'

export function VStack(props: FlexProps) {
  return <>
    <Flex {...props} fullWidth direction='column' />
  </>
}
