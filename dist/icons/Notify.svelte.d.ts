import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    size?: '16' | '24';
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
};
export type NotifyProps = typeof __propDef.props;
export type NotifyEvents = typeof __propDef.events;
export type NotifySlots = typeof __propDef.slots;
export default class Notify extends SvelteComponent<NotifyProps, NotifyEvents, NotifySlots> {}
export {};
