'use client'
import { Button } from '@/components/atoms/button'
import { Card } from '@/components/atoms/card'
import { WebsiteLogo } from '@/components/atoms/logo'
import { Input } from '@/components/atoms/input'
import Link from 'next/link'
import useSignUp from '@/lib/account/useSignUp'
import { Form } from '@/components/atoms/form'
import validator from 'validator'

export default function Page() {
  const { handleSignUp, isLoading, signUpForm } = useSignUp()

  return (
    <div className="mt-24 lg:-mt-16">
      <div className="mb-2 opacity-60">
        <Link href="/">
          <WebsiteLogo />
        </Link>
      </div>
      <Card className="w-screen px-2 h-screen bg-transparent border-0 lg:w-[28rem] lg:h-auto lg:bg-primary lg:bg-opacity-10 lg:border lg:mt-0">
        <div className="mt-4">
          <div className="flex justify-center text-2xl font-semibold">
            Create an Isling Account
          </div>
        </div>
        <div className="mt-2">
          <Form
            className="space-2"
            onFinish={handleSignUp}
            form={signUpForm}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="email"
              label="Email"
              required
              rules={[{ required: true, message: 'Email is required' }]}
            >
              <Input
                name="email"
                type="text"
                autoComplete="username"
                size="large"
                required
                autoFocus
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              required
              rules={[
                { required: true, message: 'Password is required' },
                { min: 8, message: 'Password length must greater than 8' },
                {
                  validator(_, val) {
                    if (val && (!validator.isAscii(val) || val.includes(' '))) {
                      return Promise.reject(
                        new Error(
                          'Password should contain letters, digits and special characters'
                        )
                      )
                    }

                    return Promise.resolve()
                  },
                },
              ]}
            >
              <Input
                name="password"
                type="password"
                autoComplete="new-password"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              required
              dependencies={['password']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, val) {
                    if (val !== getFieldValue('password')) {
                      return Promise.reject(
                        new Error(
                          'Password and Confirm Password does not match'
                        )
                      )
                    }

                    return Promise.resolve()
                  },
                }),
              ]}
            >
              <Input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                size="large"
              />
            </Form.Item>
            <div className="mt-6 flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="w-36"
                size="large"
                disabled={isLoading}
              >
                Create
              </Button>
            </div>
          </Form>
          <div className="flex justify-center items-center mt-4 mb-4 text-secondary/80">
            <div className="text-sm">Already have an account?</div>
            <Button type="link" size="small">
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
