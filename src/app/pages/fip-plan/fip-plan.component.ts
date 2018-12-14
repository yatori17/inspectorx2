import { Component, OnInit } from '@angular/core';
import { DbhelpService } from './../../service/dbhelp.service';


@Component({
  selector: 'app-fip-plan',
  templateUrl: './fip-plan.component.html',
  styleUrls: ['./fip-plan.component.scss'],
  providers: [DbhelpService]
})

export class FipPlanComponent implements OnInit {
  ListuserList: any;
  ArtefatoList: any;
  PartfipList: any;


 constructor(private dbhelp: DbhelpService) { }
  ngOnInit() {
    this.dbhelp._getListuser().then(res =>{
      this.ListuserList = res;
    })

    this.dbhelp._getArtefato().then(res => {
      this.ArtefatoList = res;
    });

    this.dbhelp._getPartfip().then(res => {
      this.PartfipList = res;
    });
  }
}
