export interface Deadline {
    turnaroundTime: number,
    businessLengthForTask: BusinessLength,
    taskStartDate: string,
    taskEndDate: string // these could be Dates
}

export interface BusinessLength {
    days: number,
    hours: number
}