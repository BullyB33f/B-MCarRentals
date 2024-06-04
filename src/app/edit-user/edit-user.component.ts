import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { VehiclesService } from '../services/vehicles.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {

  constructor(private userService: UserServiceService,
              private vehicleService: VehiclesService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService){}


  id: number = 0;
  user: any;
  hasData: boolean = false;
  userdata:any = [];
  adminStatus:boolean = false;

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      if(this.id > 0){
        this.userService.oneUser(this.id).subscribe(res => {
          if(res['status'] == 'success'){
            const userData = res!['data']!['user'];

            this.editUserForm?.setValue({
              fullname: userData['user_fullname'],
              age: userData['user_age'],
              driverno: userData['drivers_license_number'],
              trn: userData['trn'],
              email: userData['trn'],
              password: userData['user_password'],
              vehicle_id: userData['current_vehicle_id'],
              role: userData['role']
            })
          }
        })
      }



      this.authService.getProfile().subscribe((res) => {
        if(res['status'] == 'success'){
          this.userdata = res['data']['user'];
           if(this.userdata['role'] == 'admin'){
            this.adminStatus = true;
          }
        }
      })
  }
  @ViewChild('editUserForm') editUserForm?:NgForm;


  updateUser(oForm: NgForm){
    this.userService.editUser(this.id, oForm.value).subscribe((res) => {

      if(res['status'] == 'success'){
        this.vehicleService.updateRental(oForm.value).subscribe((res) => {
          if(res['status'] == 'success'){
            (this.router).navigateByUrl('/login')
          }
        })
      }
    })
  }
}
