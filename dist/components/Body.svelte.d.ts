import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    size?: 'one' | 'two';
    variant?: 'highlight' | 'quote' | 'confirm' | 'alert' | 'subtle' | 'p';
    as?: string;
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {};
  };
};
export type BodyProps = typeof __propDef.props;
export type BodyEvents = typeof __propDef.events;
export type BodySlots = typeof __propDef.slots;
export default class Body extends SvelteComponent<BodyProps, BodyEvents, BodySlots> {}
export {};
