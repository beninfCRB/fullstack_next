"use client"

import { PostCarouselImage, PutCarouselImage } from '@/actions/carousel-image'
import { ButtonMain } from '@/components/custom-button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { FormControl, FormField, FormItem, FormLabel, FormMain, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { CarouselImageSchema, CarouselImageSchemaType } from '@/schemas/carousel-image'
import { zodResolver } from "@hookform/resolvers/zod"
import { CrossCircledIcon, PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FunctionComponent, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import imageDefault from '../../../../public/image/image.png'
import CardWrapper from '../ui/card-wrapper'
import PageTitle from '../ui/page-title'
import { CarouselImageType } from './type'

interface CarouselImageFormProps {
    getID: (id: string) => Promise<CarouselImageType>
}

export const CarouselImageForm: FunctionComponent<CarouselImageFormProps> = function ({ ...props }) {
    const [visible, setVisible] = useState<boolean>(false)
    const router = useRouter()
    const path = usePathname()

    const onClick = () => {
        setVisible(true)
    }

    const id = useSearchParams().get('id') as string
    const [data, setData] = useState<CarouselImageType>({})
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const form = useForm<CarouselImageSchemaType>({
        resolver: zodResolver(CarouselImageSchema),
        defaultValues: {
            id: "",
            name: "",
            image: new File([], '')
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
            form.setValue('name', data.name as string)
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

    const onSubmit = (values: CarouselImageSchemaType) => {
        setError(undefined)
        setSuccess(undefined)

        let formData = new FormData();
        formData.append('name', values.name);
        formData.append('image', values?.image as File);

        if (id) {
            startTransition(async () => {
                await PutCarouselImage(id, formData).then((data) => {
                    setSuccess(data.success)
                    setError(data.error)
                })
            })
        } else {
            startTransition(async () => {
                await PostCarouselImage(formData).then((data) => {
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
                    <PageTitle title="Gambar Carousel" />
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
                                    headerLabel='Buat Data Gambar Carousel'
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
                                                        src={data.path ? data?.path as string : imageDefault}
                                                        about={`${data.name}`}
                                                        alt=''
                                                        width={100}
                                                        height={100}
                                                        priority={false}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Nama Carousel</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Gambar Carousel"
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
                                                                <FormLabel>Gambar Carousel</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        type='file'
                                                                        disabled={isPending}
                                                                        placeholder="Masukan Gambar Carousel"
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

