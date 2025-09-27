//Lucide 
import { CalendarCheck } from "lucide-react";

export default {
  name: 'roadTripDocument',
  title: 'Road Trip Document',
  type: 'document',
  icon: CalendarCheck,
  fields: [
    {
      name: 'trip',
      title: 'Trip Details',
      type: 'object',
      fields: [
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'date',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'date',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'timeSlot',
          title: 'Trip Working Hours',
          type: 'object',
          fields: [
            {
              name: 'startTime',
              title: 'Start Time',
              type: 'string',
              description: 'Start time (e.g., "09:00")',
            },
            {
              name: 'endTime',
              title: 'End Time',
              type: 'string',
              description: 'End time (e.g., "17:00")',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'trip.city',
      start: 'trip.startDate',
      end: 'trip.endDate',
      startTime: 'trip.timeSlot.startTime',
      endTime: 'trip.timeSlot.endTime',
    },
    prepare(selection) {
      const formattedStart = new Date(selection.start).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      const formattedEnd = new Date(selection.end).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      return {
        title: `${selection.title} Trip`,
        subtitle: `From ${formattedStart} (${selection.startTime || 'N/A'}) to ${formattedEnd} (${selection.endTime || 'N/A'})`,
      };
    },
  },
};