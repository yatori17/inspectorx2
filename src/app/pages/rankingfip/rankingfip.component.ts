import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rankingfip',
  templateUrl: './rankingfip.component.html',
  styleUrls: ['./rankingfip.component.scss']
})
export class RankingfipComponent implements OnInit {
  conjunto: Array<string> = ["Alo", "Oi", "Bomdia", "Como vai", "e ai"]
  inspetores: Array<string> = ["Juarez", "Peçanha", "Silvester"]

  constructor() { }

  ngOnInit() {
  }

}
