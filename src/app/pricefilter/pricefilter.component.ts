import { Component, ElementRef, OnInit } from '@angular/core';
import { VehiclesService } from '../services/vehicles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pricefilter',
  templateUrl: './pricefilter.component.html',
  styleUrl: './pricefilter.component.css'
})
export class PricefilterComponent implements OnInit{

  constructor (private vehicleSerice: VehiclesService, 
    private el: ElementRef,
    private route: ActivatedRoute,
   private router: Router ){}


   vehicleHasData:boolean = false;
   vehicles: any = [];
   isError = false;
   pricequery: string = '';

  ngOnInit(): void {
      this.populate();
  }

  populate(){
    this.pricequery = this.route.snapshot.params['price'];
    const vehicleSub = this.vehicleSerice.priceSearchVehicles(this.pricequery).subscribe(res =>{
      if(res['status'] == 'success'){
        this.vehicles = res['data']['pricesearch'];
        this.vehicleHasData = true;
      }else{
        this.vehicleHasData = false;
      }
    });
  
}

}
