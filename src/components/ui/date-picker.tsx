"use client"

import { FunctionComponent, useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FormControl } from "./form"
import { ControllerRenderProps } from "react-hook-form"

interface DatePickerProps extends ControllerRenderProps<any, string> {

}

export const DatePicker: FunctionComponent<DatePickerProps> = function ({ value, onChange }) {
    const [date, setDate] = useState<Date>()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full pl-3 text-left font-normal",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? (
                            format(value, "dd/LL/yyyy")
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={(date) =>
                        date < new Date()
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
