"use client"

import { login } from '@/actions/login'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { PasswordInput } from '@/components/ui/input-password'
import { LoginSchema } from '@/schemas/auth'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '../../../ui/form'
import CardWrapper from './card-wrapper'


export default function LoginForm() {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof LoginSchema>) {
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
      headerLabel="Selamat Datang Kembali"
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
                  <FormLabel>Username</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              className="w-full"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </FormMain>
    </CardWrapper>
  )
}
