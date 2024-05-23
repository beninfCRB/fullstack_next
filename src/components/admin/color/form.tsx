"use client"

import { PostColor, PutColor } from '@/actions/color'
import { ButtonMain } from '@/components/custom-button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { ColorPicker } from '@/components/ui/color-picker-input'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { ColorSchema, ColorSchemaType } from '@/schemas/color'
import { zodResolver } from "@hookform/resolvers/zod"
import { CrossCircledIcon, PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FunctionComponent, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import CardWrapper from '../ui/card-wrapper'
import PageTitle from '../ui/page-title'
import { ColorType } from './type'

interface ColorFormProps {
    getID: (id: string) => Promise<ColorType>
}

export const ColorForm: FunctionComponent<ColorFormProps> = function ({ ...props }) {
    const [visible, setVisible] = useState<boolean>(false)
    const [color, setColor] = useState<string>('#0f0f0f');
    const router = useRouter()
    const path = usePathname()

    const onClick = () => {
        setVisible(true)
    }



    const id = useSearchParams().get('id') as string
    const [data, setData] = useState<ColorType>({})
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const form = useForm<ColorSchemaType>({
        resolver: zodResolver(ColorSchema),
        defaultValues: {
            id: "",
            code: "",
            name: "",
            color: ""
        }
    })

    const get = async (id: string) => {
        const obj = await props.getID(id)
        setData(obj)
    }

    useEffect(() => {
        if (id) {
            get(id)
        }
    }, [id])

    useEffect(() => {
        if (data) {
            form.setValue('id', data.id as string)
            form.setValue('code', data.code as string)
            form.setValue('name', data.name as string)
            form.setValue('color', data.color as string)
            setVisible(true)
        }
    }, [data])

    useEffect(() => {
        success !== "" ? toast.success(success) : toast.error(error)
        setError(undefined)
        setSuccess(undefined)
        setVisible(false)
        form.reset()
        router.replace(`${path}`)
        router.refresh()
    }, [success, error])

    const onSubmit = (values: ColorSchemaType) => {
        setError(undefined)
        setSuccess(undefined)
        values.color = color
        values.code = color

        if (id) {
            startTransition(async () => {
                await PutColor(id, values).then((data) => {
                    setSuccess(data.success)
                    setError(data.error)
                })
            })
        } else {
            startTransition(async () => {
                await PostColor(values).then((data) => {
                    setSuccess(data.success)
                    setError(data.error)
                })
            })
        }
    }

    const onCancel = () => {
        form.reset()
        setVisible(false)
        router.replace(`${path}`)
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                    <PageTitle title="Warna" />
                    <ButtonMain
                        className='rounded-full gap-2'
                        variant="destructive"
                        onClick={onClick}
                        disabled={isPending}
                    >
                        <PlusCircledIcon />
                        Tambah
                    </ButtonMain>
                </div>
                <div className='flex flex-row gap-4'>
                    {visible && (
                        <div className="basis-full items-center justify-center">
                            <motion.div
                                animate={{ y: [-50, 5] }}
                                transition={{ type: "spring", stiffness: 100 }}
                            >
                                <CardWrapper
                                    className='w-full shadow-lg'
                                    headerLabel='Buat Data Warna'
                                >
                                    <FormMain {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(onSubmit)}
                                            className='space-y-6'
                                        >
                                            <div className="space-y-4">
                                                {data && (
                                                    <FormField
                                                        control={form.control}
                                                        name="id"
                                                        render={({ field }) => (
                                                            <FormItem
                                                                hidden
                                                            >
                                                                <FormControl>
                                                                    <Input
                                                                        hidden
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                )}
                                                <FormField
                                                    control={form.control}
                                                    name="color"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Warna</FormLabel>
                                                            <FormControl>
                                                                <ColorPicker
                                                                    {...field}
                                                                    onChange={(v) => {
                                                                        setColor(v as string);
                                                                    }}
                                                                    value={color}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="code"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Kode Warna</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    value={color}
                                                                    disabled
                                                                    placeholder="Masukan Kode Warna"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Nama Warna</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Nama Warna"
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
                                                    className='flex items-center justify-end gap-2'
                                                >
                                                    <ButtonMain
                                                        disabled={isPending}
                                                        className="w-full rounded-full gap-2"
                                                        type="submit"
                                                        variant={'default'}
                                                    >
                                                        <PlusIcon />
                                                        Simpan
                                                    </ButtonMain>
                                                    <ButtonMain
                                                        disabled={isPending}
                                                        className="w-full rounded-full gap-2"
                                                        onClick={
                                                            onCancel
                                                        }
                                                        variant={'secondary'}
                                                    >
                                                        <CrossCircledIcon />
                                                        Batal
                                                    </ButtonMain>
                                                </div>
                                            </div>
                                        </form>
                                    </FormMain>
                                </CardWrapper>
                            </motion.div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

