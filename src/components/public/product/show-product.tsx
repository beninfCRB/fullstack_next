"use client"

import { ButtonMain } from '@/components/custom-button'
import { FormControl, FormField, FormItem, FormLabel, FormMain } from '@/components/ui/form'
import MoneyInput from '@/components/ui/money-input'
import { FilterProductModelSchema, FilterProductModelSchemaType } from '@/schemas/filter-product-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { ModelSelect } from '../../admin/master/model/select'
import { ModelType } from '../../admin/master/model/type'
import { TransmitionSelect } from '../../admin/master/transmition/select'
import { TransmitionType } from '../../admin/master/transmition/type'
import { ProductType } from '../../admin/product/product-main/type'
import { ProductModelType } from '../../admin/product/product-model/type'
import { AllProduct } from './all-product'

interface ProductModelResponse {
    data: Array<ProductModelType>
    count: number
}
interface FilterProductProps {
    model: Array<ModelType> | []
    transmition: Array<TransmitionType> | []
    dataFunc: (v: any) => Promise<ProductModelResponse | null>
}


export const FilterProduct: FunctionComponent<FilterProductProps> = function ({ ...props }) {
    const tot = 10
    const [filter, setFilter] = useState<boolean>(true)
    const [data, setData] = useState<ProductModelResponse | null>(null)
    const [skip, setSkip] = useState<number>(1)
    const [take, setTake] = useState<number>(tot)
    const [isPending, startTransition] = useTransition()

    const form = useForm<FilterProductModelSchemaType>({
        resolver: zodResolver(FilterProductModelSchema),
        defaultValues: {
            modelId: "",
            transmitionId: "",
            priceStart: Number(""),
            priceEnd: Number("")
        }
    })
    const router = useRouter()


    const onFetch = (value?: any) => {
        startTransition(() => {
            value.skip = Number(skip)
            value.take = Number(take)

            if (value) {
                props.dataFunc(value).then((v) => {
                    setData(v)
                })
            } else {
                props.dataFunc({}).then((v) => {
                    setData(v)
                })
            }
        })
    }

    const onCancel = async () => {
        form.reset()
        await onFetch({ skip, take })
    }

    const nextTake = () => {
        setSkip(skip + 1)
        setTake(take + tot)
    }

    useEffect(() => {
        onFetch({ skip, take })
    }, [])

    // useEffect(() => {
    //     const { modelId, transmitionId, priceEnd, priceStart } = form.getValues()
    //     if (modelId || transmitionId || priceEnd || priceStart) {
    //         setFilter(true)
    //     } else {
    //         setFilter(false)
    //     }
    // }, [startTransition])

    return (
        <div
            className='flex xl:flex-row flex-col w-full p-8 gap-4'
        >
            <div>
                <div className='flex flex-col gap-2'>
                    <FormMain {...form}>
                        <form
                            onSubmit={form.handleSubmit(onFetch)}
                            className='space-y-6'
                        >
                            <FormField
                                control={form.control}
                                name="modelId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model</FormLabel>
                                        <FormControl>
                                            <ModelSelect
                                                placeholder='Pilih Model'
                                                data={props.model}
                                                {...field}
                                            />
                                        </FormControl>
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
                                                placeholder='Pilih Transmisi'
                                                data={props.transmition}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <MoneyInput
                                form={form}
                                label="Harga Minimal"
                                name="priceStart"
                                placeholder="Harga Minimal"
                            />
                            <MoneyInput
                                form={form}
                                label="Harga Maksimal"
                                name="priceEnd"
                                placeholder="Harga Maksimal"
                            />
                            <div
                                className='flex items-center justify-center gap-2'
                            >
                                <ButtonMain
                                    disabled={isPending}
                                    className="w-full rounded-full gap-2"
                                    type="submit"
                                    variant={'default'}
                                >
                                    Filter
                                </ButtonMain>
                                <ButtonMain
                                    disabled={isPending}
                                    className="w-full rounded-full gap-2"
                                    onClick={
                                        onCancel
                                    }
                                    variant={'secondary'}
                                >
                                    Hapus Filter
                                </ButtonMain>
                            </div>
                        </form>
                    </FormMain>
                </div>
            </div>
            <div>
                <AllProduct
                    data={data?.data || []}
                    next={nextTake}
                    count={data?.count}
                />
            </div>
        </div>
    )
}
