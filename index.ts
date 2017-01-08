import { NgModule, ModuleWithProviders } from '@angular/core';

import { WebSocketDataBindingService } from './src/web-socket-data-binding.service';
import { WebSocketDemultiplexerService } from './src/web-socket-demultiplexer.service';
import { WebSocketService } from './src/web-socket.service';
import { WebSocketServiceConfig } from './src/web-socket-service-config';

export { DataBinding } from './src/data-binding';
export { WebSocketDataBindingService } from './src/web-socket-data-binding.service';

@NgModule({
  providers: [
    WebSocketService,
    WebSocketDemultiplexerService,
    WebSocketDataBindingService
  ]
})
export class Ng2DjangoChannelsDataBindingModule {
  static forRoot(config: WebSocketServiceConfig): ModuleWithProviders {
    return {
      ngModule: Ng2DjangoChannelsDataBindingModule,
      providers: [
        {provide: WebSocketServiceConfig, useValue: config }
      ]
    };
  }
}
