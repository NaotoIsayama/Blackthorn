import { CalendarCheck } from "lucide-react";

export default {
  name: 'weeklyAvailability',
  title: 'Weekly Schedule',
  type: 'document',
  icon: CalendarCheck,
  fields: [
    { name: 'scheduleTitle', title: 'Schedule Title', type: 'string' },
    { name: 'homeCity', title: 'Set your Home City', type: 'string' },
    {
      name: 'weekdays',
      title: 'Workdays',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            // Day of the week
            {
              name: 'day', // MUST have a name
              title: 'Day of the Week',
              type: 'string',
              options: {
                list: [
                  { title: 'Monday', value: '1' },
                  { title: 'Tuesday', value: '2' },
                  { title: 'Wednesday', value: '3' },
                  { title: 'Thursday', value: '4' },
                  { title: 'Friday', value: '5' },
                  { title: 'Saturday', value: '6' },
                  { title: 'Sunday', value: '0' },
                ],
              },
            },

            // Start time
            {
              name: 'startTime',
              title: 'Start Time',
              type: 'string', // could use custom time type
              description: 'Start time for this day (e.g., "09:00")',
            },

            // End time
            {
              name: 'endTime',
              title: 'End Time',
              type: 'string',
              description: 'End time for this day (e.g., "17:00")',
            },
          ],
        },
      ],
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Optional notes about this Schedule. Anything written here does not show up on your form.',
    },
  ],
  preview: {
    select: {
      title: 'scheduleTitle',
    },
  },
};
