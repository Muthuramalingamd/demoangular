import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'oncourse';
  searchData='';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  removeHeader: boolean = true;
  constructor(private _userService :UserserviceService,private router: Router){
    console.log("testurl",location.href);
    
  }
  userData:any;
  ngOnInit(){
    this._userService.topMenu.subscribe((data)=>{
    
      if (window.location.pathname == '/login' ||  window.location.pathname == '/register' ) {
        console.log("oooheloo");
        
        this.removeHeader = false;
    }else{
      this.removeHeader = true;
    }
    let userDataObj = JSON.parse(localStorage.getItem('userCredential'));
    this.userData  = userDataObj['data'];
     })
     if (window.location.pathname == '/login' ||  window.location.pathname == '/register' ) {
      console.log("oooheloo");
      
      this.removeHeader = false;
  }else{
    this.removeHeader = true;
  }
   // this.removeHeader = true;
    console.log("userdata--", JSON.parse(localStorage.getItem('userCredential')));
  let userDataObj = JSON.parse(localStorage.getItem('userCredential'));
  this.userData  = userDataObj['data'];
  console.log("---dnnx",this.userData)
   
  }
  searchEmp(){
    this._userService.searchEmp(this.searchData);
  }
  logout(){
    this.removeHeader = true;
     localStorage.removeItem('userCredential');
    this.router.navigate(['/login']);
  }
}


