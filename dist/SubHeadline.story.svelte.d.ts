import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    Hst: Hst;
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
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
