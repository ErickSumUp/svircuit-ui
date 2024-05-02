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
export type LiveChatProps = typeof __propDef.props;
export type LiveChatEvents = typeof __propDef.events;
export type LiveChatSlots = typeof __propDef.slots;
export default class LiveChat extends SvelteComponent<
  LiveChatProps,
  LiveChatEvents,
  LiveChatSlots
> {}
export {};
