import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';      //this enable us to fetch a specefic dish from dish service.

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  
  dish: Dish;
  
  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location) {}

  ngOnInit(): void {

    let id = this.route.snapshot.params['id'];    //we fetch a specefic id and pass it as a parameter in getDish(id).
     this.dishservice.getDish(id)
     .then(dish => this.dish = dish);
  }
  
  
   goback(): void{

    this.location.back();
   }

}
