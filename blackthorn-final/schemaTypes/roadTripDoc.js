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
      type: 'roadTrip'
    }
  ],
  preview: {
    select: {
        title: 'trip.city',
        start: 'trip.startDate',
        end: 'trip.endDate'
    },
    prepare(selection) {

        const formattedStart = new Date(selection.start).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        const formattedEnd = new Date(selection.end).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        return {
            title: `${selection.title} Trip`,
            subtitle: `From ${formattedStart} to ${formattedEnd}`
        }
    }
  }
}