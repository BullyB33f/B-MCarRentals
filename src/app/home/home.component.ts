import { Component } from '@angular/core';
import { VehiclesService } from '../services/vehicles.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private vehicleService: VehiclesService,
    private route: ActivatedRoute){}

ngOnInit(): void{

}



}
