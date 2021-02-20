import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.css']
})
export class RegistrationComponentComponent implements OnInit {
  regiForm = new FormGroup({
    name: new FormControl(null, [ Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    mobileno: new FormControl(null, [ Validators.required,Validators.minLength(10)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    profile_pic: new FormControl(''),
  });
  constructor(private _userService :UserserviceService,private router: Router) { }
  submitted:any;
  emailvalid: boolean;
  btnClicked:boolean = false;
  ngOnInit() {
    this._userService.topNavReq();
  }
  validateEmail() {
    let elementValue = this.regiForm.value.email;
    if (elementValue.length <= 0) {
      this.emailvalid = true;
      console.log(this.emailvalid,"jlkjlkj");
    } else {
      let emailPattern = /^[a-zA-Z0-9.]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
      this.emailvalid = emailPattern.test(elementValue);
      return this.emailvalid;
    }
  }
  register(){
    
  //  console.log("test--",imgUrl)
   // this.regiForm.patchValue({ profile_pic:imgUrl });
    if(!this.regiForm.valid){
      this.btnClicked = true;
      console.log("test-xyz-")
      return
    }
    let formData = this.regiForm.value;
    let imgUrl = (this.url.target.result).toString();
   formData.profile_pic = imgUrl;
   
    console.log("test--", formData);
    console.log("test--", formData)
    console.log("test--", formData)
   // return;
 
    this._userService.addUser(formData).subscribe((datas) => {
      console.log("o00909-->",datas);
     // localStorage.setItem('userCredential', JSON.stringify(datas));
     alert("Register successfully")
      this.router.navigate(['/login']);
    });
  }

  url: any;
  onSelectFile(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      
      reader.onload = (event) => { // called once readAsDataURL is completed
       console.log(event,"00---");
       this.url = event;
      
      }
    }
  }
}
