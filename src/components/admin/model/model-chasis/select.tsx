import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FunctionComponent } from 'react'
import { ModelChasisType } from './type'
import { ControllerRenderProps } from 'react-hook-form'

interface modelchasisSelectProps extends ControllerRenderProps {
    placeholder: string
    data: Array<ModelChasisType>
}

export const ModelChasisSelect: FunctionComponent<modelchasisSelectProps> = function ({ ...props }) {
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
                            {item?.transmitionType}
                        </SelectItem>
                    )
                })

                }
            </SelectContent>
        </Select>

    )
}
