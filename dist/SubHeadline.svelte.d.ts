import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {};
  };
};
export type SubHeadlineProps = typeof __propDef.props;
export type SubHeadlineEvents = typeof __propDef.events;
export type SubHeadlineSlots = typeof __propDef.slots;
export default class SubHeadline extends SvelteComponent<
  SubHeadlineProps,
  SubHeadlineEvents,
  SubHeadlineSlots
> {}
export {};
