import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  isEmpty:boolean = true;
  adminStatus: boolean = false;
  userStatus: boolean = false;

  tokenItem: any = localStorage.getItem('tokenKey');
 

  constructor(private authService: AuthService,
    private router: Router){}
  

  userdata: any = [];

  ngOnInit(): void {
     this.profileDisplay();
  }

  profileDisplay(){

    

    this.authService.getProfile().subscribe((res) => {
      if(res['status'] == 'success'){
        this.userdata = res['data']['user'];
        this.isEmpty = false;
        
        if(this.userdata['role'] == 'user'){
          this.userStatus = true;
          this.adminStatus = false;
        }
        else if(this.userdata['role'] == 'admin'){
          this.userStatus = false;
          this.adminStatus = true;
        }
      }
    })

  }
}
