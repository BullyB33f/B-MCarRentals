import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { VehiclesService } from '../services/vehicles.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(270deg)'})),
      state('rotated', style({ transform: 'rotate(450deg)'}))
    ])
  ]
})
export class AdminDashboardComponent implements OnInit{


  constructor(private vehicleService: VehiclesService, 
              private router: Router,
              private userService: UserServiceService,
              private authService: AuthService){}

  ngOnInit(): void {
      this.populateVehicles();
      this.populateUsers();
  }

  logOutFunc(){
    // this.authService.logout();
  }

  currentdate = new Date(); 

  addvehiclepage:     boolean = false;
  homepage:           boolean = true;
  allvehiclepage:     boolean = false;
  alluserpage:        boolean = false;
  switches: any = [this.addvehiclepage, this.homepage, this.alluserpage, this.allvehiclepage];
  switches2: any = ['addvehiclepage','homepage', 'alluserpage', 'allvehiclepage'];
  i:number = 0;
  state: string = 'default';
  

  showform(val1:any){
    if(val1 == '1'){
      this.addvehiclepage = true;
      this.homepage = false;
      this.alluserpage = false;
      this.allvehiclepage = false;
    }else if(val1 == '3'){
      this.addvehiclepage = false;
      this.homepage = false;
      this.alluserpage = true;
      this.allvehiclepage = false;
    }else if(val1 == '2'){
      this.addvehiclepage = false;
      this.homepage = false;
      this.alluserpage = false;
      this.allvehiclepage = true;
    }
  }


  vehicles: any = [];
  users:any = [];
  isError: boolean = false;
  userError: boolean = false;


  populateVehicles(){
    const vehicleSub = this.vehicleService.getAllVehicles().subscribe(res =>{
      if(res['status'] == 'success'){
        this.vehicles = res['data']['vehicles'];
      }else{
        this.isError = true;
      }
    });
  }

  populateUsers(){
    const userSub = this.userService.allUsers().subscribe(res => {
      if(res['status'] == 'success'){
        this.users = res['data']['users'];
      }else{
        this.userError = true;
      }
    })
  }




  saveVehicle(oForm: HTMLFormElement){

    const form = new FormData(oForm)
        const addSub = this.vehicleService.createVehicle(form).subscribe((res) =>{
          if(res['status'] == 'success'){
              this.router.navigateByUrl('/allcars');
          }
        })
      }
    }


//   saveVehicle(oForm: NgForm){

//     const addSub = this.vehicleService.createVehicle(oForm.value).subscribe((res) =>{
//       if(res['status'] == 'sucess'){
//           this.router.navigateByUrl('/allcars');
//       }
//     })
//   }
// }

// submitForm(form: HTMLFormElement){
//   cons
// }
