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
import { formattedPrice } from '@/utils/format-price'
import { CheckIcon, Cross2Icon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { motion } from 'framer-motion'
import { ArrowUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FunctionComponent, startTransition, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { DataTable } from '../ui/data-table'
import { PriceType } from './type'


interface PriceTable {
    data: Array<PriceType> | []
    onDelete: (id: string) => Promise<any>
}

export const PriceTable: FunctionComponent<PriceTable> = function ({ ...props }) {
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
    }, [success, error])

    const columns: ColumnDef<PriceType>[] = [
        {
            accessorKey: "product.name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nama Produk
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            }
        },
        {
            accessorKey: "price",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Harga
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const price = row.original

                return (
                    <>
                        {
                            formattedPrice(Number(price.price))
                        }
                    </>
                )
            },
        },
        {
            accessorKey: "dp",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        DP
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const price = row.original

                return (
                    <>
                        {
                            formattedPrice(Number(price.dp))
                        }
                    </>
                )
            },
        },
        {
            accessorKey: "credit",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Kredit
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const price = row.original

                return (
                    <>
                        {
                            price.credit ? 'YA' : 'TIDAK'
                        }
                    </>
                )
            },
        },
        {
            accessorKey: "tenor",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Tenor
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const price = row.original

                return (
                    <>
                        {`
                            ${price.tenor} Bulan
                        `}
                    </>
                )
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const price = row.original

                return (
                    <div
                        className='flex items-center justify-end gap-2'
                    >
                        <ButtonMain
                            className="w-full rounded-full"
                            onClick={() => onUpdate(price.id as string)}
                            variant={'default'}
                        >
                            <Pencil2Icon />
                        </ButtonMain>
                        <AlertDialogTrigger>
                            <ButtonMain
                                className="w-full rounded-full"
                                onClick={() => setId(price.id as string)}
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
                animate={{ y: [-10, 0] }}
                transition={{ price: "spring", stiffness: 100 }}
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

