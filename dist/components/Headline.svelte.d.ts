import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    size?: 'one' | 'two' | 'three' | 'four';
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {};
  };
};
export type HeadlineProps = typeof __propDef.props;
export type HeadlineEvents = typeof __propDef.events;
export type HeadlineSlots = typeof __propDef.slots;
export default class Headline extends SvelteComponent<
  HeadlineProps,
  HeadlineEvents,
  HeadlineSlots
> {}
export {};
