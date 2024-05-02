import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 's' | 'm';
    destructive?: boolean;
    stretch?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    loadingLabel?: string;
    hideLabel?: boolean;
    compress?: boolean;
  };
  events: {
    click: MouseEvent;
  } & {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    'leading-icon': {
      class: string;
    };
    default: {};
    'trailing-icon': {
      class: string;
    };
  };
};
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
export default class Button extends SvelteComponent<ButtonProps, ButtonEvents, ButtonSlots> {}
export {};
