import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { notification } from '@/components/atoms/notification'
import { Form } from '@/components/atoms/form'

import { signUpAccount } from './repo/api'
import { SignUpDTO, SignUpRequest, TokenResponse } from './models/dto'
import { ErrorResponse, SuccessResponse } from '../common/models/api-response'
import { getToken, setToken } from './repo/token'

export default function useSignUp() {
  const [signUpForm] = Form.useForm<SignUpDTO>()
  const router = useRouter()

  const { mutate: signUp, isPending } = useMutation<
    SuccessResponse<TokenResponse>,
    ErrorResponse,
    SignUpRequest
  >({
    mutationFn: signUpAccount,
    onSuccess: (resData) => {
      setToken(resData.data)
      router.push('/me/profile/edit')
    },
    onError: (error) => {
      let errorMessage = error.errors[0]

      if (error.code === 400) {
        errorMessage = 'Email address is incorrect format'

        if (
          error.errors[0] &&
          error.errors[0].toString().includes('email address duplicated')
        ) {
          errorMessage = 'Email address has already exist'
          signUpForm.setFields([{ name: 'email', errors: [errorMessage] }])
        }
      }

      notification.error({
        message: 'Sign Up error',
        description: errorMessage,
      })
    },
  })

  const handleSignUp = useCallback(
    (data: SignUpRequest) => signUp(data),
    [signUp]
  )

  // redirect if found token on local storage
  useEffect(() => {
    const savedToken = getToken()
    if (savedToken) {
      router.replace('/')
    }
  }, [router])

  return {
    handleSignUp,
    isLoading: isPending,
    signUpForm,
  }
}
