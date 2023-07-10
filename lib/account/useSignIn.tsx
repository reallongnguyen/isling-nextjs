import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { getTokenByPassword } from './repo/api'
import { SignInRequest, TokenResponse } from './models/dto'
import { ErrorResponse, SuccessResponse } from '../common/models/api-response'
import { getToken, setToken } from './repo/token'
import { notification } from '@/components/atoms/notification'
import { Form } from '@/components/atoms/form'

export default function useSignIn() {
  const [signInForm] = Form.useForm<SignInRequest>()
  const router = useRouter()

  const { mutate: signIn, isPending } = useMutation<
    SuccessResponse<TokenResponse>,
    ErrorResponse,
    SignInRequest
  >({
    mutationFn: getTokenByPassword,
    onSuccess: (resData) => {
      setToken(resData.data)
      router.push('/')
    },
    onError: (error) => {
      if (error.code === 401) {
        notification.error({
          message: 'Sign In error',
          description: 'Your Email and Password does not match',
        })

        signInForm.setFields([
          {
            name: 'email',
            errors: ['Your Email and Password does not match'],
          },
          {
            name: 'password',
            errors: ['Your Email and Password does not match'],
          },
        ])
      }

      if (error.code === 400) {
        notification.error({
          message: 'Sign In error',
          description: 'Email address is incorrect format',
        })

        signInForm.setFields([
          {
            name: 'email',
            errors: ['Email address is incorrect format'],
          },
        ])
      }
    },
  })

  const handleSignIn = useCallback(
    (data: SignInRequest) => {
      signIn(data)
    },
    [signIn]
  )

  // redirect if found token on local storage
  useEffect(() => {
    const savedToken = getToken()
    if (savedToken) {
      router.replace('/')
    }
  }, [router])

  return {
    signInForm,
    handleSignIn,
    isLoading: isPending,
  }
}
