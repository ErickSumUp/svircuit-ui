import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    label: string;
    id: string;
    optionalLabel?: string;
    hideLabel?: boolean;
    disabled?: boolean;
    ariaDescribedBy?: string;
    required?: boolean;
    value?: number | string;
  };
  events: {
    change: Event;
  } & {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    suffix: {
      class: string;
    };
  };
};
export type SearchInputProps = typeof __propDef.props;
export type SearchInputEvents = typeof __propDef.events;
export type SearchInputSlots = typeof __propDef.slots;
export default class SearchInput extends SvelteComponent<
  SearchInputProps,
  SearchInputEvents,
  SearchInputSlots
> {}
export {};
