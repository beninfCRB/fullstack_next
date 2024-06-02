"use client"

import { PostModelMachine, PutModelMachine } from '@/actions/model-machine'
import { ButtonMain } from '@/components/custom-button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { ModelMachineSchema, ModelMachineSchemaType } from '@/schemas/model-machine'
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
import { ModelMachineType } from './type'
import { Decimal } from '@prisma/client/runtime/library'

interface ModelMachineFormProps {
    dataProductModel: Array<ProductModelType>
    dataFuel: Array<FuelType>
    getID: (id: string) => Promise<ModelMachineType>
}

export const ModelMachineForm: FunctionComponent<ModelMachineFormProps> = function ({ ...props }) {
    const [visible, setVisible] = useState<boolean>(false)
    const router = useRouter()
    const path = usePathname()

    const onClick = () => {
        setVisible(true)
    }

    const id = useSearchParams().get('id') as string
    const [data, setData] = useState<ModelMachineType>({})
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const form = useForm<ModelMachineSchemaType>({
        resolver: zodResolver(ModelMachineSchema),
        defaultValues: {
            id: "",
            productModelId: "",
            machineSerial: "",
            engineType: "",
            boreStroke: "",
            maxOutput: "",
            maxTorq: "",
            fuelId: ""
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
            form.setValue('machineSerial', data.machineSerial as string)
            form.setValue('engineType', data.engineType as string)
            form.setValue('cylinder', Number(data.cylinder) as number)
            form.setValue('maxOutput', data.maxOutput as string)
            form.setValue('maxTorq', data.maxTorq as string)
            form.setValue('fuelId', data.fuelId as string)
            form.setValue('fuelCapacity', Number(data.fuelCapacity) as number)
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

    const onSubmit = (values: ModelMachineSchemaType) => {
        setError(undefined)
        setSuccess(undefined)

        if (id) {
            startTransition(async () => {
                await PutModelMachine(id, values).then((data) => {
                    setSuccess(data.success)
                    setError(data.error)
                })
            })
        } else {
            startTransition(async () => {
                await PostModelMachine(values).then((data) => {
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
                    <PageTitle title="Model Mesin" />
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
                                transition={{ modelmachine: "spring", stiffness: 100 }}
                            >
                                <CardWrapper
                                    className='w-full shadow-lg'
                                    headerLabel='Buat Data Model Mesin'
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
                                                    name="machineSerial"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Nomor Serial Mesin</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Nama Serial Mesin"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="engineType"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Tipe Mesin</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Tipe Mesin"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="cylinder"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Silinder</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Silinder"
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
                                                    name="maxOutput"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Tenaga Maksimum</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Tenaga Maksimum"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="maxTorq"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Silinder</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Tenaga Maksimum"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="fuelId"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Bahan Bakar</FormLabel>
                                                            <FormControl>
                                                                <FuelSelect
                                                                    data={props.dataFuel}
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Nama Bahan Bakar"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="fuelCapacity"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Kapasitas Bahan Bakar</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={isPending}
                                                                    placeholder="Masukan Kapasitas Bahan Bakar"
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

