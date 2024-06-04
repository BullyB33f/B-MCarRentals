import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiclesService } from '../services/vehicles.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.css'
})
export class EditVehicleComponent implements OnInit{


  constructor(private vehicleService: VehiclesService, 
              private userService: UserServiceService,
    private router: Router,
  private route: ActivatedRoute){}

  id: number = 0;
  vehicle: any = [];
  hasData: boolean = false;
  hasError: boolean = false;


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if(this.id > 0){
      this.vehicle = this.vehicleService.getOneVehicle(this.id).subscribe(res => {
        if(res['status'] == 'success'){
          const vehData = res!['data']!['vehicle'];
          this.vehicle = vehData;
  
          this.vehicleForm?.setValue({
            make: this.vehicle['make'],
            model: vehData['model'],
            price: vehData['price'],
            minimum_rentdays:vehData['minimum_rentdays'],
            category: vehData['description'],
            rent_status: vehData['rent_status'],
            current_renter: vehData['current_renter'],
            user_id: vehData['user_id']
          })
        }
      })
    }
   
   




  }
  @ViewChild('vehicleForm') vehicleForm?:NgForm;

  

  updateVehicle(oForm: NgForm){
    this.vehicleService.editVehicle(this.id, oForm.value) .subscribe((res) => {
      
      if(res['status']=='success'){
        this.userService.userRentVehicle(this.id, oForm.value).subscribe((res) =>{
          if(res['status'] == 'success'){
            (<any>this.router).navigateByUrl('/admindashboard')
          }
      })
      }
    })
  }
  
}
