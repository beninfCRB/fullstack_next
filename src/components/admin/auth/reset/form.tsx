"use client"

import { reset } from '@/actions/reset-password'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { Input } from "@/components/ui/input"
import { ResetSchema, ResetSchemaType } from '@/schemas/auth'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '../../../ui/form'
import CardWrapper from '../../ui/card-wrapper'
import { ButtonMain } from '@/components/custom-button'


export default function ResetForm() {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<ResetSchemaType>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: ""
    },
  })

  function onSubmit(values: ResetSchemaType) {
    setError(undefined)
    setSuccess(undefined)

    startTransition(async () => {
      await reset(values).then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
    })
  }

  return (
    <CardWrapper
      className='w-[400px] shadow-lg'
      headerLabel="AUTH"
      descLabel="Atur ulang kata sandi"
      backButtonLabel='Kembali ke halaman login'
      backButtonHref='/auth/login'
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
            <FormError message={error} />
            <FormSuccess message={success} />
            <ButtonMain
              disabled={isPending}
              className="w-full"
              type="submit"
            >
              Submit
            </ButtonMain>
          </div>
        </form>
      </FormMain>
    </CardWrapper>
  )
}
