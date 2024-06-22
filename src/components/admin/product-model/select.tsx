import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FunctionComponent } from 'react'
import { ProductModelType } from './type'
import { ControllerRenderProps } from 'react-hook-form'

interface productmodelSelectProps extends ControllerRenderProps {
    placeholder: string
    data: Array<ProductModelType>
}

export const ProductModelSelect: FunctionComponent<productmodelSelectProps> = function ({ ...props }) {
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
                            {item?.product?.name} {item?.type?.name}
                        </SelectItem>
                    )
                })

                }
            </SelectContent>
        </Select>

    )
}
