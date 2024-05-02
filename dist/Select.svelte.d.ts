import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    label?: string;
    name?: string;
    disabled?: boolean;
    invalid?: boolean;
    value?: number | string;
    validationHint?: string;
    optionalLabel?: string;
    ariaDescribedBy: string;
    required?: boolean;
    hideLabel?: boolean;
    id: string;
  };
  events: {
    change: Event;
  } & {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    prefix: {
      class: string;
    };
    default: {};
  };
};
export type SelectProps = typeof __propDef.props;
export type SelectEvents = typeof __propDef.events;
export type SelectSlots = typeof __propDef.slots;
export default class Select extends SvelteComponent<SelectProps, SelectEvents, SelectSlots> {}
export {};
