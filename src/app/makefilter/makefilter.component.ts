import { Component, ElementRef, OnInit } from '@angular/core';
import { VehiclesService } from '../services/vehicles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-makefilter',
  templateUrl: './makefilter.component.html',
  styleUrl: './makefilter.component.css'
})
export class MakefilterComponent  implements OnInit{


  constructor (private vehicleSerice: VehiclesService, 
    private el: ElementRef,
    private route: ActivatedRoute,
   private router: Router ){}


   vehicles: any = [];
   isError = false;
   vehicleHasData: boolean = false;
   makequery: string = '';

  ngOnInit(): void {
      this.populate();
  }

  populate(){
    this.makequery = this.route.snapshot.params['make'];
    const vehicleSub = this.vehicleSerice.makeSearchVehicles(this.makequery).subscribe(res =>{
      if(res['status'] == 'success'){
        this.vehicles = res['data']['makesearch'];
        this.vehicleHasData = true;
      }else{
        this.vehicleHasData = false;
      }
    });
  
}

}
