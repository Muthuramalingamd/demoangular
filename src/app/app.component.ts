import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from './userservice.service';
export interface Food {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demoapp';
  searchData='';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: Food[] = [
    {name: 'Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {name: 'Sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {name: 'Eclairs', calories: 262, fat: 16, carbs: 24, protein: 6},
    {name: 'Cupcakes', calories: 305, fat: 4, carbs: 67, protein: 4},
    {name: 'Gingerbreads', calories: 356, fat: 16, carbs: 49, protein: 4},
 ];
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
