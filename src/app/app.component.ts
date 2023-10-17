import { Component, OnInit } from '@angular/core';
import { ChatStateService } from './chat-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chatStarted$: Observable<boolean> = this.chatStateService.chatStarted$;

  constructor(private chatStateService: ChatStateService) {}
  // log the chatStarted$ observable

  ngOnInit() {
    console.log('AppComponent initialized');
    this.chatStarted$.subscribe(state => {
        console.log('Chat state updated:', state);
    });
}

}