import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Chat } from 'src/app/services/chat/chat';
import { ChatService } from 'src/app/services/chat/chat.service';
import { GroupService } from 'src/app/services/group/group.service';
import { Router } from '@angular/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  messages: Chat[] = [];
  messageContent = '';
  groupName!: string;
  groupCode!: any;
  editMode = false;
  editMessageId?: number;

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  constructor(
    private chatService: ChatService,
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.groupService.currentGroupName.subscribe(name => {
      this.groupName = name;
      if (this.groupCode) {
        this.loadMessages();
      }
    });

    this.groupService.currentGroupCode.subscribe(code => {
      console.log('Group Code:', code);
      this.groupCode = code;
      if (this.groupName) {
        this.loadMessages();
      }
    });

    // Load persisted group information from local storage
    const storedGroupName = localStorage.getItem('groupName');
    const storedGroupCode = localStorage.getItem('groupCode');
    if (storedGroupName && storedGroupCode) {
      this.groupName = storedGroupName;
      this.groupCode = storedGroupCode;
      this.loadMessages();
    }

    this.chatService.messages$.subscribe(chats => {
      this.messages = chats;
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  loadMessages() {
    if (this.groupCode) {
      this.chatService.getMessagesByGroupId(this.groupCode).subscribe(messages => {
        this.messages = messages;
      });
    }
  }

  sendMessage() {
    if (this.messageContent.trim()) {
      const newMessage: Chat = {
        sender: this.groupName,
        content: this.messageContent,
        groupCode: this.groupCode,
        timestamp: new Date()
      };
      if (this.editMode && this.editMessageId != null) {
        this.chatService.updateChat(this.editMessageId, newMessage).subscribe(chat => {
          const index = this.messages.findIndex(msg => msg.id === this.editMessageId);
          if (index !== -1) {
            this.messages[index] = chat;
          }
          this.editMode = false;
          this.editMessageId = undefined;
          this.messageContent = '';
        });
      } else {
        this.chatService.createChat(newMessage).subscribe(chat => {
          // this.messages.push(chat);
          this.messageContent = '';
          this.scrollToBottom();
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

  leaveChat() {
    // Clear the group information from local storage and navigate to another page
    localStorage.removeItem('groupName');
    localStorage.removeItem('groupCode');
    this.router.navigate(['/home']); // Navigate to home or another appropriate page
  }

  scrollToBottom(): void {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }
}
