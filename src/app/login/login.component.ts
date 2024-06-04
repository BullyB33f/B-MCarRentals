import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{


  constructor(private authService: AuthService,
              private router: Router){}

  ngOnInit(): void {
      
  }


  bntStyle:string = '';
  bntStyle2: string = '';

  admin:boolean = false;

  user:boolean = false;

  adminView(){
    this.admin = true;
    this.user = false;
    this.bntStyle = 'active-btn'
    this.bntStyle2 = '';
  }

  userView(){
    this.admin = false;
    this.user = true;
    this.bntStyle2 = 'active-btn';
    this.bntStyle = '';
  }

  errMsg?:string;
  hasError:boolean = false;
  displaymsg?:string;

  // @ViewChild('userLoginForm') userLoginForm?:NgForm;



  onLogin(oForm: NgForm){

    console.log( JSON.stringify(oForm.value))
    const addSub = this.authService.login(oForm.value).subscribe((loginRes) => {
      if(loginRes['status'] === 'success'){
        
        this.hasError = false;
        this.authService.authToken = loginRes['data']!['token'];
        this.authService.saveAuthToken();
        this.authService.getCurrentUser(() => {
          this.authService.loginState = true;
        });
        // this.router.navigateByUrl(`/userdashboard/`);
        this.authService.getProfile().subscribe((res) => {
          const userdata = res['data']['user'];
          this.router.navigateByUrl(`/userdashboard/${userdata['user_id']}`);
        })
      }else{
        this.hasError = true;
        this.errMsg = loginRes['message'];
        this.authService.loginState = false;
        this.router.navigateByUrl('/register');
      }
    })
  }



  onAdminLogin(oForm: NgForm){

    console.log( JSON.stringify(oForm.value))
    const addSub = this.authService.login(oForm.value).subscribe((loginRes) => {
      if(loginRes['status'] === 'success'){
        this.authService.getProfile().subscribe((res) => {
          const userdata = res['data']['user'];
          if(userdata['role'] == 'admin'){
            this.router.navigateByUrl(`/userdashboard/${userdata['user_id']}`);
          }
          else{
            this.displaymsg = 'YOU MUST BE AN ADMIN TO ACCESS THIS FEATURE'
          }
        })

        this.hasError = false;
        this.authService.authToken = loginRes['data']!['token'];
        this.authService.saveAuthToken();
        this.authService.getCurrentUser(() => {
          this.authService.loginState = true;
        });
        // this.router.navigateByUrl(`/userdashboard/`);
        
      }else{
        this.hasError = true;
        this.errMsg = loginRes['message'];
        this.authService.loginState = false;
        this.router.navigateByUrl('/register');
      }
    })
  }
}
