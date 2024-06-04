import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { SingleCarComponent } from './single-car/single-car.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HighlightDirective } from './single-car/highlight.directive';
import { DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { DeleteVehicleComponent } from './delete-vehicle/delete-vehicle.component';
import { ContactComponent } from './contact/contact.component';
import { RentconfirmComponent } from './rentconfirm/rentconfirm.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { MakefilterComponent } from './makefilter/makefilter.component';
import { CategoryfilterComponent } from './categoryfilter/categoryfilter.component';
import { PricefilterComponent } from './pricefilter/pricefilter.component';
import { tokenInterceptor } from './utils/token.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AllCarsComponent,
    SingleCarComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    HighlightDirective,
    EditVehicleComponent,
    DeleteVehicleComponent,
    ContactComponent,
    RentconfirmComponent,
    EditUserComponent,
    DeleteUserComponent,
    MakefilterComponent,
    CategoryfilterComponent,
    PricefilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideClientHydration(),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "longDate" }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
