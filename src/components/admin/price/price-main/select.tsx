import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FunctionComponent } from 'react'
import { PriceType } from './type'
import { ControllerRenderProps } from 'react-hook-form'
import { ColorPicker } from '@/components/ui/color-picker-input'

interface priceSelectProps extends ControllerRenderProps {
    placeholder: string
    data: Array<PriceType>
}

export const PriceSelect: FunctionComponent<priceSelectProps> = function ({ ...props }) {
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
                            {item?.product_model?.product?.name} - Rp. {Number(item?.price)}
                        </SelectItem>
                    )
                })

                }
            </SelectContent>
        </Select>

    )
}
