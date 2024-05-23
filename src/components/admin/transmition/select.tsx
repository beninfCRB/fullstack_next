import React, { FunctionComponent } from 'react'
import { TransmitionType } from './type'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface transmitionSelectProps {
    placeholder: string
    data: Array<TransmitionType>
}

export const TransmitionSelect: FunctionComponent<transmitionSelectProps> = function ({ ...props }) {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
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
