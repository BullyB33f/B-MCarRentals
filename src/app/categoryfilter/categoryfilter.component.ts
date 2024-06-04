import { Component, ElementRef, OnInit } from '@angular/core';
import { VehiclesService } from '../services/vehicles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoryfilter',
  templateUrl: './categoryfilter.component.html',
  styleUrl: './categoryfilter.component.css'
})
export class CategoryfilterComponent implements OnInit{


  constructor (private vehicleSerice: VehiclesService, 
               private el: ElementRef,
               private route: ActivatedRoute,
              private router: Router ){}


  ngOnInit(): void {
      this.populate();
  }

  vehicleHasData:boolean = false;
  vehicles: any = [];
  isError = false;
  catquery: string = '';


  populate(){
      this.catquery = this.route.snapshot.params['category'];
      const vehicleSub = this.vehicleSerice.categorySearchVehicles(this.catquery).subscribe(res =>{
        if(res['status'] == 'success'){
          this.vehicles = res['data']['catsearch']; this.vehicleHasData = true;
        }else{
          this.vehicleHasData = false;
        }
      });
    
  }
}
