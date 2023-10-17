import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChatStateService } from '../chat-state.service';
interface ChatMessage {
  sender: string;
  content: string;
  // Add other properties if needed
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent {
  chatHistory: any[] = [];
  userMessage!: string;
  chatStarted = false;
  intermediateSteps: string[] = [];

  constructor(private socket: Socket, private chatStateService: ChatStateService) {
    console.log('ChatComponent initialized');
    const userId = this.chatStateService.getUserId();

    // Emit the get_history event to request chat history
    this.socket.emit('get_history', { user: userId });

    this.socket.fromEvent('get_history').subscribe((history: any) => {
      console.log('Received chat history:', history);
      if (Array.isArray(history)) {
        this.chatHistory = history;
      } else if (history.messages && Array.isArray(history.messages)) {
        this.chatHistory = history.messages;
      } else {
        this.chatHistory = [];
      }
    });

    this.socket.fromEvent('send_message').subscribe((response: any) => {
      console.log('Received send message response:', response);
      this.chatHistory.push({
        sender: 'bot',
        content: response.response
      });
      this.userMessage = '';
    });
  }

  sendMessage() {
    console.log('sendMessage() called with message:', this.userMessage);
    const sessionId = this.chatStateService.getSessionId();
    this.chatHistory.push({
      sender: 'user',
      content: this.userMessage
    });
    this.socket.emit('send_message', { session_id: sessionId, query: this.userMessage });
    this.userMessage = '';



  }
}
