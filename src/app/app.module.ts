import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { UserInputComponent } from './user-input/user-input.component';
import { ChatComponent } from './chat/chat.component';

const config: SocketIoConfig = { url: 'http://localhost:4980', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    UserInputComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
