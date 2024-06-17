"use client"

import { PostProductColor, PutProductColor } from '@/actions/product-color'
import { ButtonMain } from '@/components/custom-button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { ProductColorSchema, ProductColorSchemaType } from '@/schemas/product-color'
import { zodResolver } from "@hookform/resolvers/zod"
import { CrossCircledIcon, PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FunctionComponent, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ProductSelect } from '../product/select'
import { ProductType } from '../product/type'
import CardWrapper from '../ui/card-wrapper'
import PageTitle from '../ui/page-title'
import { ProductColorType } from './type'
import { ColorType } from '../color/type'
import { ColorSelect } from '../color/select'

interface ProductColorFormProps {
    dataProduct: Array<ProductType>
    dataColor: Array<ColorType>
    getID: (id: string) => Promise<ProductColorType>
}

export const ProductColorForm: FunctionComponent<ProductColorFormProps> = function ({ ...props }) {
    const [visible, setVisible] = useState<boolean>(false)
    const router = useRouter()
    const path = usePathname()

    const onClick = () => {
        setVisible(true)
    }

    const id = useSearchParams().get('id') as string
    const [data, setData] = useState<ProductColorType>({})
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const form = useForm<ProductColorSchemaType>({
        resolver: zodResolver(ProductColorSchema),
        defaultValues: {
            id: "",
            productId: "",
            colorId: ""
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
            form.setValue('colorId', data.colorId as string)
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

    const onSubmit = (values: ProductColorSchemaType) => {
        setError(undefined)
        setSuccess(undefined)

        if (id) {
            startTransition(async () => {
                await PutProductColor(id, values).then((data) => {
                    setSuccess(data.success)
                    setError(data.error)
                })
            })
        } else {
            startTransition(async () => {
                await PostProductColor(values).then((data) => {
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
                                transition={{ productcolor: "spring", stiffness: 100 }}
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
                                            <div className="flex lg:flex-row max-md:flex-col gap-4">
                                                <div
                                                    className='lg:basis-1/2'
                                                >
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
                                                </div>
                                                <div
                                                    className='lg:basis-1/2'
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name="colorId"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Warna</FormLabel>
                                                                <FormControl>
                                                                    <ColorSelect
                                                                        data={props.dataColor}
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Nama Warna"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
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

