import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{


  constructor(private authService: AuthService,
              private router: Router){}

  ngOnInit(): void {
      
  }

  registerUser(oForm: NgForm){

    const addSub = this.authService.registerUser(oForm.value).subscribe((res) => {
      if(res['status'] == 'success'){
        this.router.navigateByUrl('/login');
      }
    })
  }

}
