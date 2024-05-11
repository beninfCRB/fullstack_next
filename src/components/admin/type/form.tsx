"use client"

import { PostType } from '@/actions/type'
import { ButtonMain } from '@/components/custom-button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { TypeSchema, TypeSchemaType } from '@/schemas/type'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import CardWrapper from '../card-wrapper'


export default function TypeForm() {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<TypeSchemaType>({
        resolver: zodResolver(TypeSchema),
        defaultValues: {
            name: ""
        },
    })

    function onSubmit(values: TypeSchemaType) {
        setError(undefined)
        setSuccess(undefined)

        startTransition(async () => {
            await PostType(values).then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel='Buat Data Tipe'
        >
            <FormMain {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Tipe</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            placeholder="Masukan Nama Tipe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <div
                            className='flex items-center justify-end'
                        >
                            <ButtonMain
                                disabled={isPending}
                                className="w-full"
                                type="submit"
                                variant={'default'}
                            >
                                Simpan
                            </ButtonMain>
                            <ButtonMain
                                disabled={isPending}
                                className="w-full"
                                type="submit"
                                variant={'secondary'}
                            >
                                Batal
                            </ButtonMain>
                        </div>
                    </div>
                </form>
            </FormMain>
        </CardWrapper>
    )
}
