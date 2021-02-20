import { Injectable,EventEmitter, Output,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})


export class UserserviceService {
   baseUrl='http://localhost:4000';
   @Output() EmpData: EventEmitter<Object> = new EventEmitter();
   @Output() topMenu: EventEmitter<Object> = new EventEmitter();
  constructor(private _http: HttpClient,) { }

  userLogin(body:any){
    return (this._http.post(this.baseUrl+ '/login', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')

  }));
  }
  addUser(body:any){
    return (this._http.post(this.baseUrl+ '/adduser', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')

  }));
  }
  updateEmployee(body:any){
    return (this._http.post(this.baseUrl+ '/updateemployee', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')

  }));
  }
  deleteEmployee(id:string){
    return (this._http.delete(this.baseUrl+ '/deleteemployee/'+id, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')

  }));
  }
  addEmployee(body:any){
    return (this._http.post(this.baseUrl+ '/addemployee', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')

  }));
  }
  checkEmpData(body:any){
    return (this._http.post(this.baseUrl+ '/checkempdata', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')

  }));
  }
  getSearchEmployeeList(body:any){
    return (this._http.post(this.baseUrl+ '/getsearchemployee', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')

  }));
  }
  getSortEmployeeList(body:any){
    return (this._http.post(this.baseUrl+ '/getsortemployee', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')

  }));
  }
  getEmployeeList(){
    return (this._http.get(this.baseUrl+ '/getemployee',  {
      headers: new HttpHeaders().append('Content-Type', 'application/json')

  }));
  }
searchEmp(data){
  this.EmpData.emit(data);
}
topNavReq(){
  this.topMenu.emit();
}
 
}
