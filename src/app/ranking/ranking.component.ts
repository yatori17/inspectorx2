import { Component, OnInit } from '@angular/core';
import { DbhelpService } from '../service/dbhelp.service';
import { ListuserModel } from '../core/models/listuser.model';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  users: ListuserModel[]=[];


  constructor(private dbservice: DbhelpService) { }

  ngOnInit() {
    this.dbservice._getListuser().then(res=>{
      this.users = this.dbservice.ListuserList;
      this.users.sort(function(a,b){
        if(a.xp > b.xp) return -1;
        else if(a.xp < b.xp) return 1;
        else return 0;
      })
    });
  }


}
