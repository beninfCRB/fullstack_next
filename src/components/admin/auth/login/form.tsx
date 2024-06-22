"use client"

import { login } from '@/actions/login'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { PasswordInput } from '@/components/ui/input-password'
import { LoginSchema, LoginSchemaType } from '@/schemas/auth'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '../../../ui/form'
import CardWrapper from '../../ui/card-wrapper'
import Link from 'next/link'
import { ButtonMain } from '@/components/custom-button'


export default function LoginForm() {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  function onSubmit(values: LoginSchemaType) {
    setError(undefined)
    setSuccess(undefined)

    startTransition(async () => {
      await login(values).then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
    })
  }

  return (
    <CardWrapper
      headerLabel='AUTH'
      descLabel="Selamat datang kembali"
      className='w-[400px] shadow-lg'
    >
      <FormMain {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Masukan Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      disabled={isPending}
                      placeholder="Masukan password"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    size={'sm'}
                    variant={'link'}
                    className='px-0 font-normal text-black'
                    asChild
                  >
                    <Link
                      className='text-black dark:text-white'
                      href={'/auth/reset'}
                    >
                      Lupa kata sandi?
                    </Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <ButtonMain
              disabled={isPending}
              className="w-full"
              type="submit"
            >
              Sign In
            </ButtonMain>
          </div>
        </form>
      </FormMain>
    </CardWrapper>
  )
}
