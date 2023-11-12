import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private HttpClient:HttpClient) { }
//create data
  addEmployee(data:any):Observable<any>{
   return this.HttpClient.post("http://localhost:3000/employees",data)
  }

  //get data
  getEmployee():Observable<any>{
    return this.HttpClient.get("http://localhost:3000/employees")
  }

  //delete data
  deleteEmployee(id:any):Observable<any>{
    return this.HttpClient.delete(`http://localhost:3000/employees/${id}`)
  }

   //update data
   updateEmployee(id:number,data:any):Observable<any>{
    return this.HttpClient.put(`http://localhost:3000/employees/${id}`,data)
  }
}
