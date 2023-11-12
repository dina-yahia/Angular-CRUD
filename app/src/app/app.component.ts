import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditEmpComponent } from './edit-emp/edit-emp.component';
import { ServicesService } from './shared/services.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  displayedColumns: string[] = [
    'id', 
  'firstName',
   'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'exp',
    'package',
     'action'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private dialog:MatDialog ,private Services:ServicesService ){}
  ngOnInit(): void {
    this.getEmployeeList()
  }
  openAddEmpForm(){
   const dialogRef= this.dialog.open(EditEmpComponent)
   dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getEmployeeList()
      }
    }
   })
  }
  editEmp(data:any){
    const dialogRef=this.dialog.open(EditEmpComponent,
  {
    data
  })
dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getEmployeeList()
      }
    }
   })
  }
  getEmployeeList(){
    this.Services.getEmployee().subscribe({
      next:(res)=>{
         
         this.dataSource= new MatTableDataSource(res)
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
         
      },
      error:(err:any)=>{
        alert(err)
        
      }
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmp(id:number){
    this.Services.deleteEmployee(id).subscribe({
      next:(res)=>{
        alert('Employee deleted !')
        this.getEmployeeList(); //for auto refresh data
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }
}
