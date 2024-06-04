import { Component, OnInit, ViewChild} from '@angular/core';
import { VehiclesService } from '../services/vehicles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-single-car',
  templateUrl: './single-car.component.html',
  styleUrl: './single-car.component.css'
})
export class SingleCarComponent implements OnInit{

  constructor(private vehicleService: VehiclesService,
              private userService: UserServiceService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService){}

  ngOnInit(): void{
    this.loadData();
    this.showRentBtn();
  }

  id: number = 0;
  vehicle:any = [];
  hasData: boolean = false;
  hidebtn: boolean = false;
  showform: boolean = false;
  userdata: any = [];

  displayMsg: boolean = true;


  showRentForm(){
    this.showform = true;    
  }

  showRentBtn(){
    this.authService.getProfile().subscribe((res) => {
      if(res['status'] == 'success'){
        this.userdata = res['data']['user'];
        this.displayMsg = false;
        // this.showform = true;
      }
    })

    
  }




  loadData(){
    this.id = this.route.snapshot.params['id'];
    const vehicleData = this.vehicleService.getOneVehicle(this.id).subscribe(res => {
      if(res['status'] !== 'error'){
        this.vehicle = res['data']['vehicle'];
        this.hasData = true;
      }
    })
  }


  rentVehicle(oForm: NgForm){
    this.vehicleService.rentVehicle(this.id, oForm.value).subscribe((res) => {
      if(res['status']=='success'){
        this.userService.userRentVehicle(this.id, oForm.value).subscribe((res) =>{
            if(res['status'] == 'success'){
              (<any>this.router).navigateByUrl('/rentconfirmed')
            }
        })
        // (<any>this.router).navigateByUrl('/home')
      }
    })
  }


  
}
