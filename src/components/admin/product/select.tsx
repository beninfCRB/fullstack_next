import React, { FunctionComponent } from 'react'
import { ProductType } from './type'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface colorSelectProps {
    placeholder: string
    data: Array<ProductType>
    setValue: (id: any) => void
}

export const ProductSelect: FunctionComponent<colorSelectProps> = function ({ ...props }) {
    return (
        <Select
            onValueChange={props.setValue}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
                {props.data.map((item, i) => {
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
