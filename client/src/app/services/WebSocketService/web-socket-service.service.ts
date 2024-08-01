import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client!: Client;
  public messagesSubject: Subject<any> = new Subject<any>();
  private isConnected: boolean = false;
  private messageQueue: any[] = [];

  constructor() {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.client = new Client({
      webSocketFactory: () => socket as any, // Use SockJS instance
      connectHeaders: {},
      debug: (str) => {
        console.log(new Date(), str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.isConnected = true;
      this.subscribeToMessages();

      // Send any queued messages
      while (this.messageQueue.length > 0) {
        const msg = this.messageQueue.shift();
        this.client.publish(msg);
      }
    };

    this.client.onDisconnect = () => {
      this.isConnected = false;
    };

    this.client.activate();
  }

  private subscribeToMessages() {
    this.client.subscribe('/topic/messages', (message: Message) => {
      this.messagesSubject.next(JSON.parse(message.body));
    });
  }

  sendMessage(message: any) {
    const msg = { destination: '/app/chat', body: JSON.stringify(message) };
    if (this.isConnected) {
      this.client.publish(msg);
    } else {
      this.messageQueue.push(msg);
    }
  }
}
