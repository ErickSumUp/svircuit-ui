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
export type TableProps = typeof __propDef.props;
export type TableEvents = typeof __propDef.events;
export type TableSlots = typeof __propDef.slots;
export default class Table extends SvelteComponent<TableProps, TableEvents, TableSlots> {}
export {};
