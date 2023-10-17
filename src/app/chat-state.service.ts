import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {
  private chatStartedSubject = new BehaviorSubject<boolean>(false);
  chatStarted$ = this.chatStartedSubject.asObservable();

  private sessionIdSubject = new BehaviorSubject<string | null>(null);
 sessionId$ = this.sessionIdSubject.asObservable();

  private userIdSubject = new BehaviorSubject<string | null>(null);
  userId$ = this.userIdSubject.asObservable();

  startChat() {
    console.log('startChat() called in ChatStateService');
    this.chatStartedSubject.next(true);
  }

  setUserId(userId: string) {
    this.userIdSubject.next(userId);
  }

  getUserId() {
    return this.userIdSubject.value;
  }

  setSessionId(sessionId: string) {
    this.sessionIdSubject.next(sessionId);
}

getSessionId() {
    return this.sessionIdSubject.value;
}
}
