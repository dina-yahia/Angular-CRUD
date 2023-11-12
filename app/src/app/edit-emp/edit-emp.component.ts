import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicesService } from '../shared/services.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit{
 empForm:FormGroup;
  education:string[]=['Matric','Diploma','Intermediate','Greduate','Post Greduate']
  constructor( private fb:FormBuilder , private Services:ServicesService , private dialogref:MatDialogRef<EditEmpComponent>,
    @Inject (MAT_DIALOG_DATA) public data:any){
    this.empForm= this.fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      exp:'',
      package:'',

    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }
  onFormSubmit(){
    if(this.empForm.valid){
      // console.log(this.empForm.value);
      if(this.data){

        this.Services.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next:(val:any)=>{
             alert("Employee Detailes Updated successfull ")
             this.dialogref.close(true)
          },
          error: (err:any)=>{
            alert(err)
          }
        })
        
      
    
      }
      else{
        this.Services.addEmployee(this.empForm.value).subscribe({
          next:(val:any)=>{
             alert("employee added successfull ")
             this.dialogref.close(true)
          },
          error: (err:any)=>{
            alert(err)
          }
        })
        
      }
    }
      }
      
}
