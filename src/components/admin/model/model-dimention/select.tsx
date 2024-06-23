import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FunctionComponent } from 'react'
import { ModelDimentionType } from './type'
import { ControllerRenderProps } from 'react-hook-form'

interface modeldimentionSelectProps extends ControllerRenderProps {
    placeholder: string
    data: Array<ModelDimentionType>
}

export const ModelDimentionSelect: FunctionComponent<modeldimentionSelectProps> = function ({ ...props }) {
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
                            {Number(item['length'])} {Number(item?.height)}
                        </SelectItem>
                    )
                })

                }
            </SelectContent>
        </Select>

    )
}
