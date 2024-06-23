"use client"

import { PostPrice, PutPrice } from '@/actions/price'
import { ButtonMain } from '@/components/custom-button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import MoneyInput from '@/components/ui/money-input'
import { PriceSchema, PriceSchemaType } from '@/schemas/price'
import { zodResolver } from "@hookform/resolvers/zod"
import { CrossCircledIcon, PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FunctionComponent, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ProductModelSelect } from '../product-model/select'
import { ProductModelType } from '../product-model/type'
import CardWrapper from '../ui/card-wrapper'
import PageTitle from '../ui/page-title'
import { PriceType } from './type'

interface PriceFormProps {
    dataProductModel: Array<ProductModelType>
    getID: (id: string) => Promise<PriceType>
}

export const PriceForm: FunctionComponent<PriceFormProps> = function ({ ...props }) {
    const [visible, setVisible] = useState<boolean>(false)
    const router = useRouter()
    const path = usePathname()

    const onClick = () => {
        setVisible(true)
    }

    const id = useSearchParams().get('id') as string
    const [data, setData] = useState<PriceType>({})
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const form = useForm<PriceSchemaType>({
        resolver: zodResolver(PriceSchema),
        defaultValues: {
            id: "",
            productModelId: "",
            credit: false,
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const obj = await props.getID(id);
                setData(obj)
            }
        };
        fetchData()
    }, [id, props])

    useEffect(() => {
        if (data) {

            form.setValue('id', data.id as string)
            form.setValue('productModelId', data.productModelId as string)
            form.setValue('price', Number(data.price))
            form.setValue('credit', Boolean(data.credit))
            form.setValue('tenor', Number(data.tenor))
            form.setValue('dp', Number(data.dp))
            setVisible(true)
        }
    }, [data, form])

    useEffect(() => {
        success !== "" ? toast.success(success) : toast.error(error)
        setError(undefined)
        setSuccess(undefined)
        setVisible(false)
        form.reset()
        router.replace(`${path}`)
        router.refresh()
    }, [success, error, form, path, router])

    const onSubmit = (values: PriceSchemaType) => {
        setError(undefined)
        setSuccess(undefined)

        if (id) {
            startTransition(async () => {
                await PutPrice(id, values).then((data) => {
                    setSuccess(data.success)
                    setError(data.error)
                })
            })
        } else {
            startTransition(async () => {
                await PostPrice(values).then((data) => {
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
                    <PageTitle title="Harga Produk" />
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
                                    headerLabel='Buat Data Harga Produk'
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
                                                        name="productModelId"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Produk Model</FormLabel>
                                                                <FormControl>
                                                                    <ProductModelSelect
                                                                        data={props.dataProductModel}
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Nama Produk Model"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <MoneyInput
                                                        form={form}
                                                        label="Harga"
                                                        name="price"
                                                        placeholder="Masukan Harga"
                                                    />
                                                    <MoneyInput
                                                        form={form}
                                                        label="DP"
                                                        name="dp"
                                                        placeholder="Masukkan DP"
                                                    />
                                                </div>
                                                <div
                                                    className='lg:basis-1/2'
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name="tenor"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Tenor</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative w-full">
                                                                        <div className='flex absolute items-center right-8 top-0 m-2.5 h-4 w-4 text-muted-foreground'>Bulan</div>
                                                                        <Input
                                                                            disabled={isPending}
                                                                            placeholder="Masukan Tenor"
                                                                            type='number'
                                                                            {...field}
                                                                            onChange={e => field.onChange(Number(e.target.value))}
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="credit"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Kredit</FormLabel>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormControl>
                                                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                    </FormControl>
                                                                    <FormLabel className="text-md cursor-pointer select-none ml-2">{field.value ? 'Ya' : 'Tidak'}</FormLabel>
                                                                </div>
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

