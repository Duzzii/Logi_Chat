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
      console.log('Group Code:', code);
      this.groupCode = code;
      this.loadMessages();
    });

    this.chatService.messages$.subscribe(chats => {
      this.messages = chats;
    });
  }

  loadMessages() {
    this.chatService.getMessagesByGroupId(this.groupCode).subscribe();
  }

  sendMessage() {
    if (this.messageContent.trim()) {
      const newMessage: Chat = {
        sender: this.groupName,
        content: this.messageContent,
        groupCode: this.groupCode,
        timestamp: new Date()
      };
      this.chatService.createChat(newMessage).subscribe(chat => {
        this.messageContent = '';
      });
    }
  }

  editMessage(chat: Chat) {
    this.messageContent = chat.content;
    this.editMode = true;
    this.editMessageId = chat.id;
  }

  deleteMessage(id: number) {
    this.chatService.deleteChat(id).subscribe();
  }
}
