import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalRService } from '../services/signalr-serv';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  user = '';
  message = '';
  messages: { user: string, message: string }[] = [];

  constructor(private signalRService: SignalRService) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addDataListener();
  }

  sendMessage() {
    this.signalRService.sendMessage(this.user, this.message);
    this.messages.push({ user: this.user, message: this.message });
    this.message = '';
  }
}
