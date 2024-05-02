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
export type TBodyProps = typeof __propDef.props;
export type TBodyEvents = typeof __propDef.events;
export type TBodySlots = typeof __propDef.slots;
export default class TBody extends SvelteComponent<TBodyProps, TBodyEvents, TBodySlots> {}
export {};
