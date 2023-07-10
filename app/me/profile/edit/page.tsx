'use client'
import { Button } from '@/components/atoms/button'
import { Form } from '@/components/atoms/form'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import {
  LoadingHeader,
  LoadingScreen,
} from '@/components/atoms/loading-skeleton'
import { Select } from '@/components/atoms/select'
import { Separator } from '@/components/atoms/separator'
import UserCard from '@/components/organisms/user-card'
import HomeHeader from '@/components/templates/headers/HomeHeader'
import useUpsertProfile, {
  validateDateOfBirth,
} from '@/lib/account/useUpsertProfile'
import { Rule } from 'antd/es/form'
import { useState } from 'react'

const dateOfBirthRule: Rule = ({ getFieldsValue }) => ({
  validator() {
    const { yearOfBirth, monthOfBirth, dayOfBirth } = getFieldsValue()

    if (!validateDateOfBirth(yearOfBirth, monthOfBirth, dayOfBirth)) {
      return Promise.reject(new Error('Please enter a valid date'))
    }

    return Promise.resolve()
  },
})

export default function EditProfilePage() {
  const { userProfile, handleUpsertProfile, editProfileForm, resetForm } =
    useUpsertProfile()
  const [dobErrors, setDOBErrors] = useState(
    editProfileForm.getFieldError('dayOfBirth')
  )

  if (!userProfile) {
    return (
      <>
        <LoadingHeader />
        <LoadingScreen />
      </>
    )
  }

  return (
    <>
      <header className="fixed h-12 lg:h-14 top-0 left-0 px-2 lg:px-6 w-full bg-primary z-40">
        <HomeHeader userProfile={userProfile} />
      </header>
      <div className="container-md">
        <div className="mt-20">
          <UserCard profile={userProfile} />
          <Separator className="mt-6" />
        </div>
        <div className="mt-6 text-xl">Edit your profile</div>
        <Form
          className="mt-8"
          onFinish={handleUpsertProfile}
          layout="vertical"
          requiredMark="optional"
          form={editProfileForm}
          onFieldsChange={() => {
            setDOBErrors(editProfileForm.getFieldError('dayOfBirth'))
          }}
        >
          <div className="lg:flex lg:space-x-4">
            <Form.Item
              name="firstName"
              label="First name"
              rules={[{ required: true, message: 'First name is required' }]}
              required
            >
              <Input name="firstName" type="text" className="w-56" />
            </Form.Item>
            <Form.Item name="lastName" label="Last name">
              <Input name="lastName" className="w-56" type="text" />
            </Form.Item>
          </div>
          <div className="w-56">
            <Form.Item
              name="gender"
              label="Gender"
              required
              rules={[{ required: true, message: 'Gender is required' }]}
            >
              <Select
                options={[
                  { value: 'female', label: 'Female' },
                  { value: 'male', label: 'Male' },
                  { value: 'other', label: 'Other' },
                  { value: 'unknown', label: 'Rather not say' },
                ]}
              />
            </Form.Item>
          </div>
          <div className="space-y-1">
            <Label htmlFor="yearOfBirth">Date of birth</Label>
            <div className="flex space-x-2">
              <Form.Item
                name="yearOfBirth"
                required
                rules={[{ required: true }, dateOfBirthRule]}
                dependencies={['dayOfBirth']}
                help=""
              >
                <Input
                  name="yearOfBirth"
                  placeholder="Year"
                  type="text"
                  className="w-20 text-center"
                />
              </Form.Item>
              <Form.Item
                name="monthOfBirth"
                required
                rules={[
                  {
                    required: true,
                  },
                  dateOfBirthRule,
                ]}
                shouldUpdate
                dependencies={['dayOfBirth']}
                help=""
              >
                <Input
                  name="monthOfBirth"
                  placeholder="Month"
                  type="text"
                  className="w-20 text-center"
                />
              </Form.Item>
              <Form.Item
                name="dayOfBirth"
                required
                rules={[
                  {
                    required: true,
                    message: 'Please enter a valid date',
                  },
                  dateOfBirthRule,
                ]}
                dependencies={['yearOfBirth', 'monthOfBirth']}
                help=""
              >
                <Input
                  name="dayOfBirth"
                  placeholder="Day"
                  type="text"
                  className="w-20 text-center"
                />
              </Form.Item>
            </div>
            <div
              className={`
                text-sm min-h-[1.25rem] pb-1 !-mt-5 flex items-start ml-1 leading-none font-light
                ${
                  dobErrors.length > 0
                    ? 'text-[#ff4d4f]'
                    : 'text-inherit brightness-75'
                }
              `}
            >
              {dobErrors[0] || 'Year-Month-Day format'}
            </div>
          </div>
          <div className="flex space-x-4">
            <Button type="primary" htmlType="submit" className="w-32 mt-4">
              Save
            </Button>
            <Button
              type="default"
              className="mt-4"
              onClick={(e) => {
                e.preventDefault()
                resetForm()
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
