import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private signalPushSubject = new Subject<string>();
  private hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder().withUrl('http://localhost:5000/signalhub').build();

  signalPush$ = this.signalPushSubject.asObservable();

  constructor() {
    this.startConnection();
    this.addSignalListeners();
  }

  private startConnection() {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  private addSignalListeners() {
    this.hubConnection.on('SignalPush', (data: string) => {
      this.signalPushSubject.next(data);
    });
  }

  public sendMessage = (user: string, message: string) => {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error(err));
  }
}
