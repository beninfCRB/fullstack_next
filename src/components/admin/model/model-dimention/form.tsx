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
import { FuelSelect } from '../../master/fuel/select'
import { FuelType } from '../../master/fuel/type'
import { ProductModelSelect } from '../../product/product-model/select'
import { ProductModelType } from '../../product/product-model/type'
import CardWrapper from '../../ui/card-wrapper'
import PageTitle from '../../ui/page-title'
import { ModelDimentionType } from './type'
import { formVariants } from '@/utils/animate'

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
            form.setValue('length', Number(data.length) as number)
            form.setValue('width', Number(data.width) as number)
            form.setValue('height', Number(data.height) as number)
            form.setValue('wheelBase', Number(data.wheelBase) as number)
            form.setValue('frontThread', Number(data.frontThread) as number)
            form.setValue('rearThread', Number(data.rearThread) as number)
            form.setValue('groundClearance', Number(data.groundClearance) as number)
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

    const onSubmit = (values: ModelDimentionSchemaType) => {
        setError(undefined)
        setSuccess(undefined)
        console.log('id====>', id);


        if (id) {
            console.log('masuk update');

            startTransition(async () => {
                await PutModelDimention(id, values).then((data) => {
                    setSuccess(data.success)
                    setError(data.error)
                })
            })
        } else {
            console.log('masuk add');
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
                                initial="offscreen"
                                whileInView={"onscreen"}
                                variants={formVariants}
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
                                                                    <div className="relative w-full">
                                                                        <Input
                                                                            {...field}
                                                                            className='pr-9'
                                                                            disabled={isPending}
                                                                            placeholder="Masukan Panjang"
                                                                            type='number'
                                                                            onChange={e => field.onChange(Number(e.target.value))}
                                                                        />
                                                                        <div className='flex absolute items-center right-4 top-0 m-2.5 h-4 w-4 text-muted-foreground'>MM</div>
                                                                    </div>
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
                                                                    <div className="relative w-full">
                                                                        <Input
                                                                            disabled={isPending}
                                                                            placeholder="Masukan Lebar"
                                                                            type='number'
                                                                            {...field}
                                                                            onChange={e => field.onChange(Number(e.target.value))}
                                                                        />
                                                                        <div className='flex absolute items-center right-4 top-0 m-2.5 h-4 w-4 text-muted-foreground'>MM</div>
                                                                    </div>
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
                                                                    <div className="relative w-full">
                                                                        <Input
                                                                            disabled={isPending}
                                                                            placeholder="Masukan Tinggi"
                                                                            type='number'
                                                                            {...field}
                                                                            onChange={e => field.onChange(Number(e.target.value))}
                                                                        />
                                                                        <div className='flex absolute items-center right-4 top-0 m-2.5 h-4 w-4 text-muted-foreground'>MM</div>
                                                                    </div>
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
                                                        name="wheelBase"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Jarak Sumbu Roda</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative w-full">
                                                                        <Input
                                                                            disabled={isPending}
                                                                            placeholder="Masukan Jarak Sumbu Roda"
                                                                            type='number'
                                                                            {...field}
                                                                            onChange={e => field.onChange(Number(e.target.value))}
                                                                        />
                                                                        <div className='flex absolute items-center right-4 top-0 m-2.5 h-4 w-4 text-muted-foreground'>MM</div>
                                                                    </div>
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
                                                                    <div className="relative w-full">
                                                                        <Input
                                                                            disabled={isPending}
                                                                            placeholder="Masukan Jarak Pijak Depan"
                                                                            type='number'
                                                                            {...field}
                                                                            onChange={e => field.onChange(Number(e.target.value))}
                                                                        />
                                                                        <div className='flex absolute items-center right-4 top-0 m-2.5 h-4 w-4 text-muted-foreground'>MM</div>
                                                                    </div>
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
                                                                    <div className="relative w-full">
                                                                        <Input
                                                                            disabled={isPending}
                                                                            placeholder="Masukan Jarak Pijak Belakang"
                                                                            type='number'
                                                                            {...field}
                                                                            onChange={e => field.onChange(Number(e.target.value))}
                                                                        />
                                                                        <div className='flex absolute items-center right-4 top-0 m-2.5 h-4 w-4 text-muted-foreground'>MM</div>
                                                                    </div>
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
                                                                    <div className="relative w-full">
                                                                        <Input
                                                                            disabled={isPending}
                                                                            placeholder="Masukan Jarak Terendah"
                                                                            type='number'
                                                                            {...field}
                                                                            onChange={e => field.onChange(Number(e.target.value))}
                                                                        />
                                                                        <div className='flex absolute items-center right-4 top-0 m-2.5 h-4 w-4 text-muted-foreground'>MM</div>
                                                                    </div>
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

