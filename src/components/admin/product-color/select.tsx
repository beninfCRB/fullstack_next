import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FunctionComponent } from 'react'
import { ProductColorType } from './type'
import { ControllerRenderProps } from 'react-hook-form'

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
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {data.map((item, i) => {
                    return (
                        <SelectItem
                            key={i}
                            value={item?.id as string}
                        >
                            {item?.product?.name}
                        </SelectItem>
                    )
                })

                }
            </SelectContent>
        </Select>

    )
}
