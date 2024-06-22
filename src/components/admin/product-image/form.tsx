"use client"

import { PostProductImage, PutProductImage } from '@/actions/product-image'
import { ButtonMain } from '@/components/custom-button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { ProductImageSchema, ProductImageSchemaType } from '@/schemas/product-image'
import { zodResolver } from "@hookform/resolvers/zod"
import { CrossCircledIcon, PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FunctionComponent, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ProductColorSelect } from '../product-color/select'
import { ProductColorType } from '../product-color/type'
import CardWrapper from '../ui/card-wrapper'
import PageTitle from '../ui/page-title'
import { ProductImageType } from './type'
import imageDefaultPng from '../../../../public/image/image.png'

interface ProductImageFormProps {
    dataProductColor: Array<ProductColorType>
    getID: (id: string) => Promise<ProductImageType>
}

export const ProductImageForm: FunctionComponent<ProductImageFormProps> = function ({ ...props }) {
    const [visible, setVisible] = useState<boolean>(false)
    const router = useRouter()
    const path = usePathname()

    const onClick = () => {
        setVisible(true)
    }

    const id = useSearchParams().get('id') as string
    const [data, setData] = useState<ProductImageType>({})
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const form = useForm<ProductImageSchemaType>({
        resolver: zodResolver(ProductImageSchema),
        defaultValues: {
            id: "",
            productColorId: "",
            image: new File([], '')
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const obj = await props.getID(id);
                setData(obj);
            }
        };
        fetchData();
    }, [id, props])

    useEffect(() => {
        if (data) {
            form.setValue('id', data.id as string)
            form.setValue('productColorId', data.productColorId as string)
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

    const onSubmit = (values: ProductImageSchemaType) => {
        setError(undefined)
        setSuccess(undefined)

        let formData = new FormData();
        formData.append('productColorId', values.productColorId);
        formData.append('image', values?.image as File);

        if (id) {
            startTransition(async () => {
                await PutProductImage(id, formData).then((data) => {
                    setSuccess(data.success)
                    setError(data.error)
                })
            })
        } else {
            startTransition(async () => {
                await PostProductImage(formData).then((data) => {
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
        setData({})
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                    <PageTitle title="Gambar Produk" />
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
                                transition={{ productimage: "spring", stiffness: 100 }}
                            >
                                <CardWrapper
                                    className='w-full shadow-lg'
                                    headerLabel='Buat Data Gambar Produk'
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
                                                    <Image
                                                        className='rounded-lg border-2 border-red-500 shadow-xl size-auto'
                                                        src={data.path ? data?.path as string : imageDefaultPng}
                                                        about={`${data.product_color?.product} ${data.product_color?.product?.name}`}
                                                        alt=''
                                                        width={100}
                                                        height={100}
                                                        priority={false}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="productColorId"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Warna Produk</FormLabel>
                                                                <FormControl>
                                                                    <ProductColorSelect
                                                                        {...field}
                                                                        data={props.dataProductColor}
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Warna Produk"
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
                                                        name="image"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Gambar Produk</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        type='file'
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Gambar Produk"
                                                                        accept="image/jpeg, image/png"
                                                                        onChange={(event) =>
                                                                            field.onChange(event.target.files && event.target.files[0])
                                                                        }
                                                                        value={undefined}
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

