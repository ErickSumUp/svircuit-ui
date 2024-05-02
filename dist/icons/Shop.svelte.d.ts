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
export type ShopProps = typeof __propDef.props;
export type ShopEvents = typeof __propDef.events;
export type ShopSlots = typeof __propDef.slots;
export default class Shop extends SvelteComponent<ShopProps, ShopEvents, ShopSlots> {}
export {};
