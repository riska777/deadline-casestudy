// TZ='UTC' node deadline-casestudy.js

const workdayStart = 9;
const workdayLength = 8;
const workdayEnd = workdayStart + workdayLength;
const workdays = [1,2,3,4,5]

function calculateDeadline(submitDate, turnaroundTime) {
    const businessLengthForTask = calcBusinessLengthForTask(turnaroundTime, workdayLength);
    const taskStartDate = new Date(submitDate);
    const taskEndDate = new Date(submitDate);

    if (
        !workdays.includes(taskStartDate.getDay()) 
        || taskStartDate.getHours() < workdayStart 
        || taskStartDate.getHours() > workdayEnd
    ) {
        console.error("You can only report a problem in working hours.");
        console.log("\n");
        return;
    }

    const calcTaskEndDate = () => {
        const singleDayTask = isSingleDayTask(turnaroundTime, workdayLength, taskStartDate);

        if (businessLengthForTask.days < 1) {
            taskEndDate.setHours(taskStartDate.getHours() + businessLengthForTask.hours);
        } else {
            if (!singleDayTask) {
                const businessDaysArray = new Array(Math.floor(businessLengthForTask.days)).fill(0);
                /* Add working days to deadline date */
                for (let day in businessDaysArray) {
                    const days = taskEndDate.getDate() + 1;
                    taskEndDate.setDate(days);
                    /* Skip weekend days */
                    while(!workdays.includes(taskEndDate.getDay())) {
                        taskEndDate.setDate(taskEndDate.getDate() + 1);
                    }
                }
            }
            /* Add only max possible amount of hours per day */
            const hours = taskEndDate.getHours() + (
                singleDayTask ? turnaroundTime : businessLengthForTask.hours
            );

            taskEndDate.setHours(hours);
        }
    }
    calcTaskEndDate();
    console.log("deadline", turnaroundTime, businessLengthForTask, taskStartDate.toUTCString(), taskEndDate.toUTCString());
    console.log("\n");

    return {
        turnaroundTime,
        businessLengthForTask,
        taskStartDate: taskStartDate.toUTCString(),
        taskEndDate: taskEndDate.toUTCString()
    }
}

function isSingleDayTask(turnaroundTime, workdayLength, taskStartDate) {
    return (taskStartDate.getHours() + turnaroundTime <= workdayStart + workdayLength);
}

function calcBusinessLengthForTask(turnaroundTime, workdayLength) {
    let businessLengthForTask = turnaroundTime / workdayLength;
    const addLastDaysAsHours = checkAddLastDayAsHours(businessLengthForTask);
    return {
        days: addLastDaysAsHours ? 
            businessLengthForTask - 1 : Math.floor(businessLengthForTask),
        hours: addLastDaysAsHours ? 
            workdayLength : 
            workdayLength * (businessLengthForTask - Math.floor(businessLengthForTask)),
    };
}

function checkAddLastDayAsHours(businessLengthForTask) {
    return businessLengthForTask >= 2 && businessLengthForTask % 1 == 0;
}

calculateDeadline("2023-09-01 07:00:00", 8);
calculateDeadline("2023-09-01 09:00:00", 8);
calculateDeadline("2023-09-01 12:00:00", 2);
calculateDeadline("2023-09-01 12:00:00", 8);
calculateDeadline("2023-09-01 09:00:00", 10);
calculateDeadline("2023-08-31 09:00:00", 10);
calculateDeadline("2023-08-11 09:00:00", 72);
calculateDeadline("2023-08-11 09:00:00", 73);