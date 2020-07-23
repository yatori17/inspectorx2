import * as io from 'socket.io-client';
import {ENV} from '../core/env.config';
import { Observable } from 'rxjs';


export class ChatService{
  private url = ENV.BASE_URI;
  private socket;

  constructor(){
    this.socket = io(this.url);
    console.log(this.url);
}
public joinChat(data){
  console.log(data);
  this.socket.emit('joinRoom',data);
}
public sendMessage(message){
    this.socket.emit('new-message', message);
}


public getStatus = () => {
    return Observable
    .create((observer) => {
        this.socket.on('roomUsers', (status) => {
            observer.next(status);
        })
    })
}

public getMessages = () =>{
    return Observable.create((observer)=>{
        this.socket.on('new-message', (message) =>{
            observer.next(message);
        })
    })
}
}
