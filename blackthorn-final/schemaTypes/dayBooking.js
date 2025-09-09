//Lucide
import { CalendarCheck } from "lucide-react";

export default {
  name: 'dayBooking',
  title: 'Day Booking',
  type: 'document',
  icon: CalendarCheck,
  fields: [
    { name: 'bookingTitle', title: 'Appointment Title', type: 'string'},
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description:
        'Optional notes about this appointment. Anything written here does not show up on your form.',
    },
  ],
  preview: {
    select: {
      date: 'date',
      subtitle: 'bookingTitle'
    },
    prepare(selection) {
      const formattedDate = new Date(selection.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      return {
        title: `${formattedDate}`,
        subtitle: selection.subtitle
      }
    },
  },
}