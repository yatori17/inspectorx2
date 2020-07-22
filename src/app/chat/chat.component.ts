import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private chat: ChatService, private auth: AuthService) { }
  ngOnInit() {
  }

}
