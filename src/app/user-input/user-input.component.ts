import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChatStateService } from '../chat-state.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  userId: string = '';

  constructor(private socket: Socket, private chatStateService: ChatStateService) {}

  registerUser() {
    console.log('registerUser() called with userId:', this.userId);
    // Generate a dummy session ID
    const sessionId = Math.random().toString(36).substr(2, 9);
    this.chatStateService.setSessionId(sessionId);
    this.socket.emit('create_session', { user: this.userId, session_id: sessionId });
    // Proceed to start the chat and retrieve history
    this.socket.fromEvent('create_session').subscribe((response) => {
      console.log('Received create_session response:', response);
      this.chatStateService.setUserId(this.userId);
      this.chatStateService.startChat();
    });
  }
}
