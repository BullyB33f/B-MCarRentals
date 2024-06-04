import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { SingleCarComponent } from './single-car/single-car.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { DeleteVehicleComponent } from './delete-vehicle/delete-vehicle.component';
import { RentconfirmComponent } from './rentconfirm/rentconfirm.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { authGuard } from './auth/guards/auth.guard';
import { CategoryfilterComponent } from './categoryfilter/categoryfilter.component';
import { MakefilterComponent } from './makefilter/makefilter.component';
import { PricefilterComponent } from './pricefilter/pricefilter.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path: 'home', title: 'HomePage', component: HomeComponent},
  {path: 'allcars', title: 'Fleet', component: AllCarsComponent},
  {path: 'singleCar/:id', title: 'View Vehicle', component: SingleCarComponent},
  {path: 'login', title: 'Login', component: LoginComponent},
  {path: 'search-by-category/:category', title: 'Search Results', component: CategoryfilterComponent},
  {path: 'search-by-make/:make', title: 'Search Results', component: MakefilterComponent},
  {path: 'search-by-price/:price', title: 'Search Results', component: PricefilterComponent},
  {path: 'register', title: 'Register', component: RegisterComponent},  
  {path: 'userdashboard/:id', title: 'User Dashboard', component: UserDashboardComponent, canActivate: [authGuard]},
  {path: 'userdashboard', title: 'User Dashboard', component: UserDashboardComponent, canActivate: [authGuard]},
  {path: 'admindashboard', title: 'Admin Dashboard', component: AdminDashboardComponent, canActivate: [authGuard]},
  {path: 'editvehicle/:id', title: 'Edit Vehicle', component: EditVehicleComponent, canActivate: [authGuard]},
  {path: 'deletevehicle/:id', title: 'Delete Vehicle', component: DeleteVehicleComponent, canActivate: [authGuard]},
  {path: 'rentconfirmed', title: 'Rent Confirmed', component: RentconfirmComponent, canActivate: [authGuard]},
  {path: 'edituser/:id', title: 'Edit User', component: EditUserComponent, canActivate: [authGuard]},
  {path: 'deleteuser/:id', title: 'Delete User', component: DeleteUserComponent, canActivate: [authGuard]},
  {path: 'contact', title: 'Contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
