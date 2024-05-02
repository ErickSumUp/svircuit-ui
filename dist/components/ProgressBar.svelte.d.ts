import { SvelteComponent } from 'svelte';
declare const __propDef: {
  props: {
    id?: string;
    /**
     * Choose from 3 sizes. Default: 'm'.
     * @type {'s' | 'm' | 'l'}
     */ size?: 's' | 'm' | 'l';
    /**
     * A number greater than zero, indicating how much work the task requires.
     * @type {number}
     */ max?: number;
    /**
     * A number between 0 and max, indicating how much of the task has been
     * completed.
     * @type {number}
     */ value?: number;
    /**
     * Whether the progress animation should loop indefinitely.
     * @type {boolean}
     */ loop?: boolean;
    /**
     * The time it takes the progress bar to fill up in milliseconds.
     * @type {number}
     */ duration?: number;
    /**
     * Whether the animation should the paused.
     * @type {boolean}
     */ paused?: boolean;
    /**
     * A descriptive label that is used by screen readers.
     * @type {string}
     */ label?: string;
    /**
     * Visually hide the label. This should only be used in rare cases and only
     * if the purpose of the field can be inferred from other context.
     * @type {boolean}
     */ hideLabel?: boolean;
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
};
export type ProgressBarProps = typeof __propDef.props;
export type ProgressBarEvents = typeof __propDef.events;
export type ProgressBarSlots = typeof __propDef.slots;
export default class ProgressBar extends SvelteComponent<
  ProgressBarProps,
  ProgressBarEvents,
  ProgressBarSlots
> {}
export {};
