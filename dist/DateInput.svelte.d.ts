import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    id?: string;
    disabled?: boolean;
    readonly?: boolean;
    label: string;
    validationMessage?: string;
    value?: string;
  };
  events: {
    blur: FocusEvent;
    change: Event;
  } & {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
};
export type DateInputProps = typeof __propDef.props;
export type DateInputEvents = typeof __propDef.events;
export type DateInputSlots = typeof __propDef.slots;
export default class DateInput extends SvelteComponent<
  DateInputProps,
  DateInputEvents,
  DateInputSlots
> {}
export {};
