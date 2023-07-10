'use client'

import { Button } from '@/components/atoms/button'
import { Card } from '@/components/atoms/card'
import { WebsiteLogo } from '@/components/atoms/logo'
import { Input } from '@/components/atoms/input'
import useSignIn from '@/lib/account/useSignIn'
import Link from 'next/link'
import { Form } from '@/components/atoms/form'

export default function Page() {
  const { handleSignIn, isLoading, signInForm } = useSignIn()

  return (
    <div className="mt-24 lg:-mt-16">
      <div className="mb-2 opacity-60">
        <Link href="/">
          <WebsiteLogo />
        </Link>
      </div>
      <Card className="w-screen px-2 h-screen bg-transparent border-0 lg:w-[28rem] lg:h-auto lg:bg-primary lg:bg-opacity-10 lg:border lg:mt-0">
        <div className="mt-4">
          <div className="flex justify-center text-3xl font-semibold">
            Sign in
          </div>
        </div>
        <div className="mt-2">
          <Form
            className="space-2"
            onFinish={handleSignIn}
            layout="vertical"
            requiredMark="optional"
            form={signInForm}
          >
            <Form.Item
              name="email"
              label="Email"
              required
              // help={signInForm.formState.errors.email?.message}
              // validateStatus={
              //   !!signInForm.formState.errors.email ? 'error' : 'success'
              // }
              rules={[
                {
                  required: true,
                  message: 'Email is required',
                },
                {
                  type: 'email',
                  message: 'Email address is incorrect format',
                },
              ]}
            >
              <Input
                name="email"
                type="text"
                autoComplete="username"
                size="large"
                autoFocus
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              required
              // help={signInForm.formState.errors.password?.message}
              // validateStatus={
              //   !!signInForm.formState.errors.password ? 'error' : 'success'
              // }
              rules={[
                {
                  required: true,
                  message: 'Password is required',
                },
              ]}
            >
              <Input
                name="password"
                type="password"
                autoComplete="current-password"
                size="large"
                // isError={!!signInForm.formState.errors.password}
                // hint={signInForm.formState.errors.password?.message}
                // {...signInForm.register('password', {
                //   required: 'Password is required',
                // })}
              />
            </Form.Item>
            <div className="mt-6 mb-4 flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-36"
                disabled={isLoading}
              >
                Sign in
              </Button>
            </div>
            <div className="flex items-center justify-center mb-4 text-secondary/80">
              <div className="text-sm">Does not have an account?</div>
              <Button type="link" size="small">
                <Link href="/signup">Create Free Account</Link>
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  )
}
