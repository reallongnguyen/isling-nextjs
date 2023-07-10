'use client'
import { FC } from 'react'
import Link from 'next/link'

import { WebsiteLogo } from '@/components/atoms/logo'
import Profile from '@/lib/account/models/profile'
import { usePathname } from 'next/navigation'
import MenuItem from './MenuItem'
import UserAvatar from '@/components/organisms/user-avatar'
import { Dropdown } from 'antd'
import { getUserDropdownItems } from './UserDropdownContent'

export interface HeaderProps {
  userProfile: Profile
}

const HomeHeader: FC<HeaderProps> = ({ userProfile }) => {
  const pathName = usePathname()

  return (
    <>
      <div className="fixed z-[999] left-1/2 -translate-x-1/2 h-14 flex justify-center items-center text-secondary">
        <div className="w-[34rem] rounded-full flex justify-center items-center pr-2 space-x-12">
          <MenuItem name="Home" url="/" active={pathName === '/'} />
          <MenuItem name="Explore" url="/" active={pathName === '/explore'} />
          <MenuItem
            name="Your Post"
            url="/"
            active={pathName === '/me/posts'}
          />
          <MenuItem name="Search" url="/" active={pathName === '/search'} />
        </div>
      </div>
      <div className="grid grid-cols-[1fr_auto] h-full text-secondary">
        <div className="flex items-center h-full space-x-6">
          <Link href="/">
            <WebsiteLogo />
          </Link>
        </div>
        <div className="flex items-center h-full space-x-3 lg:space-x-6">
          <Dropdown
            menu={{
              items: getUserDropdownItems(userProfile),
              className: 'w-56',
            }}
            placement="bottomRight"
          >
            <div>
              <UserAvatar size="large" profile={userProfile} />
            </div>
          </Dropdown>
        </div>
      </div>
    </>
  )
}

export default HomeHeader
