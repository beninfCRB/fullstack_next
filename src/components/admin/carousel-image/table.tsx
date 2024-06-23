"use client"

import { ButtonMain } from '@/components/custom-button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { CheckIcon, Cross2Icon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { motion } from 'framer-motion'
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FunctionComponent, startTransition, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { DataTable } from '../ui/data-table'
import { CarouselImageType } from './type'
import { tableVariants } from '@/utils/animate'


interface CarouselImageTable {
    data: Array<CarouselImageType> | []
    onDelete: (id: string) => Promise<any>
}

export const CarouselImageTable: FunctionComponent<CarouselImageTable> = function ({ ...props }) {
    const [id, setId] = useState<string | undefined>(undefined)
    const router = useRouter()

    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)

    const onUpdate = (id: string) => {
        const params = new URLSearchParams()
        params.set('id', id)

        router.push(`?${params.toString()}`)
    }

    const onDelete = (id: string) => {
        startTransition(() => {
            props.onDelete(id).then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
        })
    }

    useEffect(() => {
        success !== "" ? toast.success(success) : toast.error(error)
        setError(undefined)
        setSuccess(undefined)
        router.refresh()
    }, [success, error, router])

    const columns: ColumnDef<CarouselImageType>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nama Carousel
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            }
        },
        {
            accessorKey: "path",
            header: "Gambar",
            cell: ({ row }) => {
                const product_image = row.original

                return (
                    <Image
                        className='rounded-lg border-2 border-red-500 size-auto'
                        src={product_image?.path as string}
                        about={`${product_image.name}`}
                        alt=''
                        width={150}
                        height={150}
                        priority={false}
                    />
                )
            }
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const carouselimage = row.original

                return (
                    <div
                        className='flex items-center justify-end gap-2'
                    >
                        <ButtonMain
                            className="w-full rounded-full"
                            onClick={() => onUpdate(carouselimage.id as string)}
                            variant={'default'}
                        >
                            <Pencil2Icon />
                        </ButtonMain>
                        <AlertDialogTrigger>
                            <ButtonMain
                                className="w-full rounded-full"
                                onClick={() => setId(carouselimage.id as string)}
                                variant={'secondary'}
                            >
                                <TrashIcon />
                            </ButtonMain>
                        </AlertDialogTrigger>
                    </div>
                )
            },
        },
    ]

    return (
        <div className='w-full shadow-xl'>
            <motion.div
                initial="offscreen"
                whileInView={"onscreen"}
                variants={tableVariants}
            >
                <AlertDialog>
                    <DataTable
                        columns={columns}
                        data={props.data}
                    />
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete</AlertDialogTitle>
                            <AlertDialogDescription>
                                Apakah yakin ingin menghapus data ini?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                className='gap-2 rounded-full'
                            >
                                <Cross2Icon />
                                Batal
                            </AlertDialogCancel>
                            <AlertDialogAction
                                className='gap-2 rounded-full'
                                onClick={() => onDelete(id as string)}
                            >
                                <CheckIcon />
                                Lanjutkan
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </motion.div>
        </div>
    )
}

