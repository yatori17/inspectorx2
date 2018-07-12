import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fip-plan',
  templateUrl: './fip-plan.component.html',
  styleUrls: ['./fip-plan.component.scss']
})
export class FipPlanComponent implements OnInit {
	difValue: number;
	myBool: boolean

  constructor() { }

  ngOnInit() {
  }

  	clickAtivo(value: number){
  		this.difValue = value;
  		console.log("clickAtivo: "+ this.difValue);
  	}

  /*calculateClasses(option: number){
    	console.log("calculateclasses: " + option)
    	if (option == this.difValue){
    		this.myBool = true;
    	}
    	else { this.myBool = false; }

  	return 
  			style;
  	}*/


}
