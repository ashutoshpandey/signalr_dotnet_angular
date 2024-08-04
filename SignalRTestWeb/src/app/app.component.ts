import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalRService } from '../services/signalr-serv';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public user: string;
  public message: string;
  messages: string[] = [];
  private signalRSubscription: Subscription | null = null; // Default value

  constructor(private signalRService: SignalRService) {
    this.user = '';
    this.message = '';
  }

  ngOnInit(): void {
    this.signalRSubscription = this.signalRService.signalPush$.subscribe({
      next: (data: string) => {
        this.messages.push(data);
        // Trigger change detection if necessary
      },
      error: (error) => console.error(error),
      complete: () => console.log('Completed')
    });
  }

  sendMessage() {
    this.signalRService.sendMessage(this.user, this.message);
  }

  ngOnDestroy(): void {
    if (this.signalRSubscription) {
      this.signalRSubscription.unsubscribe();
    }
  }
}
