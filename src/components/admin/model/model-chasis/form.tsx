"use client"

import { PostModelChasis, PutModelChasis } from '@/actions/model-chasis'
import { ButtonMain } from '@/components/custom-button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { ModelChasisSchema, ModelChasisSchemaType } from '@/schemas/model-chasis'
import { zodResolver } from "@hookform/resolvers/zod"
import { CrossCircledIcon, PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FunctionComponent, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ProductModelSelect } from '../../product/product-model/select'
import { ProductModelType } from '../../product/product-model/type'
import CardWrapper from '../../ui/card-wrapper'
import PageTitle from '../../ui/page-title'
import { ModelChasisType } from './type'
import { formVariants } from '@/utils/animate'

interface ModelChasisFormProps {
    dataProductModel: Array<ProductModelType>
    getID: (id: string) => Promise<ModelChasisType>
}

export const ModelChasisForm: FunctionComponent<ModelChasisFormProps> = function ({ ...props }) {
    const [visible, setVisible] = useState<boolean>(false)
    const router = useRouter()
    const path = usePathname()

    const onClick = () => {
        setVisible(true)
    }

    const id = useSearchParams().get('id') as string
    const [data, setData] = useState<ModelChasisType>({})
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const form = useForm<ModelChasisSchemaType>({
        resolver: zodResolver(ModelChasisSchema),
        defaultValues: {
            id: "",
            productModelId: "",
            transmitionType: "",
            frontSuspension: "",
            rearSuspension: "",
            frontBrake: "",
            rearBrake: "",
            parkingBrake: "",
            brakingSystem: "",
            tireSize: "",
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
    }, [id])

    useEffect(() => {
        if (data) {
            form.setValue('id', data.id as string)
            form.setValue('productModelId', data.productModelId as string)
            form.setValue('transmitionType', data.transmitionType as string)
            form.setValue('frontSuspension', data.frontSuspension as string)
            form.setValue('rearSuspension', data.rearSuspension as string)
            form.setValue('frontBrake', data.frontBrake as string)
            form.setValue('rearBrake', data.rearBrake as string)
            form.setValue('parkingBrake', data.parkingBrake as string)
            form.setValue('brakingSystem', data.brakingSystem as string)
            form.setValue('tireSize', data.tireSize as string)
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

    const onSubmit = (values: ModelChasisSchemaType) => {
        setError(undefined)
        setSuccess(undefined)

        if (id) {
            startTransition(async () => {
                await PutModelChasis(id, values).then((data) => {
                    setSuccess(data.success)
                    setError(data.error)
                })
            })
        } else {
            startTransition(async () => {
                await PostModelChasis(values).then((data) => {
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
                    <PageTitle title="Model Rangka" />
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
                                    headerLabel='Buat Data Model Rangka'
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
                                                        name="transmitionType"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Jenis Transmisi</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Jenis Transmisi"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="frontSuspension"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Suspensi Depan</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Suspensi Depan"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="rearSuspension"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Suspensi Belakang</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Suspensi Belakang"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="tireSize"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Ukuran Ban</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Ukuran Ban"
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
                                                        name="frontBrake"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Rem Depan</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Rem Depan"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="rearBrake"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Rem Belakang</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Rem Belakang"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="parkingBrake"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Rem Parking</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Rem Parking"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="brakingSystem"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Sistem Rem</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Sistem Rem"
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

