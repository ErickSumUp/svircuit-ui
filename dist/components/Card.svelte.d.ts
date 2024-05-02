import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    spacing?: 'mega' | 'giga';
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {};
  };
};
export type CardProps = typeof __propDef.props;
export type CardEvents = typeof __propDef.events;
export type CardSlots = typeof __propDef.slots;
export default class Card extends SvelteComponent<CardProps, CardEvents, CardSlots> {}
export {};
