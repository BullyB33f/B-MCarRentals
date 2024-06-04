import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {formatDate} from '@angular/common';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(270deg)'})),
      state('rotated', style({ transform: 'rotate(450deg)'}))
    ])
  ]
})
export class UserDashboardComponent implements OnInit{

  constructor(private userService: UserServiceService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService){}

  ngOnInit():void{
    this.loadData();
  }


  currentdate =  formatDate(new Date(), 'yyyy-MM-dd', 'en');


  viewform:boolean = false;
  state: string = 'default';
  

  showform(){
    this.viewform = !this.viewform;
    
    this.state = (this.state === 'default' ? 'rotated':'default')

  }

  id: number = 0;
user_id: number = 0;
overdue: boolean = false;

  user:any = [];
  hasData: boolean = false;

  vehiclehasData: boolean = false;
  vehicleData:any = [];
  hasError: boolean = false;


  logOutFunc(){
    // this.authService.logout();
  }

  loadData(){
    this.id = this.route.snapshot.params['id'];
    const userData = this.userService.oneUser(this.id).subscribe(res => {
      if(res['status'] !== 'error'){
        this.user = res['data']['user'];
        this.hasData = true;

        if(this.user['current_vehicle_id'] != 'none'){
          this.user_id = this.route.snapshot.params['id'];
          this.userService.getUserVehicle(this.user_id).subscribe(res => {
            if(res['status'] !== 'error'){
              this.vehicleData = res!['data']!['uservehicle'];
              this.vehiclehasData = true;
              if(this.vehicleData['rent_end'] <= this.currentdate ){
                this.overdue = true;
              }
            }
          })
        }
        else{
          this.vehiclehasData = false;
        }

      }
    })
  }


}



