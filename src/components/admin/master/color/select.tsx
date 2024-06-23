import React, { FunctionComponent } from 'react'
import { ColorType } from './type'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ControllerRenderProps } from 'react-hook-form'
import { ColorPicker } from '@/components/ui/color-picker-input'

interface colorSelectProps extends ControllerRenderProps {
    placeholder: string
    data: Array<ColorType>
}

export const ColorSelect: FunctionComponent<colorSelectProps> = function ({ ...props }) {
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
                            <div className='flex items-center justify-start gap-2'>
                                <div><ColorPicker
                                    onChange={() => { }}
                                    value={item?.color as string}
                                /></div>
                                <div>{item?.name}</div>
                            </div>
                        </SelectItem>
                    )
                })

                }
            </SelectContent>
        </Select>

    )
}
