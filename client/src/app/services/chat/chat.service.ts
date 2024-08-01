import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Chat } from './chat';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = `${environment.apiUrl}/chats`;

  constructor(private http: HttpClient) {}

  getAllChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseUrl);
  }

  createChat(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>(this.baseUrl, chat);
  }

  updateChat(id: number, chat: Chat): Observable<Chat> {
    return this.http.put<Chat>(`${this.baseUrl}/${id}`, chat);
  }

  deleteChat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Method to get messages by groupId
  getMessagesByGroupId(groupId: string): Observable<any> {
    const url = `${this.baseUrl}/group/${groupId}`;
    return this.http.get<any>(url);
  }
}
