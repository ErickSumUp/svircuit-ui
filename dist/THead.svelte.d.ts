import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: Record<string, never>;
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {};
  };
};
export type THeadProps = typeof __propDef.props;
export type THeadEvents = typeof __propDef.events;
export type THeadSlots = typeof __propDef.slots;
export default class THead extends SvelteComponent<THeadProps, THeadEvents, THeadSlots> {}
export {};
