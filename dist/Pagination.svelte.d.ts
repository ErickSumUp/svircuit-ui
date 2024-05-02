import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    currentPage?: number;
    totalPages?: number;
    ariaLabel?: string;
    previousLabel?: string;
    nextLabel?: string;
    pageLabel?: (page: number) => string;
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
};
export type PaginationProps = typeof __propDef.props;
export type PaginationEvents = typeof __propDef.events;
export type PaginationSlots = typeof __propDef.slots;
export default class Pagination extends SvelteComponent<
  PaginationProps,
  PaginationEvents,
  PaginationSlots
> {}
export {};
