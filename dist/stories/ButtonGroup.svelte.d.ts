import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    /**
     * Direction to align the buttons. Defaults to `center`.
     * @type {'left' | 'center' | 'right'}
     */ align?: 'left' | 'center' | 'right';
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {};
  };
};
export type ButtonGroupProps = typeof __propDef.props;
export type ButtonGroupEvents = typeof __propDef.events;
export type ButtonGroupSlots = typeof __propDef.slots;
export default class ButtonGroup extends SvelteComponent<
  ButtonGroupProps,
  ButtonGroupEvents,
  ButtonGroupSlots
> {}
export {};
