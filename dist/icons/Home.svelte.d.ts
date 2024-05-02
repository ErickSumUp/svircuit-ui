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
export type HomeProps = typeof __propDef.props;
export type HomeEvents = typeof __propDef.events;
export type HomeSlots = typeof __propDef.slots;
export default class Home extends SvelteComponent<HomeProps, HomeEvents, HomeSlots> {}
export {};
