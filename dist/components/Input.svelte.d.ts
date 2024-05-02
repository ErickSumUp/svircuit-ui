import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    label: string;
    id: string;
    validationHint?: string;
    optionalLabel?: string;
    invalid?: boolean;
    hasWarning?: boolean;
    showValid?: boolean;
    textAlignRight?: boolean;
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
    prefix: {
      class: string;
    };
    suffix: {
      class: string;
    };
  };
};
export type InputProps = typeof __propDef.props;
export type InputEvents = typeof __propDef.events;
export type InputSlots = typeof __propDef.slots;
export default class Input extends SvelteComponent<InputProps, InputEvents, InputSlots> {}
export {};
