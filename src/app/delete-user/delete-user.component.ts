import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesService } from '../services/vehicles.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent implements OnInit{


  constructor(private userService: UserServiceService,
    private vehicleService: VehiclesService,
    private router: Router,
    private route: ActivatedRoute){}


    id: number = 0;
    user: any;
    vehicle: any;
    hasData: boolean = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id > 0){
      this.userService.oneUser(this.id).subscribe(res => {
        if(res['status'] == 'success'){
          const userData = res!['data']!['user'];

          this.deleteUserForm?.setValue({
            fullname: userData['user_fullname'],
            age: userData['user_age'],
            driverno: userData['drivers_license_number'],
            trn: userData['trn'],
            email: userData['trn'],
            password: userData['user_password']
          })
        }
      })
    }
  }
  @ViewChild('deleteUserForm') deleteUserForm?:NgForm;


  deleteUser(oForm: NgForm){

    this.id = this.route.snapshot.params['id'];

    this.user = this.userService.oneUser(this.id).subscribe((res) => {
    })


    if(this.user['current_vehicle_id'] == null || 'none'){
      this.userService.deleteUser(this.id).subscribe((res) => {
        if(res['status'] == 'success'){
          (this.router).navigateByUrl('/login')
        }
      })
    }
    else{
      this.userService.deleteUser(this.id).subscribe((res) => {
        if(res['status'] == 'success'){
          this.vehicleService.carUserGone(this.id, oForm.value).subscribe((res) => {
            if(res['status'] == 'success'){
              (this.router).navigateByUrl('/login')
            }
          })
        }
      })
    }
  }

}
