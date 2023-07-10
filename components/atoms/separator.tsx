'use client'

import { cn } from '@/lib/utils'

const Separator = (
  props: React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>
) => (
  <div
    className={cn('shrink-0 bg-border', 'h-full w-[1px]', props.className)}
    {...props}
  />
)

export { Separator }
