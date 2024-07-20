"use client"

import React, { FunctionComponent } from 'react'
import { ModelType } from './type'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ControllerRenderProps } from 'react-hook-form'

interface modelSelectProps extends ControllerRenderProps {
    placeholder: string
    data: Array<ModelType>
}

export const ModelSelect: FunctionComponent<modelSelectProps> = function ({ ...props }) {
    const { placeholder, data, onChange } = props

    return (
        <Select
            onValueChange={onChange}
            {...props}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {data.map((item, i) => {
                    return (
                        <SelectItem
                            key={i}
                            value={item?.id as string}
                        >
                            {item?.name}
                        </SelectItem>
                    )
                })

                }
            </SelectContent>
        </Select>

    )
}
