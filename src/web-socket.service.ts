import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { WebSocketServiceConfig } from './web-socket-service-config';

@Injectable()
export class WebSocketService {
  private ws: WebSocket;
  wsObservable: Observable<any>;

  constructor(config: WebSocketServiceConfig) {
    this.wsObservable = Observable.create((observer: any) => {
      this.ws = new WebSocket(config.websocket_url);
 
      this.ws.onopen = (event) => {
      };
 
      this.ws.onclose = (event) => {
        if (event.wasClean) {
          observer.complete();
        } else {
          observer.error(event);
        }
      };
 
      this.ws.onerror = (event) => {
        observer.error(event);
      }
 
      this.ws.onmessage = (event) => {
        observer.next(event.data);
      }
 
      return () => {
        this.ws.close();
      };
    }).share();
  }

  sendData(message: Object): void {
    this.ws.send(message);
  }
}
