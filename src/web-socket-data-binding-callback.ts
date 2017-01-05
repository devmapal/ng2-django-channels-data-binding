import { DataBinding } from './data-binding';

export interface WebSocketDataBindingCallback {
  (payload: DataBinding): void;
}
