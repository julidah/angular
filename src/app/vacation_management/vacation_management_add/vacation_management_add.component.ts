import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { UserService } from "@app/_services";
import { User } from "@app/_models";
import { LeaveRequest } from "../shared/vacation_mangment.model";
import { VacationManagementService } from "@app/_services/vacationManagement.service";
import swal from 'sweetalert';
@Component({
    selector:'app-vacation-management-add',
    templateUrl:'./vacation_management_add.component.html'
})
export class VacationManagementAddComponent implements OnInit{
    
 leaveRequestForm:FormGroup;
 leaveRequest:LeaveRequest;
 users:User[];
constructor(public formBuilder:FormBuilder,
    public datePipe:DatePipe,
    private userService: UserService,
    private vacationService:VacationManagementService
    ){}
    ngOnInit(){
    this.userService.getAll().subscribe(users=>this.users=users)
this.leaveRequestForm=this.formBuilder.group({
    applicationDate: [this.datePipe.transform(new Date,('yyyy-MM-dd'))],
    applicationNo: [''],
    user: [''],
    leaveType: [''],
    startDate:[this.datePipe.transform(new Date,('yyyy-MM-dd'))],
    endDate:[''],
    totalDays:[''],
    leaveStatus: [''],
    halfDay:[''],
    reason: [''],
    replacementNote: [''],
})
}
addLeaveRequest(leaveRequest:LeaveRequest) {

    if (this.leaveRequestForm.dirty && this.leaveRequestForm.valid) {
       
        this.vacationService.addLeaveRequest(leaveRequest)
        .subscribe((
            response => {
                if (response['type'] == 'success')
            {
              swal({
                // title: "Are you sure?",
                text: "Successfully Save data",
                icon: "success",
                dangerMode: false,
              })
              
           
            }
            else{
                swal({
                    // title: "Are you sure?",
                    text: "Successfully Save data",
                    icon: "error",
                    dangerMode: true,
                })
              }
            }
        ))

    }
}


}