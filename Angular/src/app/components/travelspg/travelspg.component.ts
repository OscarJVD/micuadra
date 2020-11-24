import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

import { NgForm } from '@angular/forms'; // Facilita obtener el value de los inputs

// Importamos Proveedores
import { TravelService } from '../../services/travel.service';
import { Travel } from 'src/app/models/travel';

@Component({
  selector: 'app-travelspg',
  templateUrl: './travelspg.component.html',
  styleUrls: ['./travelspg.component.css'],
  providers: [TravelService]
})

export class TravelspgComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller, public travelService: TravelService) { }

  ngOnInit(): void {
    this.getPremiumTravels();
    this.getCheapTravels();
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  scrTop(){
    window.scrollTo(0, 0);
  }

  getPremiumTravels(){
    this.travelService.getPremiumTravels().subscribe(res => this.travelService.premium = res as Travel[])
  }

  getCheapTravels(){
    this.travelService.getCheapTravels().subscribe(res => this.travelService.cheap = res as Travel[])
  }

   // Buscador
  //  getTravelsByPlaceName(){ // Con esto se hace lo de abajo
  //   var value = (<HTMLInputElement>document.getElementById("search")).value;

  //   if(value != ''){
  //     var key_to_find = value;
  //     var filtered_e = this.travelService.travel.filter(el => {
  //       return el.placeName.toUpperCase().includes(key_to_find.toUpperCase());
  //     })
  //     this.travelService.travel = filtered_e as Travel[];
  //   }else {
  //     this.getTravels();
  //     this.getArchivedTravels();
  //     this.getDeletedTravels();
  //   }

  //   // console.log(value);
  // }
}
