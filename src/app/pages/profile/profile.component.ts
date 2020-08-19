import { Component, OnInit } from '@angular/core';
import { DbhelpService } from '../../service/dbhelp.service';
import { AuthService } from '../../auth/auth.service';
import { ListuserModel } from '../../core/models/listuser.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  User: ListuserModel;
  loaded: boolean = false;
  name: string='dadsa';

  constructor(private db: DbhelpService,
              private auth: AuthService,
              private modalService: NgbModal  
      ) { }



  ngOnInit() {
    this.db._getUserById(this.auth.userProfile.sub).then(res=>{
      this.User = this.db.ListuserModelo;
      this.loaded = true;
    })
  }
  updateProfile(){
    if(this.name.length > 0){
      this.User.title = this.name;
      this.db._editUserById(this.User._id, this.User)
    }
  }

  open(content) {
    this.modalService.open(content);
    this.name = this.User.title;
  }


}
