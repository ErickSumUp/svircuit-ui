import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    [x: string]: any;
    size?: '16' | '24';
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
};
export type PackageProps = typeof __propDef.props;
export type PackageEvents = typeof __propDef.events;
export type PackageSlots = typeof __propDef.slots;
export default class Package extends SvelteComponent<PackageProps, PackageEvents, PackageSlots> {}
export {};
