



window.addEventListener('DOMContentLoaded', async () => {

            alert("JS loaded");

            /* ------------ TO DO LIST ------------ */

            /*2025-09-29: Next step is to find a way to block off booked days only when all the hours are booked. 
            Otherwise, the getHours() function needs to be able to take a time range from bookedDates(if one exists for the selected day)
            subtract it from the total range, and create time blocks in the new range.*/

            /* ------------ END TO DO ------------ */
            //
            //
            //
            //
            /* ------------------------------------------------*/
            
            // Send request and create lucide icons first

            const response = await fetch('https://blackthorntattoo.naotoisayama.com/.netlify/functions/getAvailability', {
                method: 'POST',
            })
            const data = await response.json();
            window.availabilityData = data;

            lucide.createIcons(); // replaces all data-lucide icons with SVGs

            // ------------ GLOBALS ------------//

            // More convienient shortcuts for sanity data
            let n = 90; // Represents the time needed to do the flash tattoo. Grab from metadata later
            let weeklyScheduleArray = window.availabilityData.weeklySchedule; //Extract out the 'weeklySchedule' array for better readability
            let weeklyScheduleObject = weeklyScheduleArray[0];
            const homeCity = weeklyScheduleArray[0].homeCity; // weeklySchedule Array should just be size 1, look into adding restrictions in sanity studio
            const scheduledDaysArray = weeklyScheduleArray[0].weekdays.flatMap(s => s.day); // Get scheduled days into a flattened 1-D array
            const roadTrips = window.availabilityData.roadTrips
            const bookedDatesArray = window.availabilityData.bookedDays.map(b => b.date); // Array of date strings
            const bookedDateObjArr = window.availabilityData.bookedDays; 

            // To be assigned Values
            let fullyBooked = []; // This Array should hold the fully booked days, where any gap < n
            let partiallyBooked = []; // This Array should hold the new availability of days that are partially booked, for use later
            let bookedDateObj;
            let roadTripRangesArr = [];
            let selectedValue;

            // Date Variables, used for min in flatpickr and upperbound
            let today = new Date();
            let twelveMonths = new Date();
            twelveMonths.setMonth(today.getMonth() + 6);
            

            // DOM elements
            const grid = document.querySelector(".time-blocks-grid");
            const dropdown = document.getElementById("tattoo-city");

            // ------------ GLOBALS ------------//

            
        


            // ------------ DEBUG console logs ------------//
            //console.log('window.availabilityData is', window.availabilityData);

            //console.log('weeklyScheduleArray is', window.availabilityData.weeklySchedule);

            //console.log(`Weekly Schedule Array Data is : ${scheduledDaysArray} after processing`);

            //console.log('Home City is: ', homeCity);

            //console.log('roadTrips is', roadTrips);

            //console.log('window.availabilityData.blockedDates is', window.availabilityData.bookedDays);

            // ------------ DEBUG console logs ------------//



            // ------------ HELPER FUNCTIONS ------------ //
            //Date Parser is a function that splits up the date string so that date() objects created with it 
            //dont apply the timezone shift
            function dateParser(dateStr) {
                // Expecting format YYYY-MM-DD
                const [year, month, day] = dateStr.split("-").map(Number);
                return [year, month, day];
            }

            // translate 24hr format into minutes
            function timeToMinutes(timeStr) {
                const [hours, mins] = timeStr.split(":").map(Number);
                return hours * 60 + mins;           
            }

            // Merge intervals merges all the appointment time ranges in a day into the least amount of consolidated
            // time blocks for easier calculations
            function mergeIntervals(bookedSlots) {

                if (bookedSlots.length == 0) {
                    return [];
                }

                if (bookedSlots.length == 1) {
                    return [bookedSlots[0]];
                }

                // first, sort array by start time
                bookedSlots.sort((a, b) => a[0] - b[0]);

                // Merged holds a array of consolidated intervals, populate it with first interval
                const merged = [bookedSlots[0]]; //bookedSlots[0] is a array of size 2

                // Loop over booked slots, starting at the second item, check if start time is = or < the end time of
                // the previous item

                for (let i = 1; i < bookedSlots.length; i++) {
                    let lastMerged = merged[merged.length - 1];

                    // Check if the start time of the current slot is less than
                    // or equal to the end time of the previous merged slot. If so,
                    // merge that array
                    if (bookedSlots[i][0] <= lastMerged[1]) {
                        lastMerged[1] = Math.max(lastMerged[1], bookedSlots[i][1]); // Set endpoint to whichever endpoint is later
                    } else {
                        merged.push(bookedSlots[i]);
                    }  
                }
                return merged;
            }

            // getFreeSlots takes a schedule {startTime, endTime} and a mergedIntervals [[start, end], ...] and returns
            // an array an array of objects [{start:, end:}, ...] that represents the free slots on a given booked day.
            function getFreeSlots (schedule, mergedIntervals) {
                const scheduleStart = schedule.startTime;
                const scheduleEnd = schedule.endTime;

                const freeSlots = [];
                let cursor = scheduleStart;

                // interval[0] represents the start time, interval[1] represents the end time
                for (let interval of mergedIntervals) {
                    if (interval[0] > cursor) {
                        freeSlots.push({
                            start: cursor,
                            end: interval[0]
                        });
                    }
                    cursor = interval[1];
                }

                // Once the loop is done, add the gap between cursor and scheduleEnd, if it exists
                if (cursor < scheduleEnd) {
                    freeSlots.push({
                        start: cursor,
                        end: scheduleEnd
                    });
                }

                return freeSlots;
            }

            // isFullyBooked see's if a n-sized block can fit inside freeSlots, essentially determining if a
            // day is fully booked, for this kind of appointment
            function isFullyBooked(freeSlots, n) {
                // If there are no free slots (freeSlots array is empty), early exit
                if (freeSlots.length == 0) {
                    return true;
                }

                // .every() return true/false only if every element passes the testing function
                // So here, if every free slot is smaller than n, isFullyBooked = true
                return freeSlots.every(slot => slot.end - slot.start < n);
            }

            // disables weekdays that are not on the schedule
            const recurringDisabledWeekdays = (date) => {
                return !(scheduledDaysArray.includes(date.getDay().toString()));
            }

            // timeDiff calculates the time difference between 2 24-hr strings and returns the
            // start and end times, expressed as minutes since midnight
            function timeDiff(start, end) {
                const [startHours, startMins] = start.split(":").map(Number);
                const [endHours, endMinutes] = end.split(":").map(Number);

                // Convert both to minutes since midnight
                const startDelta = startHours * 60 + startMins;
                const endDelta = endHours * 60 + endMinutes;

                // return diff, startDelta and endDelta
                return {
                    delta: endDelta - startDelta,
                    start: startDelta,
                    end: endDelta
                }
            }  

            // formatTimeRange translates minutes from midnight to 24hr xx:xx format
            function formatTimeRange(time1, time2) {
                function minutesTo24Hour(minutes) {
                    const hours = Math.floor(minutes / 60);
                    const mins = minutes % 60;
                    // pad with leading 0
                    const hh = hours.toString().padStart(2, "0");
                    const mm = mins.toString().padStart(2, "0");
                    return `${hh}:${mm}`;
                }
                return `${minutesTo24Hour(time1)}-${minutesTo24Hour(time2)}`;
            }

            // Get hours is a function that takes a date string (chosen by the user via flatpickr)
            // and a city (chosen by the user in the dropdown) and creates a grid of buttons, corresponding to
            // available time blocks of size n (n being the time needed to do the flash tattoo)
            function getHours(dateObj, city) {

                //clear all old blocks
                const oldBlocks = grid.querySelectorAll(".time-block");
                oldBlocks.forEach(block => block.remove());

                const dateWeekday = dateObj.getDay();
                let timeChunks = [];
                let slots = [];
                let isPartial = false; 

                // Check if dateObj matches with any date from the objects in partiallyBooked
                // and save its slots data and set isPartial to true

                // Convert dateObj into a date string
                const dateStr = dateObj.toISOString().split("T")[0];

                for (let obj of partiallyBooked) {
                    if (dateStr == obj.date) {
                        isPartial = true;
                        slots.push(...obj.slots);
                    }
                }

                // Since the city is already selected, we can grab the schedule based on that choice
                if (city === homeCity) {
                    if (isPartial) {
                        console.log("slots is: ", slots);
                        // Loop through each timeslot, and find how many n-sized chunks fit inside
                        for (let slot of slots) {
                            let slotDelta = slot.end - slot.start;
                            for (let i = 0; i < slotDelta/n; i++){
                                if ((n + (n * i)) <= slotDelta) {
                                    timeChunks.push({
                                        start: slot.start + (n * i),
                                        end: (slot.start + n) + (n * i)
                                    });
                                }   
                            }
                        } 
                        generateGrid(timeChunks);
                        console.log("timeChunks after looping through the slots is: ", timeChunks);
                    } 
                    else {  
                        //alert("getHours() fired, main branch");

                        // console.log("dateWeekday is: ", dateWeekday);
                        // console.log("weeklyScheduleObject is: ", weeklyScheduleObject);
                        let weekday = weeklyScheduleObject.weekdays[dateWeekday];

                        console.log("weeklyDay is: ", weekday);
                        // in minutes
                        let timeDiffObj = timeDiff(weekday.startTime, weekday.endTime)

                        console.log("The time range is: ", timeDiffObj.delta, " minutes.");
                        // Here, set n to be the size (in minutes) you want the time chunks to be
                        
                        // This loop calculates how many N sized chunks fit in the available time
                        // Each object in timeChunks represents the time blocks (minutes since Midnight)
                        // that are available
                        for (let i = 0; i < (timeDiffObj.delta/n); i++) {
                            if ((n + (n * i)) <= timeDiffObj.delta) { // This conditional checks if the 'end' of the next iteration exceeds the end of the artists working hours
                                timeChunks.push({
                                    start: timeDiffObj.start + (n * i),
                                    end: (timeDiffObj.start + n) + (n * i)
                                })
                            }
                        }

                        console.log("timeChunks is: ", timeChunks);

                        generateGrid(timeChunks)
                    }
                } 
                else {
                    if (isPartial) { // Since get free slots generates free slots based on a schedule, if is partial code can be repeated
                        console.log("slots is: ", slots);
                        // Loop through each timeslot, and find how many n-sized chunks fit inside
                        for (let slot of slots) {
                            let slotDelta = slot.end - slot.start;
                            for (let i = 0; i < slotDelta/n; i++){
                                if ((n + (n * i)) <= slotDelta) {
                                    timeChunks.push({
                                        start: slot.start + (n * i),
                                        end: (slot.start + n) + (n * i)
                                    });
                                }   
                            }
                        } 
                        generateGrid(timeChunks);
                        console.log("timeChunks after looping through the slots is: ", timeChunks);
                    }
                    else {
                        // Write code for road trip city

                        // Find city name in roadTrips
                        let timeDiffObj; 

                        roadTrips.forEach(item => {
                            if (item.trip.city === city) {
                                timeDiffObj = timeDiff(item.trip.timeSlot.startTime, item.trip.timeSlot.endTime)
                            }
                        });

                        console.log("timeDiffObj for the road trip is: ", timeDiffObj);

                        // MAKE A HELPER FUNCTION !!!

                        // This loop calculates how many N sized chunks fit in the available time
                        // Each object in timeChunks represents the time blocks (minutes since Midnight)
                        // that are available
                        for (let i = 0; i < (timeDiffObj.delta/n); i++) {
                            if ((n + (n * i)) <= timeDiffObj.delta) { // This conditional checks if the 'end' of the next iteration exceeds the end of the artists working hours
                                timeChunks.push({
                                    start: timeDiffObj.start + (n * i),
                                    end: (timeDiffObj.start + n) + (n * i)
                                })
                            }
                        }

                        console.log("timeChunks is: ", timeChunks);
                        generateGrid(timeChunks);
                    }
                }
            }

            // This functions generates the grid of radios based on timeChucnks
            function generateGrid(timeChunks) {
                timeChunks.forEach(block => {
                    //Create label
                    const label = document.createElement("label");
                    label.className = "time-block";

                    //Create radio input
                    const radioInput = document.createElement("input");
                    radioInput.className = "time-block__input";
                    radioInput.type = "radio";
                    radioInput.name = "timeBlock";
                    radioInput.value = `${formatTimeRange(block.start, block.end)}`;
                    
                    //Create text span
                    const text = document.createElement("span");
                    text.classList.add("sc-medium");
                    text.textContent = `${formatTimeRange(block.start, block.end)}`;
                    
                    label.appendChild(radioInput);
                    label.appendChild(text);

                    grid.appendChild(label);
                })
            }

            // ------------ END HELPER FUNCTIONS ------------ //



            // ------------ BEGIN PROGRAM ------------ //

            function main() {
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

                // Loop through all roadtrips and extract out date ranges as Date() objects
                roadTrips.forEach(t => {
                    roadTripRangesArr.push({
                        city: t.trip.city,
                        start: new Date(dateParser(t.trip.startDate)), 
                        end: new Date(dateParser(t.trip.endDate)),
                        timeSlot: t.trip.timeSlot
                    })
                });

                // console.log("roadTripRangesArr is: ", roadTripRangesArr);
                bookedDateObjArr.forEach(obj => {
                    // Convert Time slots to minutes
                    obj.timeSlot = {
                        startTime: timeToMinutes(obj.timeSlot.startTime),
                        endTime: timeToMinutes(obj.timeSlot.endTime)
                    };
                })

                // Loop through all booked Dates and check each one for which range they fit into
                bookedDateObjArr.forEach(obj => {
                    bookedDateObj = new Date(dateParser(obj.date));

                    // console.log("bookedDateObj is: ", bookedDateObj);
                    
                    let bookedDateRoadTrip = roadTripRangesArr.find(t => {
                        return bookedDateObj >= t.start && bookedDateObj <= t.end
                    });

                    // find all bookings on that day 
                    // bookingsOnDate is currently a array of objects
                    let bookingsOnDate = bookedDateObjArr.filter(b => b.date === obj.date);
                    //console.log("bookingsOnDate is: ", bookingsOnDate);


                    // create array of 2d arrays, each of which is [startTime, endTime]
                    let intervals = [];

                    for (let obj of bookingsOnDate) {
                        let item = [];
                        item.push(obj.timeSlot.startTime, obj.timeSlot.endTime);
                        intervals.push(item);
                    }

                    //console.log("Intervals is: ", intervals);

                    // Merge all bookings on the same day into min amount of blocks

                    const mergedIntervals = mergeIntervals(intervals);

                    //console.log("bookingsOnDate after minutes conversions is: ", bookingsOnDate);

                    let scheduleForDay;

                    // You can move out the shared code outside this if-else block
                    if (bookedDateRoadTrip) {

                        // Pulling Schedule from road trip, translate time slots data into minutes
                        scheduleForDay = {
                            startTime: timeToMinutes(bookedDateRoadTrip.timeSlot.startTime),
                            endTime: timeToMinutes(bookedDateRoadTrip.timeSlot.endTime)
                        };

                        //console.log("City Schedule for day is: ", scheduleForDay);

                        let bookedDateFreeSlots = getFreeSlots(scheduleForDay, mergedIntervals);

                        // If the date is fully booked, then push only the date to fullyBooked, if not push the array of free slots to partially booked
                        isFullyBooked(bookedDateFreeSlots, n) ? fullyBooked.push(bookedDateObj) : partiallyBooked.push({date: obj.date, slots : bookedDateFreeSlots});

                        //console.log(`bookedDateFreeSlots for ${bookedDateObj} in ${bookedDateRoadTrip.city} is: `, bookedDateFreeSlots);

                    } else {
                        //console.log("weeklySchedule object is: ", weeklyScheduleObject);
                        
                        // Find the correct weekday {day, endTime, startTime}
                        weekdaysObject = weeklyScheduleObject.weekdays.find(s => s.day == bookedDateObj.getDay());

                        scheduleForDay = {
                            startTime: timeToMinutes(weekdaysObject.startTime),
                            endTime: timeToMinutes(weekdaysObject.endTime)
                        }

                        let bookedDateFreeSlots = getFreeSlots(scheduleForDay, mergedIntervals);

                        isFullyBooked(bookedDateFreeSlots, n) ? fullyBooked.push(bookedDateObj) : partiallyBooked.push({date: obj.date, slots : bookedDateFreeSlots});

                        //console.log("Home Schedule for day is: ", scheduleForDay);
                        //console.log(`bookedDateFreeSlots for ${bookedDateObj} in Edmonton is: `, bookedDateFreeSlots);
                    }
                });

                // remove duplicates from partiallyBooked by converting to a map, then convert it back
                const tempMap = new Map();
                partiallyBooked.forEach(obj => tempMap.set(obj.date, obj));
                partiallyBooked = Array.from(tempMap.values());

                //console.log("The array of fully booked dates is: ", fullyBooked);
                console.log("The array of partially booked dates is: ", partiallyBooked);

                // Dropdown menu event listener, The initialization for flatpickr is inside here
                dropdown.addEventListener("change", () => {

                    // Alert
                    alert("change event fired!");

                    // Clear calendar
                    calendarInstance.clear()

                    // Clear grid
                    const oldBlocks = grid.querySelectorAll(".time-block");
                    oldBlocks.forEach(block => block.remove());

                    // Dropdown option selected
                    selectedValue = dropdown.value;
                    
                    const flatpickrArray = [];
                    flatpickrArray.push(...fullyBooked);

                    if (selectedValue === homeCity) {
                        
                        // Loop through road trips, and push a range object to disable array
                        for (let i =  0; i < roadTrips.length; i++) {

                            const [startY, startM, startD] = dateParser(roadTrips[i].trip.startDate);
                            const [endY, endM, endD] = dateParser(roadTrips[i].trip.endDate);

                            const startObj = new Date(startY, startM - 1, startD);
                            const endObj = new Date(endY, endM - 1, endD);

                            flatpickrArray.push({
                                from: startObj,
                                to: endObj
                            })
                        }

                        // ------------------------REMOTE CONSOLE------------------------//
                        fetch("https://blackthorntattoo.naotoisayama.com/.netlify/function/debug", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ message: flatpickrArray })
                        });
                        // ------------------------REMOTE CONSOLE------------------------//

                        console.log('The Disabled array, after adding trips and booked dates is: ', flatpickrArray); 
                        calendarInstance.set("minDate", today);
                        setTimeout(() => {
                            calendarInstance.set("disable", [...flatpickrArray, recurringDisabledWeekdays]);
                        }, 0);

                        //force redraw
                        calendarInstance.redraw();

                    } else {
                        
                        let startDateObj;

                        // Find which trip is selected and disable today -> startOfTrip && endOfTrip -> 3 months
                        for (let i = 0; i < roadTrips.length; i++) {
                            if (roadTrips[i].trip.city === selectedValue) {

                                console.log("The Start of the strip is: ", roadTrips[i].trip.startDate);
                                //console.log("The End of the strip is: ", roadTrips[i].trip.endDate);

                                // today -> startOfTrip

                                // randomly convert to dat obj
                                startDateObj = new Date((roadTrips[i].trip.startDate));

                                // from is inclusive, so go today -1
                                today.setDate(today.getDate()-1);

                                flatpickrArray.push({
                                    from: today,
                                    to: startDateObj
                                });

                                // endOfTrip -> 3 months
                                const endDateObj = new Date(roadTrips[i].trip.endDate);
                                endDateObj.setDate(endDateObj.getDate() + 1);

                                flatpickrArray.push({
                                    from: endDateObj,
                                    to: twelveMonths
                                });
                            }
                        }
                        console.log("flatpickrarray is: ", flatpickrArray);
                        calendarInstance.set("minDate", startDateObj.setDate(startDateObj.getDate() + 1));
                        setTimeout(() => {
                            calendarInstance.set("disable", [...flatpickrArray]);
                        });
                        
                        //force redraw
                        calendarInstance.redraw();
                    }
                });
            }

            main();

            // VANILLA TEST FOR merged

            // ----  test helpers ---- //
            function test(name, fn) {
                try {
                    fn();
                    console.log(`✅ ${name}`);
                } catch (err) {
                    console.error(`❌ ${name}`);
                    console.error(err.message);
                }
            }

            function assertEqual(actual, expected) {
                const a = JSON.stringify(actual);
                const e = JSON.stringify(expected);
                if (a !== e) {
                    throw new Error(`Expected ${e}, but got ${a}`);
                }
            }
            // ----  test helpers ---- //

            // ------ tests ------//
             
})