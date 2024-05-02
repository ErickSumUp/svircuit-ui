import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    label: string;
    id: string;
    textAlignRight?: boolean;
    hideLabel?: boolean;
    disabled?: boolean;
    ariaDescribedBy?: string;
    required?: boolean;
    value?: number | string;
    onClearClick?: () => void;
  };
  events: {
    change: Event;
  } & {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
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
