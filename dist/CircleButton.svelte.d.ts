import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    variant?: 'primary' | 'tertiary';
    disabled?: boolean;
  };
  events: {
    click: MouseEvent;
  } & {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {};
  };
};
export type CircleButtonProps = typeof __propDef.props;
export type CircleButtonEvents = typeof __propDef.events;
export type CircleButtonSlots = typeof __propDef.slots;
export default class CircleButton extends SvelteComponent<
  CircleButtonProps,
  CircleButtonEvents,
  CircleButtonSlots
> {}
export {};
