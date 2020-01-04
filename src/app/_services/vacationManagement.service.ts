import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { LeaveRequest } from "@app/vacation_management/shared/vacation_mangment.model";
const headerOpt=
{
    headers: new HttpHeaders ({'Content-Type':'application/json'})
};
@Injectable()
export class VacationManagementService {
TestUrl='http://localhost:3000/LeaveRequest';
currentLeaveRequest:LeaveRequest={
    applicationDate: null,
    applicationNo: null,
    user: '',
    leaveType: '',
    startDate: null,
    endDate: null,
    leaveStatus: '',
    reason: '',
    id: null,
    replacementNote: '',
    totalDays:null,
    halfDay:'',
    status:'',
    approveBy:'',
    approveByHr:'',
    hrStatus:'',
    hrRemarks:'',
    managerDescription:'',
}

    constructor(public http:HttpClient){

    }
    getLeaveRequests():Observable<LeaveRequest[]>{
        return this.http.get<LeaveRequest[]>(this.TestUrl,headerOpt)
    }
    getLeaveRequest(id: number): Observable<LeaveRequest> {
        return this.http.get<LeaveRequest>(this.TestUrl+'/'+id);
      }
    deleteLeaveRequest(id:number):Observable<LeaveRequest>{
        return this.http.delete<LeaveRequest>(this.TestUrl+'/'+id,headerOpt)
    }
    addLeaveRequest(leaveRequestToAdd: LeaveRequest):Observable<LeaveRequest> {
        return this.http.post<LeaveRequest>(this.TestUrl, leaveRequestToAdd,
            { headers: { 'Content-Type': 'application/json' } } );
      }
    UpdateLeaveRequest(leaveRequestToAdd: LeaveRequest,id:number):Observable<LeaveRequest> {
        return this.http.put<LeaveRequest>(this.TestUrl+'/'+id, leaveRequestToAdd,
            { headers: { 'Content-Type': 'application/json' } } );
      }

}