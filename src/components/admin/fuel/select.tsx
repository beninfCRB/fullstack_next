import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FunctionComponent } from 'react'
import { FuelType } from './type'

interface fuelSelectProps {
    placeholder: string
    data: Array<FuelType>
}

export const FuelSelect: FunctionComponent<fuelSelectProps> = function ({ ...props }) {
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
