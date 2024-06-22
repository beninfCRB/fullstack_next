"use client"

import { ButtonMain } from '@/components/custom-button'
import { CheckIcon, Cross2Icon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { FunctionComponent, startTransition, useEffect, useState } from 'react'
import { DataTable } from '../ui/data-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { motion } from 'framer-motion'
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
import { toast } from 'react-toastify'
import { ModelDimentionType } from './type'


interface ModelDimentionTable {
    data: Array<ModelDimentionType> | []
    onDelete: (id: string) => Promise<any>
}

export const ModelDimentionTable: FunctionComponent<ModelDimentionTable> = function ({ ...props }) {
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

    const columns: ColumnDef<ModelDimentionType>[] = [
        {
            accessorKey: "product_model.product.name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Produk
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            }
        },
        {
            accessorKey: "product_model.type.name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Tipe
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            }
        },
        {
            accessorKey: "product_model.transmition.name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Transmisi
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            }
        },
        {
            accessorKey: "length",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Panjang
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const model_dimention = row.original

                return (
                    <>
                        {`
                            ${model_dimention.length} MM
                        `}
                    </>
                )
            },
        },
        {
            accessorKey: "width",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Lebar
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const model_dimention = row.original

                return (
                    <>
                        {`
                            ${model_dimention.width} MM
                        `}
                    </>
                )
            },
        },
        {
            accessorKey: "height",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Tinggi
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const model_dimention = row.original

                return (
                    <>
                        {`
                            ${model_dimention.height} MM
                        `}
                    </>
                )
            },
        },
        {
            accessorKey: "wheelBase",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Jarak Sumbu Roda
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const model_dimention = row.original

                return (
                    <>
                        {`
                            ${model_dimention.wheelBase} MM
                        `}
                    </>
                )
            },
        },
        {
            accessorKey: "frontThread",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Jarak Pijak Depan
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const model_dimention = row.original

                return (
                    <>
                        {`
                            ${model_dimention.frontThread} MM
                        `}
                    </>
                )
            },
        },
        {
            accessorKey: "rearThread",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Jarak Pijak Belakang
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const model_dimention = row.original

                return (
                    <>
                        {`
                            ${model_dimention.rearThread} MM
                        `}
                    </>
                )
            },
        },
        {
            accessorKey: "groundClearance",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Jarak Terendah
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            }
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const modeldimention = row.original

                return (
                    <div
                        className='flex items-center justify-end gap-2'
                    >
                        <ButtonMain
                            className="w-full rounded-full"
                            onClick={() => onUpdate(modeldimention.id as string)}
                            variant={'default'}
                        >
                            <Pencil2Icon />
                        </ButtonMain>
                        <AlertDialogTrigger>
                            <ButtonMain
                                className="w-full rounded-full"
                                onClick={() => setId(modeldimention.id as string)}
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
        <div className='max-w-min shadow-xl '>
            <motion.div
                animate={{ y: [-10, 0] }}
                transition={{ modeldimention: "spring", stiffness: 100 }}
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

