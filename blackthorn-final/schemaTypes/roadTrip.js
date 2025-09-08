export default {
    name: 'roadTrip',
    title: 'Road Trip',
    type: 'object',
    fields: [
        { name: 'city', title: 'City', type: 'string'},
        { name: 'startDate', title: 'Start Date', type: 'date'},
        { name: 'endDate', title: 'End Date', type: 'date'},
        {
            name: 'notes',
            title: 'Notes',
            type: 'text',
            description:
                'Optional notes about this Trip. Anything written here does not show up on your form.',
        }
    ]
}