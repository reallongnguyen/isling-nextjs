'use client'

import { HTMLProps, PropsWithChildren } from 'react'

function Label(props: PropsWithChildren<HTMLProps<HTMLDivElement>>) {
  return <div {...props}>{props.children}</div>
}

export { Label }
