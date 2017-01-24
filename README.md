# ng2-django-channels-data-binding

## Installation

To install this library, run:

```bash
$ npm install ng2-django-channels-data-binding ng2-django-channels-demultiplexing --save
```

## Usage

Sample Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import libraries
import { Ng2DjangoChannelsDataBindingModule } from 'ng2-django-channels-data-binding';
import { Ng2DjangoChannelsDemultiplexingModule } from 'ng2-django-channels-demultiplexing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify library as an import and configure the WebSocket URL
    Ng2DjangoChannelsDataBindingModule,
    Ng2DjangoChannelsDemultiplexingModule.forRoot({websocket_url: 'ws://127.0.0.1:8001/api/ws'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once imported, you can use WebSocketDataBindingService in your Angular application:

```typescript
import { Injectable } from '@angular/core';
import { DataBinding, WebSocketDataBindingService } from 'ng2-django-channels-data-binding';

@Injectable()
export class SomeService {
  constructor(private webSocketDataBindingService: WebSocketDataBindingService) {
    webSocketDataBindingService.subscribe(
      // Django Channels Demultiplexer Stream
      'hero',
      // Django model
      'hero_service.hero',
      (payload: DataBinding) => {
        if(payload.action === 'create') {
          ( ... )
        } else if(payload.action === 'update') {
          ( ... )
        } else if(payload.action === 'delete') {
          ( ... )
        }
      }
    );
  }

  private create(hero: Hero): void {
    this.webSocketDataBindingService.create(
      'hero', 'hero_service.hero', {'name': hero.name});
  }

  private update(hero: Hero): void {
    this.webSocketDataBindingService.update(
      'hero', 'hero_service.hero', hero.id, {'name': hero.name});
  }

  delete(hero: Hero): void {
    this.webSocketDataBindingService.delete(
      'hero', 'hero_service.hero', hero.id);
  }
}
```

## License

MIT © [Fabian Schaffert](mailto:fabian@schaffert.cc)
