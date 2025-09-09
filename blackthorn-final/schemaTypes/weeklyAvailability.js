//Lucide
import { CalendarCheck } from "lucide-react";

export default {
    name: 'weeklyAvailability',
    title: 'Weekly Schedule',
    type: 'document',
    icon: CalendarCheck,
    fields: [
        { name: 'scheduleTitle', title: 'Schedule Title', type: 'string'},
        {
            name: 'weekdays',
            title: 'Workdays',
            type: 'array',
            of: [
                {
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Monday', value: 'Monday' },
                            { title: 'Tuesday', value: 'Tuesday' },
                            { title: 'Wednesday', value: 'Wednesday' },
                            { title: 'Thursday', value: 'Thursday' },
                            { title: 'Friday', value: 'Friday' },
                            { title: 'Saturday', value: 'Saturday' },
                            { title: 'Sunday', value: 'Sunday' },
                        ]
                    }
                }
            ]
        },
        {
            name: 'notes',
            title: 'Notes',
            type: 'text',
            description:
                'Optional notes about this Schedule. Anything written here does not show up on your form.',
        }
    ], preview: { 
        select: {
            title: 'scheduleTitle',
        }
    }
}