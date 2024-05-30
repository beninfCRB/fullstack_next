import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FunctionComponent } from 'react'
import { ProductColorType } from './type'

interface productcolorSelectProps {
    placeholder: string
    data: Array<ProductColorType>
}

export const ProductColorSelect: FunctionComponent<productcolorSelectProps> = function ({ ...props }) {
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
                            {item?.product?.name}
                        </SelectItem>
                    )
                })

                }
            </SelectContent>
        </Select>

    )
}
