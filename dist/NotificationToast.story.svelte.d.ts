import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    Hst: Hst;
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
