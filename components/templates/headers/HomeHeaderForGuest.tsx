import { FC } from 'react'
import { IoPersonOutline } from 'react-icons/io5'
import Link from 'next/link'

import { WebsiteLogo } from '@/components/atoms/logo'
import { Avatar } from '@/components/atoms/avatar'
import { Dropdown } from 'antd'
import { getGuestDropdownItems } from './UserDropdownContent'
import MenuItem from './MenuItem'
import { usePathname } from 'next/navigation'

const HomeHeaderForGuest: FC<unknown> = () => {
  const pathName = usePathname()

  return (
    <>
      <div className="fixed z-[999] left-1/2 -translate-x-1/2 h-14 flex justify-center items-center text-secondary">
        <div className="w-[34rem] rounded-full flex justify-center items-center pr-2 space-x-12">
          <MenuItem name="Home" url="/" active={pathName === '/'} />
          <MenuItem name="Explore" url="/" active={pathName === '/explore'} />
          <MenuItem name="Search" url="/" active={pathName === '/search'} />
          <MenuItem
            name="Create account"
            url="/signup"
            active={pathName === '/signup'}
          />
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
            menu={{ items: getGuestDropdownItems(), className: 'w-56' }}
            placement="bottomRight"
          >
            <Avatar
              size="large"
              icon={<IoPersonOutline className="text-base" />}
            />
          </Dropdown>
        </div>
      </div>
    </>
  )
}

export default HomeHeaderForGuest
