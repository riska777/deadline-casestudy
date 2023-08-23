// TZ='UTC' node deadline-casestudy.js

console.log("-> running");

const workdayStart = 9;
const workdayLength = 8;
const workdayEnd = workdayStart + workdayLength;
const workdays = [1,2,3,4,5]

function calculateDeadline(submitDate, turnaroundTime) {
    // turnaroundTime: hours INT
    const businessLengthForTask = calcBusinessLengthForTask(turnaroundTime, workdayLength);
    const taskStartDate = new Date(submitDate);
    const taskEndDate = new Date(submitDate);
    const calcTaskEndDate = () => {
        const singleDayTask = isSingleDayTask(turnaroundTime, workdayLength, taskStartDate);

        if (businessLengthForTask < 1) {
            taskEndDate.setHours(taskStartDate.getHours() + (businessLengthForTask * workdayLength));
        } else {
            if (!singleDayTask) {
                const businessDaysArray = new Array(Math.floor(businessLengthForTask)).fill(1);
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
                singleDayTask ? turnaroundTime :
                    workdayLength * (businessLengthForTask - Math.floor(businessLengthForTask))
            );

            taskEndDate.setHours(hours + (checkAddLastDayAsHours(businessLengthForTask) ? workdayLength : 0));
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
    if (checkAddLastDayAsHours(businessLengthForTask)) {
        /* Fix business days array length for multiple days and change last day for working hours */
        businessLengthForTask--;
    }
    return businessLengthForTask;
}

function checkAddLastDayAsHours(businessLengthForTask) {
    return businessLengthForTask >= 2;
}

function calcHoursLeft(startDate, workdayLength) {
    return workdayLength - (startDate.getHours() - 9);
}

calculateDeadline("2023-09-01 09:00:00", 8);
calculateDeadline("2023-09-01 12:00:00", 2);
calculateDeadline("2023-09-01 12:00:00", 8);
calculateDeadline("2023-09-01 09:00:00", 10);
calculateDeadline("2023-08-31 09:00:00", 10);
calculateDeadline("2023-08-11 09:00:00", 72);