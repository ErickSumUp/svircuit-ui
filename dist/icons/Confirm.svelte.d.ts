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
export type ConfirmProps = typeof __propDef.props;
export type ConfirmEvents = typeof __propDef.events;
export type ConfirmSlots = typeof __propDef.slots;
export default class Confirm extends SvelteComponent<ConfirmProps, ConfirmEvents, ConfirmSlots> {}
export {};
