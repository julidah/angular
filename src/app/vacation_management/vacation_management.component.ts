import { Component, OnInit } from "@angular/core";
import { LeaveRequest } from "./shared/vacation_mangment.model";
import { VacationManagementService } from "@app/_services/vacationManagement.service";
import { DatePipe } from "@angular/common";
import { UserService } from "@app/_services";
import { User } from "@app/_models";
import { FormGroup, FormBuilder } from "@angular/forms";
import { VALID } from "@angular/forms/src/model";
import swal from "sweetalert";

@Component({
    selector:'app-vacation-management',
    templateUrl:'./vacation_management.html',
})
export class VacationManagementComponent implements OnInit {
    leaveRequestForm:FormGroup;
    vacations:LeaveRequest[];
    vacation:LeaveRequest;
    users:User[];
    filterUser:User[];
    isEdit  :boolean=false;
    isApprove  :boolean=false;
    HrApproval  :boolean=false;
    managerApproval:boolean=false;
    constructor(
        public formBuilder:FormBuilder,
        public datePipe:DatePipe,
        private userService: UserService,
        private vacationService:VacationManagementService){    }

    ngOnInit() {
        this.vacationService.getLeaveRequests().subscribe(vacation=>this.vacations=vacation)
        this.userService.getAll().subscribe(users=>this.users=users)
        this.isEdit=false;
        this.isApprove=false;
        this.HrApproval=false;
        this.leaveRequestForm=this.formBuilder.group({
            id:[''],
            applicationDate: [this.datePipe.transform(new Date,('yyyy-MM-dd'))],
            applicationNo: [''],
            user: [''],
            leaveType: [''],
            startDate:[this.datePipe.transform(new Date,('yyyy-MM-dd'))],
            endDate:[''],
            totalDays:[''],
            leaveStatus: [''],
            halfDay:[''],
            replacementNote: [''], 
            reason: [''],
            status:[''],
            approveBy:[''],
            managerDescription: [''],
            approveByHr: [''],
            hrStatus:[''],
            hrRemarks:[''],
        })
        
    }
    employeeDelete(id:number){
       this.vacationService.deleteLeaveRequest(id).subscribe((  response => {

        swal({
          // position: 'top-end',
        //   type: response['type'],
        text: "Successfully Delete Row",
        icon: "success",
        title: 'Delete Success',
        timer: 1500
        })
        if(response['type'] == 'success')
        this.ngOnInit();
        }))
    }
    Edit(id){
        this.vacationService.getLeaveRequest(id).subscribe(val=>{
          this.isEdit=true;
          this.patchLeaveRequest(val);
        })
        }
        ApproveByManager(id){
            this.vacationService.getLeaveRequest(id).subscribe(val=>{
                this.isApprove=true;
                this.patchApproval(val);
              })
        } 
        ApproveByHr(id){
            this.vacationService.getLeaveRequest(id).subscribe(val=>{
                this.HrApproval=true;
                this.patchApprovalHr(val);
              })
        }  
        patchApprovalHr(val:LeaveRequest){
            this.leaveRequestForm.patchValue({
                applicationDate: this.datePipe.transform(val.applicationDate,('yyyy-MM-dd')),
                applicationNo: val.applicationNo,
                user: val.user,
                leaveType: val.leaveType,
                startDate: this.datePipe.transform(val.startDate,('yyyy-MM-dd')),
                endDate: this.datePipe.transform(val.endDate,('yyyy-MM-dd')),
                totalDays: val.totalDays,
                leaveStatus: val.leaveStatus,
                halfDay: val.halfDay,
                reason: val.reason,
                id:val.id,
                replacementNote: val.replacementNote,
                approveByHr: val.approveByHr,
                hrStatus:val.hrStatus,
                hrRemarks:val.hrRemarks,
                status:val.status,
                managerDescription:val.managerDescription,
                approveBy:val.approveBy,
            })
        }
            patchApproval(val:LeaveRequest){
                this.leaveRequestForm.patchValue({
                    applicationDate: this.datePipe.transform(val.applicationDate,('yyyy-MM-dd')),
                    applicationNo: val.applicationNo,
                    user: val.user,
                    leaveType: val.leaveType,
                    startDate: this.datePipe.transform(val.startDate,('yyyy-MM-dd')),
                    endDate: this.datePipe.transform(val.endDate,('yyyy-MM-dd')),
                    totalDays: val.totalDays,
                    leaveStatus: val.leaveStatus,
                    halfDay: val.halfDay,
                    reason: val.reason,
                    id:val.id,
                    status:val.status,
                    replacementNote: val.replacementNote,
                    managerDescription:val.managerDescription,
                    approveBy:val.approveBy,
                    approveByHr: val.approveByHr,
                    hrStatus:val.hrStatus,
                    hrRemarks:val.hrRemarks,
                })
            }
        patchLeaveRequest(val:LeaveRequest){
            this.leaveRequestForm.patchValue({
                applicationDate: this.datePipe.transform(val.applicationDate,('yyyy-MM-dd')),
                applicationNo: val.applicationNo,
                user: val.user,
                leaveType: val.leaveType,
                startDate: this.datePipe.transform(val.startDate,('yyyy-MM-dd')),
                endDate: this.datePipe.transform(val.endDate,('yyyy-MM-dd')),
                totalDays: val.totalDays,
                leaveStatus: val.leaveStatus,
                halfDay: val.halfDay,
                reason: val.reason,
                id:val.id,
                status:val.status,
                replacementNote: val.replacementNote,
            })
            debugger
            if(val.status=='approve'){
                this.managerApproval=true
            } 
            else{
                this.managerApproval=false

            }
        }
       
        cancel(){
            this.leaveRequestForm.reset();
        }
        createAndUpdate(data){
            debugger;
            if(this.isEdit || this.HrApproval || this.isApprove){
                 this.vacationService.UpdateLeaveRequest(data,data.id)
                .subscribe((  response => {
                    swal({
                        text: "Successfully Update Row",
                        icon: "success",
                        title: 'Update Success',
                        timer: 1500
                    })
                  if(response['type'] == 'success')
                  this.ngOnInit();
                  }));
              }
              else{
               
                
                
                   this.vacationService.addLeaveRequest(data)
                  .subscribe((  response => {
                    swal({
                        text: "Successfully Create Row",
                        icon: "success",
                        title: 'Create Success',
                        timer: 1500
                    })
                   
                    }));
              }
        }
       
    
}