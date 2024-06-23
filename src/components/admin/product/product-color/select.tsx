import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FunctionComponent } from 'react'
import { ProductColorType } from './type'
import { ControllerRenderProps } from 'react-hook-form'
import { ColorPicker } from '@/components/ui/color-picker-input'

interface productcolorSelectProps extends ControllerRenderProps {
    placeholder: string
    data: Array<ProductColorType>
}

export const ProductColorSelect: FunctionComponent<productcolorSelectProps> = function ({ ...props }) {
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
                                    value={item?.color?.color as string}
                                /></div>
                                <div>{item?.product?.name}</div>
                                <div>{item?.color?.name}</div>
                            </div>
                        </SelectItem>
                    )
                })

                }
            </SelectContent>
        </Select>

    )
}
