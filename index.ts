import { NgModule, ModuleWithProviders } from '@angular/core';

import { WebSocketDataBindingService } from './src/web-socket-data-binding.service';

export { DataBinding } from './src/data-binding';
export { WebSocketDataBindingService } from './src/web-socket-data-binding.service';

@NgModule({
  providers: [
    WebSocketDataBindingService
  ]
})
export class Ng2DjangoChannelsDataBindingModule { }
