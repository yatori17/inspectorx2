import { Component, OnInit, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { AuthService } from '../auth/auth.service';
import { Subscribable, Subscription } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() Partida: string;
  message: {content: string, user: string} = {content: '',user: ''};
  messages: {username: string, text: string, time: string}[] = [];
  UserSub : Subscription;
  Status: Subscription
  users: any[]=[];
  show: boolean = false;

  constructor(private chat: ChatService, private auth: AuthService) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.Partida.currentValue != changes.Partida.previousValue && !changes.Partida.firstChange){
      this.setUser();
    }
}
  ngOnDestroy(){
    if(this.UserSub)this.UserSub.unsubscribe();
    if(this.Status) this.Status.unsubscribe();
  }
  ngOnInit() {
    console.log(this.Partida);

    this.setUser();
    this.UserSub = this.chat.getMessages()
    .subscribe((message)=>{
      this.messages.push(message);
      console.log(message)
    });
    this.Status = this.chat.getStatus().subscribe((status)=>{
      this.users.push(status);
    });
  }


  sendMessage(){

    this.chat.sendMessage(this.message.content);
    this.message.content = '';
  }

  setUser(){
    this.messages = [];
    this.users=[];
    this.chat.joinChat({username: this.auth.userProfile.name, room: this.Partida});
  }
  public hide(){

    this.show= !this.show;
  }

}
