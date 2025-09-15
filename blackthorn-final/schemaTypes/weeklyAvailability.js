//Lucide
import { CalendarCheck } from "lucide-react";

export default {
    name: 'weeklyAvailability',
    title: 'Weekly Schedule',
    type: 'document',
    icon: CalendarCheck,
    fields: [
        { name: 'scheduleTitle', title: 'Schedule Title', type: 'string'},
        { name: 'homeCity', title: 'Set your Home City', type: 'string'},
        {
            name: 'weekdays',
            title: 'Workdays',
            type: 'array',
            of: [
                {
                    type: 'string',
                    options: {
                        list: [ //Values here correspond to flatpickers weekdays
                            { title: 'Monday', value: '1' },
                            { title: 'Tuesday', value: '2' },
                            { title: 'Wednesday', value: '3' },
                            { title: 'Thursday', value: '4' },
                            { title: 'Friday', value: '5' },
                            { title: 'Saturday', value: '6' },
                            { title: 'Sunday', value: '0' },
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