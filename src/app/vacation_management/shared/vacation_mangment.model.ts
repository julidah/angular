export class LeaveRequest {
    id:number;
    applicationDate: Date;
    applicationNo: number;
    user: string;
    leaveType: string;
    startDate:Date;
    endDate:Date;
    totalDays:number;
    leaveStatus: string;
    halfDay:string
    reason: string;
    replacementNote: string;
    status:string;
    approveBy:string;
    approveByHr:string;
    hrStatus:string;
    hrRemarks:string;
    managerDescription:string;
}