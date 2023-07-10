'use client'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useServerInsertedHTML } from 'next/navigation'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import { configAxiosInterceptor } from '@/lib/account/repo/axiosConfig'
import { useState } from 'react'

configAxiosInterceptor()

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => createCache())

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    )
  })

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <StyleProvider cache={cache}>{children}</StyleProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}
