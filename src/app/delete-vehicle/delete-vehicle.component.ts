import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiclesService } from '../services/vehicles.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
  styleUrl: './delete-vehicle.component.css'
})
export class DeleteVehicleComponent implements OnInit{

  constructor(private vehicleService: VehiclesService,
              private userService: UserServiceService, 
              private router: Router,
              private route: ActivatedRoute ){}

  vehicle: any = [];
  id: number = 0;

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      if(this.id > 0){
       this.vehicle =  this.vehicleService.getOneVehicle(this.id).subscribe(res => {
          if(res['status']=='success'){
                const vehicleData = res!['data']!['vehicle'];
                this.vehicle = vehicleData;

                this.vehicleForm?.setValue({
                  make: vehicleData['make'],
                  model: vehicleData['model'],
                  price: vehicleData['price'],
                  minimum_rentdays: vehicleData['minimum_rentdays'],
                  description: vehicleData['description'],
                  category: vehicleData['category']
                });
          }
        })
      }
  }

  @ViewChild('vehicleForm')vehicleForm?:NgForm;

  deleteVehicle(oForm:NgForm){

    this.id = this.route.snapshot.params['id'];

    this.vehicle = this.vehicleService.getOneVehicle(this.id).subscribe((res =>{
    }))


    if(this.vehicle['current_renter'] == 'none'){
      this.vehicleService.deleteVehicle(this.id).subscribe(res => {
        if(res['status'] == 'success'){
          (<any>this.router).navigateByUrl('/admindashboard')
        }
      })
    }
    else{
      this.vehicleService.deleteVehicle(this.id).subscribe(res => {
        if(res['status']=='success'){
          this.userService.userCarDelete(this.id, oForm.value).subscribe((res) =>{
            if(res['status'] == 'success'){
              (<any>this.router).navigateByUrl('/admindashboard')
            }
        })
        }
      })
    }
    }
  }



