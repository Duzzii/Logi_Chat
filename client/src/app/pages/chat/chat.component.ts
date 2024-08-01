import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/services/chat/chat';
import { ChatService } from 'src/app/services/chat/chat.service';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: Chat[] = [];
  messageContent = '';
  groupName!: string;
  groupCode!: any;
  editMode = false;
  editMessageId?: number;

  constructor(private chatService: ChatService, private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.currentGroupName.subscribe(name => this.groupName = name);
    this.groupService.currentGroupCode.subscribe(code => {
      this.groupCode = code;
      this.loadMessages();
    });
  }

  loadMessages() {
    this.chatService.getMessagesByGroupId(this.groupCode).subscribe(chats => {
      this.messages = chats;
    });
  }

  sendMessage() {
    if (this.messageContent.trim()) {
      if (this.editMode && this.editMessageId != null) {
        const updatedMessage: Chat = {
          id: this.editMessageId,
          sender: this.groupName,
          content: this.messageContent,
          timestamp: new Date()
        };
        this.chatService.updateChat(this.editMessageId, updatedMessage).subscribe(chat => {
          const index = this.messages.findIndex(msg => msg.id === this.editMessageId);
          if (index !== -1) {
            this.messages[index] = chat;
          }
          this.messageContent = '';
          this.editMode = false;
          this.editMessageId = undefined;
        });
      } else {
        const newMessage: Chat = {
          sender: this.groupName,
          content: this.messageContent,
          timestamp: new Date()
        };
        this.chatService.createChat(newMessage).subscribe(chat => {
          this.messages.push(chat);
          this.messageContent = '';
        });
      }
    }
  }

  editMessage(chat: Chat) {
    this.messageContent = chat.content;
    this.editMode = true;
    this.editMessageId = chat.id;
  }

  deleteMessage(id: number) {
    this.chatService.deleteChat(id).subscribe(() => {
      this.messages = this.messages.filter(msg => msg.id !== id);
    });
  }
}
