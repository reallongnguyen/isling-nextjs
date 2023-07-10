'use client'

import Profile, { getDisplayName } from '@/lib/account/models/profile'
import { MenuProps } from 'antd'
import Link from 'next/link'
import {
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonAddOutline,
  IoPersonOutline,
} from 'react-icons/io5'

export const getUserDropdownItems = (
  userProfile: Profile
): MenuProps['items'] => [
  {
    key: 'fullName',
    label: getDisplayName(userProfile),
  },
  {
    type: 'divider',
  },
  {
    key: 'profile',
    label: <Link href="/me/profile/edit">Profile</Link>,
    icon: <IoPersonOutline />,
  },
  {
    key: 'signout',
    label: <Link href="/signout">Sign out</Link>,
    icon: <IoLogOutOutline />,
  },
]

export const getGuestDropdownItems = (): MenuProps['items'] => [
  {
    key: 'signin',
    label: <Link href="/signin">Sign in</Link>,
    icon: <IoLogInOutline />,
  },
  {
    key: 'signup',
    label: <Link href="/signup">Sign up</Link>,
    icon: <IoPersonAddOutline />,
  },
]
