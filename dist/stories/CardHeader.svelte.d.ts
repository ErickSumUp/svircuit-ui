import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    showCloseButton?: boolean;
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
export type CardHeaderProps = typeof __propDef.props;
export type CardHeaderEvents = typeof __propDef.events;
export type CardHeaderSlots = typeof __propDef.slots;
export default class CardHeader extends SvelteComponent<
  CardHeaderProps,
  CardHeaderEvents,
  CardHeaderSlots
> {}
export {};
