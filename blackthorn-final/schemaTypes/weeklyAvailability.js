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
          name: 'weekdayAvailability', // added name for the object type
          fields: [
            {
              name: 'day',
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
            {
              name: 'startTime',
              title: 'Start Time',
              type: 'string',
              description: 'Start time for this day (e.g., "09:00")',
            },
            {
              name: 'endTime',
              title: 'End Time',
              type: 'string',
              description: 'End time for this day (e.g., "17:00")',
            },
          ],
          preview: {
            select: {
              day: 'day',
              start: 'startTime',
              end: 'endTime',
            },
            prepare(selection) {
              const { day, start, end } = selection;
              const dayMap = {
                '0': 'Sunday',
                '1': 'Monday',
                '2': 'Tuesday',
                '3': 'Wednesday',
                '4': 'Thursday',
                '5': 'Friday',
                '6': 'Saturday',
              };
              return {
                title: `${dayMap[day] || day} (${start || '—'} - ${end || '—'})`,
              };
            },
          },
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
