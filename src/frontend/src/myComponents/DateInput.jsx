import React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "../lib/utils"
import { Calendar } from "../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo({ date, setDate }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full flex items-center gap-2 bg-transparent text-sm outline-none",
            !date ? "text-white/45" : "text-white"
          )}
        >
          <CalendarIcon className="w-4 h-4 text-web3-accent flex-shrink-0" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border border-white/10 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.7)]"
        style={{ background: "#0c0d22" }}
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          captionLayout="dropdown-buttons"
          fromYear={1920}
          toYear={new Date().getFullYear()}
          classNames={{
            months: "p-3",
            caption: "flex justify-between items-center mb-2 px-1",
            caption_label: "text-sm font-semibold text-white",
            nav: "flex items-center gap-1",
            nav_button: "h-7 w-7 rounded-lg bg-white/[0.06] hover:bg-web3-accent/20 text-white/70 hover:text-white flex items-center justify-center transition-colors",
            nav_button_previous: "",
            nav_button_next: "",
            table: "w-full border-collapse",
            head_row: "flex",
            head_cell: "text-white/30 text-xs font-medium w-9 text-center pb-2",
            row: "flex w-full mt-1",
            cell: "w-9 text-center text-sm relative",
            day: "h-9 w-9 rounded-lg text-white/70 hover:bg-web3-accent/20 hover:text-white transition-colors font-normal",
            day_selected: "bg-gradient-to-br from-web3-accent to-web3-purple text-white font-semibold hover:opacity-90",
            day_today: "border border-web3-accent/40 text-white",
            day_outside: "text-white/20",
            day_disabled: "text-white/10 cursor-not-allowed",
            dropdown: "bg-[#0c0d22] border border-white/10 text-white text-sm rounded-lg px-2 py-1 outline-none cursor-pointer",
            caption_dropdowns: "flex items-center gap-2",
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
