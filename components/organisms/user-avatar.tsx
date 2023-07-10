import { getDisplayName } from '@/lib/account/models/profile'
import { getAvatarString } from '@/lib/common/user'
import Profile from '@/lib/account/models/profile'
import { Avatar } from '../atoms/avatar'
import { AvatarSize } from 'antd/es/avatar/SizeContext'

export interface UserAvatarProps {
  profile: Profile
  size?: AvatarSize
}

export default function UserAvatar({ profile, size }: UserAvatarProps) {
  return <Avatar size={size}>{getAvatarString(getDisplayName(profile))}</Avatar>
}
