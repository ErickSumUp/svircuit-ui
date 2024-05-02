import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    size?: 'one' | 'two';
    variant?: 'highlight' | 'quote' | '';
    href: string;
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {};
  };
};
export type AnchorProps = typeof __propDef.props;
export type AnchorEvents = typeof __propDef.events;
export type AnchorSlots = typeof __propDef.slots;
export default class Anchor extends SvelteComponent<AnchorProps, AnchorEvents, AnchorSlots> {}
export {};
