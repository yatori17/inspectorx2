import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fullinspec',
  templateUrl: './fullinspec.component.html',
  styleUrls: ['./fullinspec.component.scss']
})
export class FullinspecComponent implements OnInit {
  modinspbool: boolean;
  


  constructor() { }

  ngOnInit() {
  	this.modinspbool = true;
  }

  public moderadorAtivo(){
  	console.log("moderador Ativo");
  	this.modinspbool = true;
  }

  public inspetorAtivo(){
  	console.log("inspetor Ativo");
  	this.modinspbool = false;
  }

  calculateClasses(){
  	return {
  		btn: true,
  		'btn-secondary': true,
  		'active': this.modinspbool
  };
  	}

  	  calculateClasses2(){
  	return {
  		btn: true,
  		'btn-secondary': true,
  		'active': !this.modinspbool
  };
  	}

  
}


