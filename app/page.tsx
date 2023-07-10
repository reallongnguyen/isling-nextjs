'use client'
import HomeHeader from '@/components/templates/headers/HomeHeader'
import HomeHeaderForGuest from '@/components/templates/headers/HomeHeaderForGuest'
import {
  LoadingHeader,
  LoadingScreen,
} from '@/components/atoms/loading-skeleton'
import useAccount from '@/lib/account/useAccount'

function Page() {
  const { userProfile, isLoading: isLoadingAuth } = useAccount({
    mustLogin: false,
  })

  return (
    <>
      {isLoadingAuth && <LoadingHeader />}
      {isLoadingAuth && <LoadingScreen />}
      <header className="fixed h-12 lg:h-14 top-0 left-0 px-2 lg:px-6 w-full bg-primary z-40">
        {!userProfile ? (
          <HomeHeaderForGuest />
        ) : (
          <HomeHeader userProfile={userProfile} />
        )}
      </header>
      <div className="h-28" />
      <div className="mx-32">Home</div>
    </>
  )
}

export default Page
