import { CalendarCheck } from "lucide-react";

export default {
  name: 'dayBooking',
  title: 'Day Booking',
  type: 'document',
  icon: CalendarCheck,
  fields: [
    { name: 'bookingTitle', title: 'Appointment Title', type: 'string' },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'timeSlot',
      title: 'Time Slot',
      type: 'object',
      fields: [
        {
          name: 'startTime',
          title: 'Start Time',
          type: 'string', // you could use a custom time type
          description: 'Start time of the appointment (e.g., "14:00")',
        },
        {
          name: 'endTime',
          title: 'End Time',
          type: 'string',
          description: 'End time of the appointment (e.g., "16:00")',
        },
      ],
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Optional notes about this appointment. Anything written here does not show up on your form.',
    },
  ],
  preview: {
    select: {
      date: 'date',
      title: 'bookingTitle',
      start: 'timeSlot.startTime',
      end: 'timeSlot.endTime',
    },
    prepare(selection) {

    const [year, month, day] = selection.date.split('-').map(Number);

    const formattedDate = new Date(Date.UTC(year, month - 1, day))
      .toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC' // prevents conversion to local TZ
      });
      /*
      const formattedDate = new Date(selection.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });*/
      const timeString = selection.start && selection.end ? ` (${selection.start} - ${selection.end})` : '';
      return {
        title: `${formattedDate}${timeString}`,
        subtitle: selection.title,
      };
    },
  },
};