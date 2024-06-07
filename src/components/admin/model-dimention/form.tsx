"use client"

import { PostModelDimention, PutModelDimention } from '@/actions/model-dimention'
import { ButtonMain } from '@/components/custom-button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { ModelDimentionSchema, ModelDimentionSchemaType } from '@/schemas/model-dimention'
import { zodResolver } from "@hookform/resolvers/zod"
import { CrossCircledIcon, PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FunctionComponent, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FuelSelect } from '../fuel/select'
import { FuelType } from '../fuel/type'
import { ProductModelSelect } from '../product-model/select'
import { ProductModelType } from '../product-model/type'
import CardWrapper from '../ui/card-wrapper'
import PageTitle from '../ui/page-title'
import { ModelDimentionType } from './type'

interface ModelDimentionFormProps {
    dataProductModel: Array<ProductModelType>
    dataFuel: Array<FuelType>
    getID: (id: string) => Promise<ModelDimentionType>
}

export const ModelDimentionForm: FunctionComponent<ModelDimentionFormProps> = function ({ ...props }) {
    const [visible, setVisible] = useState<boolean>(false)
    const router = useRouter()
    const path = usePathname()

    const onClick = () => {
        setVisible(true)
    }

    const id = useSearchParams().get('id') as string
    const [data, setData] = useState<ModelDimentionType>({})
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const form = useForm<ModelDimentionSchemaType>({
        resolver: zodResolver(ModelDimentionSchema),
        defaultValues: {
            id: "",
            productModelId: ""
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
            form.setValue('productModelId', data.productModelId as string)
            form.setValue('length', Number(data.length) as number)
            form.setValue('width', Number(data.width) as number)
            form.setValue('height', Number(data.height) as number)
            form.setValue('wheelBase', Number(data.wheelBase) as number)
            form.setValue('frontThread', Number(data.frontThread) as number)
            form.setValue('rearThread', Number(data.rearThread) as number)
            form.setValue('groundClearance', Number(data.groundClearance) as number)
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

    const onSubmit = (values: ModelDimentionSchemaType) => {
        setError(undefined)
        setSuccess(undefined)

        if (id) {
            startTransition(async () => {
                await PutModelDimention(id, values).then((data) => {
                    setSuccess(data.success)
                    setError(data.error)
                })
            })
        } else {
            startTransition(async () => {
                await PostModelDimention(values).then((data) => {
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
                    <PageTitle title="Model Dimensi" />
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
                                transition={{ modeldimention: "spring", stiffness: 100 }}
                            >
                                <CardWrapper
                                    className='w-full shadow-lg'
                                    headerLabel='Buat Data Model Dimensi'
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
                                                    name="productModelId"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Model Produk</FormLabel>
                                                            <FormControl>
                                                                <ProductModelSelect
                                                                    data={props.dataProductModel}
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Nama Model Produk"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="length"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Panjang</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Panjang"
                                                                    type='number'
                                                                    {...field}
                                                                    onChange={e => field.onChange(Number(e.target.value))}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="width"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Lebar</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Lebar"
                                                                    type='number'
                                                                    {...field}
                                                                    onChange={e => field.onChange(Number(e.target.value))}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="height"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Tinggi</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Tinggi"
                                                                    type='number'
                                                                    {...field}
                                                                    onChange={e => field.onChange(Number(e.target.value))}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="wheelBase"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Jarak Sumbu Roda</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Jarak Sumbu Roda"
                                                                    type='number'
                                                                    {...field}
                                                                    onChange={e => field.onChange(Number(e.target.value))}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="frontThread"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Jarak Pijak Depan</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Jarak Pijak Depan"
                                                                    type='number'
                                                                    {...field}
                                                                    onChange={e => field.onChange(Number(e.target.value))}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="rearThread"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Jarak Pijak Belakang</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Jarak Pijak Belakang"
                                                                    type='number'
                                                                    {...field}
                                                                    onChange={e => field.onChange(Number(e.target.value))}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="groundClearance"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Jarak Terendah</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Jarak Terendah"
                                                                    type='number'
                                                                    {...field}
                                                                    onChange={e => field.onChange(Number(e.target.value))}
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

