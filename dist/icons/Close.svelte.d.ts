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
export type CloseProps = typeof __propDef.props;
export type CloseEvents = typeof __propDef.events;
export type CloseSlots = typeof __propDef.slots;
export default class Close extends SvelteComponent<CloseProps, CloseEvents, CloseSlots> {}
export {};
