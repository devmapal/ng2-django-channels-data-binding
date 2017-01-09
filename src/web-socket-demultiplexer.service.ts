import { EventEmitter, Injectable } from '@angular/core';

import { WebSocketDemultiplexerCallback } from './web-socket-demultiplexer-callback';
import { WebSocketService } from './web-socket.service';
import { WebSocketStream } from './web-socket-stream';

@Injectable()
export class WebSocketDemultiplexerService {
  private eventByStream: Map<string, EventEmitter<Object>>;
  private webSocketService: WebSocketService;

  constructor(webSocketService: WebSocketService) {
    this.webSocketService = webSocketService;
    this.webSocketService.getDataStream().subscribe(
      (message)=> {
        this.onmessage(JSON.parse(message));
      },
      (message)=> {
        console.log("error", message);
      },
      ()=> {
        console.log("complete");
      }
    );

    this.eventByStream = new Map<string, EventEmitter<Object>>();
  }

  private onmessage(data: WebSocketStream): void {
    if(!this.eventByStream.has(data.stream)) {
      // No one is subscribed to this stream, ignore
      return
    }

    let eventEmitter = this.eventByStream.get(data.stream);
    eventEmitter.emit(data.payload);
  }

  sendData(stream: string, payload: Object): void {
    this.webSocketService.sendData(JSON.stringify({
      'stream': stream,
      'payload': payload,
    }));
  }

  subscribe(stream: string, callback: WebSocketDemultiplexerCallback): void {
    if(!this.eventByStream.has(stream)) {
      this.eventByStream.set(stream, new EventEmitter());
    }

    let eventEmitter = this.eventByStream.get(stream);
    eventEmitter.subscribe(callback);
  }
}
