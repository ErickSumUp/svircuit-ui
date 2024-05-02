import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    vertical?: boolean;
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {};
  };
};
export type StackProps = typeof __propDef.props;
export type StackEvents = typeof __propDef.events;
export type StackSlots = typeof __propDef.slots;
export default class Stack extends SvelteComponent<StackProps, StackEvents, StackSlots> {}
export {};
