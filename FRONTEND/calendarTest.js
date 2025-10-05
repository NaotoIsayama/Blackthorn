window.addEventListener("DOMContentLoaded", async () => {

    const dropdown = document.getElementById("tattoo-city");

    //init flatpickr first
    const calendarInstance = flatpickr("#date-picker-el", {
        dateFormat: "Y-m-d",
        minDate: "today",
        wrap: true,
        disableMobile: true,
        onChange: (selectedDates, dateStr, instance) => {
            console.log('selectedDates[0] is: ', selectedDates[0]);
            if (selectedDates[0]) {
                getHours(selectedDates[0], dropdown.value);
            }
        }
    });

    // make today + 3 date obj
    const today = new Date();
    const three = new Date(today);
    three.setDate(today.getDate() + 3);


    const flatpickrArray = [three];


    dropdown.addEventListener("change", () => {
        calendarInstance.set("disable", [...flatpickrArray]);
    });
})