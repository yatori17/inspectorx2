import { Component, OnInit } from '@angular/core';
import { DbhelpService } from '../service/dbhelp.service';
import { ListuserModel } from '../core/models/listuser.model';
import {faTrophy} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  users: ListuserModel[]=[];
  Trophy= faTrophy;

  constructor(private dbservice: DbhelpService) { }

  ngOnInit() {
    this.dbservice._getListuser().then(res=>{
      this.users = this.dbservice.ListuserList;
    });
  }

}
