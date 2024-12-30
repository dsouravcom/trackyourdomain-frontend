import { formatDistanceToNow } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { parseISO } from 'date-fns'

interface FormattedDate {
    timeAgo: string;
    fullDate: string;
}

export const formatLastChecked = (isoDateString: string): FormattedDate => {
    try {
        // Get user's timezone
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Parse the ISO string to a Date object
        const date = parseISO(isoDateString);
        
        // Calculate time difference
        const timeAgo = formatDistanceToNow(date, { addSuffix: true });
        
        // Format the full date in user's timezone
        const fullDate = formatInTimeZone(
            date,
            userTimeZone,
            'MMM d, yyyy h:mm a zzz'
        );
        
        return {
            timeAgo,
            fullDate
        };
    } catch (error) {
        console.error('Error formatting date:', error);
        return {
            timeAgo: 'unknown time ago',
            fullDate: 'unknown date'
        };
    }
}