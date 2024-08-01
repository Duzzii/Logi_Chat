import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { WebSocketService } from 'src/app/services/WebSocketService/web-socket-service.service';
import { Chat } from 'src/app/services/chat/chat';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = `${environment.apiUrl}/chats`;
  private messagesSubject: BehaviorSubject<Chat[]> = new BehaviorSubject<Chat[]>([]);
  public messages$: Observable<Chat[]> = this.messagesSubject.asObservable();

  constructor(private http: HttpClient, private webSocketService: WebSocketService) {
    this.webSocketService.messagesSubject.subscribe(newMessage => {
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, newMessage]);
    });
  }

  getAllChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseUrl);
  }

  createChat(chat: Chat): Observable<Chat> {
    return new Observable<Chat>(observer => {
      this.webSocketService.sendMessage(chat);
      observer.next(chat);
      observer.complete();
    });
  }

  updateChat(id: number, chat: Chat): Observable<Chat> {
    return this.http.put<Chat>(`${this.baseUrl}/${id}`, chat).pipe(
      tap(updatedChat => {
        const currentMessages = this.messagesSubject.value;
        const index = currentMessages.findIndex(msg => msg.id === id);
        if (index !== -1) {
          currentMessages[index] = updatedChat;
          this.messagesSubject.next([...currentMessages]);
        }
      })
    );
  }

  deleteChat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const currentMessages = this.messagesSubject.value;
        this.messagesSubject.next(currentMessages.filter(msg => msg.id !== id));
      })
    );
  }

  getMessagesByGroupId(groupId: string): Observable<Chat[]> {
    const url = `${this.baseUrl}/group/${groupId}`;
    return this.http.get<Chat[]>(url).pipe(
      tap(chats => {
        this.messagesSubject.next(chats);
      })
    );
  }
}
