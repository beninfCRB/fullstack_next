"use client"

import { PostProductModel, PutProductModel } from '@/actions/product-model'
import { ButtonMain } from '@/components/custom-button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { ProductModelSchema, ProductModelSchemaType } from '@/schemas/product-model'
import { zodResolver } from "@hookform/resolvers/zod"
import { CrossCircledIcon, PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FunctionComponent, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ProductSelect } from '../product/select'
import { ProductType } from '../product/type'
import { TransmitionSelect } from '../transmition/select'
import { TransmitionType } from '../transmition/type'
import { TypeSelect } from '../type/select'
import { TypeType } from '../type/type'
import CardWrapper from '../ui/card-wrapper'
import PageTitle from '../ui/page-title'
import { ProductModelType } from './type'

interface ProductModelFormProps {
    dataProduct: Array<ProductType>
    dataType: Array<TypeType>
    dataTransmition: Array<TransmitionType>
    getID: (id: string) => Promise<ProductModelType>
}

export const ProductModelForm: FunctionComponent<ProductModelFormProps> = function ({ ...props }) {
    const [visible, setVisible] = useState<boolean>(false)
    const router = useRouter()
    const path = usePathname()

    const onClick = () => {
        setVisible(true)
    }

    const id = useSearchParams().get('id') as string
    const [data, setData] = useState<ProductModelType>({})
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const form = useForm<ProductModelSchemaType>({
        resolver: zodResolver(ProductModelSchema),
        defaultValues: {
            id: "",
            productId: "",
            typeId: "",
            transmitionId: ""
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
            form.setValue('productId', data.productId as string)
            form.setValue('typeId', data.typeId as string)
            form.setValue('transmitionId', data.transmitionId as string)
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

    const onSubmit = (values: ProductModelSchemaType) => {
        setError(undefined)
        setSuccess(undefined)

        if (id) {
            startTransition(async () => {
                await PutProductModel(id, values).then((data) => {
                    setSuccess(data.success)
                    setError(data.error)
                })
            })
        } else {
            startTransition(async () => {
                await PostProductModel(values).then((data) => {
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
                    <PageTitle title="Warna Produk" />
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
                                transition={{ productmodel: "spring", stiffness: 100 }}
                            >
                                <CardWrapper
                                    className='w-full shadow-lg'
                                    headerLabel='Buat Data Warna Produk'
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
                                                    name="productId"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Produk</FormLabel>
                                                            <FormControl>
                                                                <ProductSelect
                                                                    data={props.dataProduct}
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Nama Produk"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="typeId"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Tipe</FormLabel>
                                                            <FormControl>
                                                                <TypeSelect
                                                                    data={props.dataType}
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Nama Tipe"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="transmitionId"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Transmisi</FormLabel>
                                                            <FormControl>
                                                                <TransmitionSelect
                                                                    data={props.dataTransmition}
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Nama Transmisi"
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

