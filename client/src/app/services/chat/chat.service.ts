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
  // Base URL for the chat API endpoint
  private baseUrl = `${environment.apiUrl}/chats`;

  // A BehaviorSubject to hold and emit the current list of chat messages
  private messagesSubject: BehaviorSubject<Chat[]> = new BehaviorSubject<Chat[]>([]);

  // Observable that components can subscribe to in order to get the current list of chat messages
  public messages$: Observable<Chat[]> = this.messagesSubject.asObservable();

  constructor(private http: HttpClient, private webSocketService: WebSocketService) {
    // Subscribe to WebSocket messages and update the BehaviorSubject with new messages
    this.webSocketService.messagesSubject.subscribe(newMessage => {
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, newMessage]);
    });
  }

  /**
   * Fetches all chat messages from the server.
   * @returns An observable of the list of chat messages.
   */
  getAllChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseUrl);
  }

  /**
   * Creates a new chat message and sends it via WebSocket.
   * @param chat The chat message to create.
   * @returns An observable of the created chat message.
   */
  createChat(chat: Chat): Observable<Chat> {
    return new Observable<Chat>(observer => {
      // Send the chat message through WebSocket
      this.webSocketService.sendMessage(chat);
      // Emit the chat message and complete the observable
      observer.next(chat);
      observer.complete();
    });
  }

  /**
   * Updates an existing chat message on the server.
   * @param id The ID of the chat message to update.
   * @param chat The updated chat message.
   * @returns An observable of the updated chat message.
   */
  updateChat(id: number, chat: Chat): Observable<Chat> {
    return this.http.put<Chat>(`${this.baseUrl}/${id}`, chat).pipe(
      tap(updatedChat => {
        // Update the local list of messages with the updated chat
        const currentMessages = this.messagesSubject.value;
        const index = currentMessages.findIndex(msg => msg.id === id);
        if (index !== -1) {
          currentMessages[index] = updatedChat;
          this.messagesSubject.next([...currentMessages]);
        }
      })
    );
  }

  /**
   * Deletes a chat message from the server.
   * @param id The ID of the chat message to delete.
   * @returns An observable that completes when the chat message is deleted.
   */
  deleteChat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        // Remove the deleted chat message from the local list
        const currentMessages = this.messagesSubject.value;
        this.messagesSubject.next(currentMessages.filter(msg => msg.id !== id));
      })
    );
  }

  /**
   * Fetches chat messages by group ID from the server.
   * @param groupId The ID of the group to fetch messages for.
   * @returns An observable of the list of chat messages for the specified group.
   */
  getMessagesByGroupId(groupId: string): Observable<Chat[]> {
    const url = `${this.baseUrl}/group/${groupId}`;
    return this.http.get<Chat[]>(url).pipe(
      tap(chats => {
        // Update the local list of messages with the fetched chats
        this.messagesSubject.next(chats);
      })
    );
  }

   /**
   * Deletes all chat messages for a specific group from the server.
   * @param groupId The ID of the group whose chat messages will be deleted.
   * @returns An observable that completes when the chat messages are deleted.
   */
   deleteChatsByGroupId(groupId: string): Observable<void> {
    const url = `${this.baseUrl}/group/${groupId}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        // Remove all chat messages for the specified group from the local list
        const currentMessages = this.messagesSubject.value;
        this.messagesSubject.next(currentMessages.filter(msg => msg.groupCode !== groupId));
      })
    );
  }
}
