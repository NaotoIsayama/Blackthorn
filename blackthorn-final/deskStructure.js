// Lucide Icons
import { Plane, CalendarDays, CalendarCog, CalendarCheck2 } from 'lucide-react' 

export const myDeskStructure = (S) => 
    S.list()
        .title('Scheduling')
        .items([
            S.listItem()
                .title('\'Appointment Date\' Settings')
                .icon(CalendarCog)
                .child(
                    S.list()
                        .title('Availability Options')
                        .items([
                            S.documentTypeListItem('roadTripDocument')
                                .title('Plan A Trip')
                                .icon(Plane),
                            S.documentTypeListItem('weeklyAvailability')
                                .title('Set your Home Schedule')
                                .icon(CalendarDays),
                            S.documentTypeListItem('dayBooking')
                                .title('Block Off an Appointment Day')
                                .icon(CalendarCheck2),
                        ])
                ),
            //Other top level item go here
        ])
