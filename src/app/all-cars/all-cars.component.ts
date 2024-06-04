import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VehiclesService } from '../services/vehicles.service';
import { Directive, HostListener, ElementRef  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrl: './all-cars.component.css'
})
export class AllCarsComponent implements OnInit, OnDestroy{

  constructor (private vehicleSerice: VehiclesService, 
               private el: ElementRef,
               private route: ActivatedRoute,
               private router: Router){}

  ngOnInit(): void {
      this.populate();
      
  }

  ngOnDestroy(): void {
      
  }

  categoryform:boolean = false;
  priceform:boolean = false;
  makeform:boolean = false;



  showFilterForm(value: number){

    if(value == 1){
      this.categoryform = false;
      this.priceform = false;
      this.makeform = true;
    }
    if(value == 2){
      this.categoryform = false;
      this.priceform = true;
      this.makeform = false;
    }
    if(value == 3){
      this.categoryform = true;
      this.priceform = false;
      this.makeform = false;
    }    
  }

  vehicles: any = [];
  catsearch: any = [];
  makesearch: any = [];
  isError: boolean = false;

  populate(){
    const vehicleSub = this.vehicleSerice.getAllVehicles().subscribe(res =>{
      if(res['status'] == 'success'){
        this.vehicles = res['data']['vehicles'];
      }else{
        this.isError = true;
      }
    });
  }


  categorySearch(oForm: NgForm){
      
    let formResult:any;
  
    const formVals = (oForm.value);
  
        let entries = Object.entries(formVals);
        let keys = Object.keys(formVals);
        let values = Object.values(formVals);
        
        for(let i = 0; i < entries.length; i++){
          if(values[i] == true){
            formResult = keys[i];
            console.log('You Searched for: ' + formResult);
            const categorysearchresults = this.vehicleSerice.categorySearchVehicles(formResult).subscribe(res =>{
              if(res['status'] == 'success'){
                this.vehicles = res['data']['catsearch'];
                this.router.navigateByUrl(`/search-by-category/${formResult}`);
              }
            })
            break;
          }
        }  
      }


vehicleSearch(oForm: NgForm){

  let formResult:any;

  const formVals = (oForm.value);

      let entries = Object.entries(formVals);
      let keys = Object.keys(formVals);
      let values = Object.values(formVals);

      for(let i = 0; i < entries.length; i++){
        if(values[i] == true){
          formResult = keys[i];
          console.log('You Searched for: ' + formResult);

          const makesearchresults = this.vehicleSerice.makeSearchVehicles(formResult).subscribe(res =>{
            if(res['status'] == 'success'){
              this.makesearch = res['data']['makesearch'];
              this.router.navigateByUrl(`/search-by-make/${formResult}`);           
             }
          })
          break;
        }
      }  
    }


    priceSearch(oForm: NgForm){

      let formResult:any;

      const formVals = (oForm.value);

      let entries = Object.entries(formVals);
      let keys = Object.keys(formVals);
      let values = Object.values(formVals);

      for(let i = 0; i < entries.length; i++){
        if(values[i] == true){
          formResult = keys[i];
          console.log('You Searched for: ' + formResult + 'to' + (formResult-10000));

          const makesearchresults = this.vehicleSerice.priceSearchVehicles(formResult).subscribe(res =>{
            if(res['status'] == 'success'){
              this.makesearch = res['data']['makesearch'];
              this.router.navigateByUrl(`/search-by-price/${formResult}`); 
            }
          })
          break;
        }
      }  




    }


}






