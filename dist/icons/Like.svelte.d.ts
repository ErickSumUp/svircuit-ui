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
export type LikeProps = typeof __propDef.props;
export type LikeEvents = typeof __propDef.events;
export type LikeSlots = typeof __propDef.slots;
export default class Like extends SvelteComponent<LikeProps, LikeEvents, LikeSlots> {}
export {};
