"use client"

import newPassword from '@/actions/new-password'
import { ButtonMain } from '@/components/custom-button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/input-password'
import { NewPasswordSchema, NewPasswordSchemaType } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import CardWrapper from '../../card-wrapper'

export default function NewPasswordForm() {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()

    const token = searchParams.get("token")

    const form = useForm<NewPasswordSchemaType>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ""
        },
    })


    const onSubmit = (values: NewPasswordSchemaType) => {
        setError(undefined)
        setSuccess(undefined)

        if (!token) {
            setError("Missing token!")
            return
        }
        startTransition(async () => {
            await newPassword(values, token).then((data) => {
                setSuccess(data.success)
                setError(data.error)
            }).catch(() => {
                setError("Something went wrong!")
            })
        })
    }

    return (
        <CardWrapper
            headerLabel='AUTH'
            descLabel='Confirming your verification'
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
