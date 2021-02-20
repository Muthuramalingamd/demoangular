import { UserserviceService } from './../userservice.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });
  constructor(private _userService :UserserviceService,private router: Router) { }
  submitted:any;
  emailvalid: boolean;
  btnClicked:boolean = false;
  ngOnInit() {
    this._userService.topNavReq();
  }
  validateEmail() {
    let elementValue = this.loginForm.value.email;
    if (elementValue.length <= 0) {
      this.emailvalid = true;
      console.log(this.emailvalid,"jlkjlkj");
    } else {
      let emailPattern = /^[a-zA-Z0-9.]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
      this.emailvalid = emailPattern.test(elementValue);
      return this.emailvalid;
    }
  }
  login(){
    if(!this.loginForm.valid){
      this.btnClicked = true;
      return
    }

    this._userService.userLogin(this.loginForm.value).subscribe((datas) => {
      console.log("o00909-->",datas);
      localStorage.setItem('userCredential', JSON.stringify(datas));
     
      this.router.navigate(['/dashboard']);
    });
  }
}
