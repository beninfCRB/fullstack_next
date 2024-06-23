import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FunctionComponent } from 'react'
import { ModelMachineType } from './type'
import { ControllerRenderProps } from 'react-hook-form'

interface modelmachineSelectProps extends ControllerRenderProps {
    placeholder: string
    data: Array<ModelMachineType>
}

export const ModelMachineSelect: FunctionComponent<modelmachineSelectProps> = function ({ ...props }) {
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
                            {item?.engineType}
                        </SelectItem>
                    )
                })

                }
            </SelectContent>
        </Select>

    )
}
