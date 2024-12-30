'use client'

import { formatLastChecked } from '@/lib/dateFormatter'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Clock } from 'lucide-react'

interface LastCheckedTimeProps {
  dateString: string;
}

const LastCheckedTime = ({ dateString }: LastCheckedTimeProps) => {
  const { timeAgo, fullDate } = formatLastChecked(dateString)
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="text-sm text-muted-foreground flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          Last checked: {timeAgo}
        </TooltipTrigger>
        <TooltipContent>
          <p>{fullDate}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default LastCheckedTime