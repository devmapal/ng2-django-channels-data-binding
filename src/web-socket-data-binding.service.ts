import { EventEmitter, Injectable } from '@angular/core';

import { WebSocketDataBindingCallback } from './web-socket-data-binding-callback';
import { WebSocketDemultiplexerService } from 'ng2-django-channels-demultiplexing';
import { DataBinding } from './data-binding';

@Injectable()
export class WebSocketDataBindingService {
  private eventByStreamModel: Map<string, Map<string, EventEmitter<Object>>>;

  constructor(private webSocketDemultiplexerService: WebSocketDemultiplexerService) {
    this.eventByStreamModel = new Map<string, Map<string, EventEmitter<Object>>>();
  }

  private onmessage(stream: string, payload: DataBinding): void {
    if(!this.eventByStreamModel.has(stream)) {
      // No one is subscribed to this ModelStream, ignore
      return;
    }

    let eventByModel = this.eventByStreamModel.get(stream);
    if(!eventByModel.has(payload.model)) {
      // No one is subscribed to this Model, ignore
      return;
    }

    let eventEmitter = eventByModel.get(payload.model);
    eventEmitter.emit(payload);
  }

  create(stream: string, model: string, data: Object): void {
    this.webSocketDemultiplexerService.sendData(
      stream,
      {
        'action': 'create',
        'model': model,
        'data': data,
      }
    );
  }

  update(stream: string, model: string, pk: any, data: Object): void {
    this.webSocketDemultiplexerService.sendData(
      stream,
      {
        'action': 'update',
        'model': model,
        'pk': pk,
        'data': data,
      }
    );
  }

  delete(stream: string, model: string, pk: any): void {
    this.webSocketDemultiplexerService.sendData(
      stream,
      {
        'action': 'delete',
        'model': model,
        'pk': pk,
      }
    );
  }

  subscribe(stream: string, model: string, callback: WebSocketDataBindingCallback): void {
    if(!this.eventByStreamModel.has(stream)) {
      this.eventByStreamModel.set(stream, new Map<string, EventEmitter<Object>>());
    }

    let eventByModel = this.eventByStreamModel.get(stream);
    if(!eventByModel.has(model)) {
      eventByModel.set(model, new EventEmitter());
    }

    let eventEmitter = eventByModel.get(model);
    eventEmitter.subscribe(callback);

    this.webSocketDemultiplexerService.subscribe(stream, (payload: DataBinding) => {
      this.onmessage(stream, payload);
    });
  }
}
