import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table'  
export interface Food {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})




export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'calories', 'fat', 'carbs','protein'];
  dataSource: any;
  empForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    name: new FormControl(null, [Validators.required]),
    mobileno: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    profile_pic: new FormControl(''),
  });
  constructor(private _userService :UserserviceService,private router: Router) { }
  submitted:any;
  emailvalid: boolean;
  btnClicked:boolean = false;
  ngOnInit() {
   // 
   setTimeout(()=>{  this._userService.topNavReq();},5000)
    this._userService.topNavReq();
   this. getAllEmployee();
   this._userService.EmpData.subscribe((data)=>{
    this.getSearchEmployee(data);
   })
   this. getAllEmployee();
  }
  url: any;
  onSelectFile(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      
      reader.onload = (event) => { 
        this.url = event;
      }
    }
  }
  isnamelimit:boolean = false;
  checkName(){
    this.isnamelimit = false;
    if(this.empForm.value.name.length < 2){
          this.isnamelimit = true;
      return;
    }
  }
  validateEmail() {
    let elementValue = this.empForm.value.email;
    if (elementValue.length <= 0) {
      this.emailvalid = true;
    } else {
      let emailPattern = /^[a-zA-Z0-9.]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
      this.emailvalid = emailPattern.test(elementValue);
      return this.emailvalid;
    }
  }
  saveEmployee(){
    this.btnClicked = false;
    if(!this.empForm.valid){
      this.btnClicked = true;
      return
    }
    let formData = this.empForm.value;
    let imgUrl = (this.url.target.result).toString();
   formData.profile_pic = imgUrl;
   
 
    this._userService.addEmployee(formData).subscribe((datas) => {
      this.empForm.reset();
      this.btnClicked = false;
      this. getAllEmployee();
     alert("Employee details added successfully")
      
    });
  }
  deleteEmployee(item){
    this._userService.deleteEmployee(item._id).subscribe((datas) => {
      this.empForm.reset();
      this. getAllEmployee();
     alert("Employee details deleted successfully")
      
    });
  }
  updateEmployeeDetails(){
   
    if(!this.empForm.valid){
      this.btnClicked = true;
      return
    }
    let formData = this.empForm.value;
 
    console.log("test--", formData,this.updateData)
   // return;
   formData.id = this.updateData._id;
   formData.profile_pic = this.updateData.profile_pic;
    this._userService.updateEmployee(formData).subscribe((datas) => {
      console.log("o00909-->",datas);
      this.empForm.reset();
      this. getAllEmployee();
     alert("Employee details updated successfully")
      
    });
  }
  allEmployeeList = [];
  isupdate:boolean = false;
  p: number = 1;
  getAllEmployee(){
    this._userService.topNavReq();
    this._userService.getEmployeeList().subscribe((datas) => {
    this.allEmployeeList = datas['data'];
    this._userService.topNavReq();
   
    });
  }
  pageChange(){
    
  }
  updateData:any;
  updateEmployee(item){
    this.isupdate = true;
    this.empForm.patchValue({email:item.email,name:item.name,mobileno:item.mobileno})
    this.updateData = item;
  }
  getSearchEmployee(data){
let searchData = {name:data}
    this._userService.getSearchEmployeeList(searchData).subscribe((datas) => {

    this.allEmployeeList = datas['data'];
    console.log("000ij--",this.allEmployeeList);
    
    });
  }

  sortValue:number =1;
  sorting(data){
    let searchData = {}
    if(data == "name"){
      searchData = {name:this.sortValue}
    }else{
      searchData = {email:this.sortValue}
    }
        this._userService.getSortEmployeeList(searchData).subscribe((datas) => {
          if(this.sortValue == 1){
            this.sortValue = -1;
          }else{
            this.sortValue = 1;
          }
        
        this.allEmployeeList = datas['data'];
        });
  }
is_email_alreadyexist:boolean = false;
is_mobile_no_alreadyexist:boolean = false;
  checkEmpEmailData(){
    this.is_email_alreadyexist = false;
   
    let  searchData = {email:this.empForm.value.email}
  
        this._userService.checkEmpData(searchData).subscribe((datas) => {
          if(datas['data'] == "already exist"){
            this.is_email_alreadyexist = true;
          }else{
            this.is_email_alreadyexist = false;
          }
         
     
        });
      }
      checkEmpMobilenoData(){
      
        this.is_mobile_no_alreadyexist =  false;
        let   searchData = {mobileno:this.empForm.value.mobileno}
      
            this._userService.checkEmpData(searchData).subscribe((datas) => {
              if(datas['data'] == "already exist"){
               this.is_mobile_no_alreadyexist = true;
              }else{
                this.is_mobile_no_alreadyexist =  false;
              }
             
          
            });
          }
      
}
