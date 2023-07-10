import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { notification } from '@/components/atoms/notification'
import validator from 'validator'
import dayjs from 'dayjs'

import { upsertUserProfile } from './repo/api'
import {
  UpdateProfileDTO,
  UpdateProfileRequest,
  toUpdateProfileRequest,
} from './models/dto'
import { ErrorResponse, SuccessResponse } from '../common/models/api-response'
import Profile from './models/profile'
import useAccount from './useAccount'
import { Form } from '@/components/atoms/form'

export const validateDateOfBirth = (
  yearOfBirth: string,
  monthOfBirth: string,
  dayOfBirth: string
) => {
  if (!yearOfBirth || !monthOfBirth || !dayOfBirth) {
    return true
  }

  const month = monthOfBirth.padStart(2, '0')
  const day = dayOfBirth.padStart(2, '0')

  const dateString = `${yearOfBirth}/${month}/${day}`

  return (
    validator.isDate(dateString) &&
    dayjs(dateString).isBefore(new Date()) &&
    dayjs(dateString).isAfter('1899-12-31')
  )
}

export default function useUpsertProfile() {
  const {
    userProfile,
    isLoading: isLoadingAuth,
    refetchProfile,
  } = useAccount({
    mustLogin: true,
  })
  const [editProfileForm] = Form.useForm<UpdateProfileDTO>()

  const { mutate: upsertProfileMutate, isPending } = useMutation<
    SuccessResponse<Profile>,
    ErrorResponse,
    UpdateProfileRequest
  >({
    mutationFn: upsertUserProfile,
    onSuccess: () => {
      refetchProfile()
      notification.success({
        message: 'Update profile successfully',
      })
    },
    onError: (error) => {
      const errorMessage = error.errors[0]

      notification.error({
        message: 'Update profile error',
        description: errorMessage,
      })
    },
  })

  const handleUpsertProfile = useCallback(
    (data: UpdateProfileDTO) =>
      upsertProfileMutate(toUpdateProfileRequest(data)),
    [upsertProfileMutate]
  )

  const setFormValuesByProfile = useCallback(() => {
    if (userProfile && userProfile.firstName) {
      editProfileForm.setFieldsValue({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        gender: String(userProfile.gender),
      })

      const dateOfBirth = userProfile.dateOfBirth
      if (dateOfBirth) {
        editProfileForm.setFieldsValue({
          yearOfBirth: `${dateOfBirth.getFullYear()}`,
          monthOfBirth: `${dateOfBirth.getMonth() + 1}`.padStart(2, '0'),
          dayOfBirth: `${dateOfBirth.getDate()}`.padStart(2, '0'),
        })
      }
    }
  }, [editProfileForm, userProfile])

  useEffect(() => {
    setFormValuesByProfile()
  }, [setFormValuesByProfile])

  return {
    handleUpsertProfile,
    isLoading: isPending,
    editProfileForm,
    isLoadingAuth,
    userProfile,
    resetForm: setFormValuesByProfile,
  }
}
