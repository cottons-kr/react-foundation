import React from 'react'

export interface BaseProps {
  className?: string
  style?: React.CSSProperties
}

export interface BaseLayoutProps extends BaseProps, React.HTMLAttributes<HTMLDivElement> {
  fitContent?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
}

export interface ILayoutProps {
  children: React.ReactNode
}

export interface IErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export interface IParams<P extends string | number | symbol = '', S extends string | number | symbol = ''> {
  params: Promise<Record<P, string>>
  searchParams: Promise<Record<S, string>>
}
