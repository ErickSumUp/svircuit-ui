import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: Record<string, never>;
  events: {
    click: MouseEvent;
  } & {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {};
  };
};
export type TrProps = typeof __propDef.props;
export type TrEvents = typeof __propDef.events;
export type TrSlots = typeof __propDef.slots;
export default class Tr extends SvelteComponent<TrProps, TrEvents, TrSlots> {}
export {};
