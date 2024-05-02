import { SvelteComponent } from 'svelte';
import type { Writable } from 'svelte/store';
type NotificationToast = {
  id?: number;
  variant: 'info' | 'success' | 'warning' | 'danger';
  headline?: string;
  body: string;
  timeout?: number;
};
export declare const toasts: Writable<Array<NotificationToast>>;
export declare const addToast: (toast: NotificationToast) => void;
export declare const dismissToast: (id: number) => void;
declare const __propDef: {
  props: {
    variant?: 'info' | 'success' | 'warning' | 'danger';
    headline?: string;
    iconLabel?: string;
    body?: string;
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
};
export type NotificationToastProps = typeof __propDef.props;
export type NotificationToastEvents = typeof __propDef.events;
export type NotificationToastSlots = typeof __propDef.slots;
export default class NotificationToast extends SvelteComponent<
  NotificationToastProps,
  NotificationToastEvents,
  NotificationToastSlots
> {}
export {};
