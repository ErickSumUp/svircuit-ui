# Migration plan: circuit-ui → svircuit-ui

Working document for bringing svircuit-ui up to date with circuit-ui. We complete the steps one by
one and tick them off here.

Reference library: `../experimental/circuit-ui/packages/circuit-ui/components/<Name>/`
Design tokens: `../experimental/circuit-ui/packages/design-tokens/themes/`

## Progress log

Newest first. Each entry records what was completed and anything the next session needs to know.

### 2026-07-29 — Phase 1 typography ✅

All four missing typography components ported, plus both deprecations. 30 unit tests pass, and every
size, weight and color was verified against circuit's computed values in the browser.

- **Compact**, **Display**, **List** and **Numeral** are in `src/lib/components/`, each with a unit
  test, a `*.stories.svelte` mirroring circuit's story set, an `*.mdx` page, and an export.
- Sizes verified against circuit: Compact 18/15/13px, Display 96/64/48/40px (64/48/40/40 below
  960px), Numeral 64/48/24/16px with `tabular-nums`, List on the Body scale.
- **List needed `:global()`.** Its `li`/`ul`/`ol` rules style children that the consumer passes in,
  which carry the consumer's scope, not the component's. Any future component that styles
  consumer-supplied markup (ListItemGroup, Table) will hit the same thing.
- Deprecated size aliases are implemented the same way as Body and Headline: a `deprecatedSizeMap`
  plus a `$derived`. Display maps one → l, two → m, three → m, four → s; List follows Body with
  one → m, two → s.
- `Badge` and `SubHeadline` now carry `@deprecated` JSDoc pointing at `Status` and
  `<Headline size="s">`. Neither is removed — `SubHeadline` in particular is a visible design change,
  so it needs sign-off before anything switches over.

**Next up: Phase 0.2 (field foundation, still needs the decision) or Phase 3, which is independent
of it.** Phase 2 is blocked on 0.2.

### 2026-07-29 — Phase 0.1 design tokens ✅

`src/lib/styles.css` only. All 16 missing shared tokens added, all 20 unit tests still pass, and the
values were verified as resolved in the browser.

- Added `--cui-icon-sizes-s/m/l/xl`, `--cui-border-radius-giga/tera/peta`,
  `--cui-spacings-yotta/ronna/quetta`, `--cui-display-xl-*`, `--cui-numeral-xl-*`,
  `--cui-letter-spacing-tight` and `--cui-z-index-side-panel`.
- **The legacy names are now `var()` aliases, not literals.** `--cui-typography-body-*` (including
  the `one`/`two`/`large` spellings) resolve to `--cui-body-*`, and both the singular
  `--cui-icon-size-*` and plural `--cui-icon-sizes-kilo/mega/giga/tera` resolve to the new t-shirt
  sizes. Components can keep using the old names; delete an alias when its last reference goes.
  Consequence: icon size tokens now compute to `rem`, not `px`.
- **Two values were synced to circuit and are visible changes.** `--cui-letter-spacing` went from
  `-0.01375rem` to `0rem` (circuit sets both letter-spacing tokens to zero), so all text is a hair
  wider. `--cui-z-index-popover` went from `30` to `1000`.
- Added a `@media (max-width: 959px)` block that scales the display sizes down, which is circuit's
  `sharedUntilGiga` set. Our stylesheet had no responsive tokens before; `Display` in Phase 1 needs
  this.
- `--cui-z-index-backdrop` and `--cui-z-index-modal` are kept but marked deprecated — circuit dropped
  both in favour of the top layer.
- Discovered on the way: there is a `src/lib/dev/` directory (`SearchInput.svelte`,
  `CloseButtonSecondary.svelte`, `CloseButtonSecondaryHiddenLabel.svelte`) that nothing exports.
  Probably scratch work; worth triaging alongside the other dead files in Phase 3.

**Next up: Phase 0.2, which is blocked on a decision about the field foundation.** If that decision
is deferred, Phase 1 (typography) is independent and can go first.

## Ground rules

- **Atomic components.** Every component in `src/lib/components/` is self-contained: it inlines the
  markup, logic and styles that circuit spreads across sub-components. Components never import other
  components.
- **Story components.** Compositions that are too large to be atomic (`ButtonGroup`, `Pagination`,
  `DateInput`, `SideNavigation`) live in `src/lib/stories/` and may compose atomic components.
- **Native over libraries.** Popover API, CSS anchor positioning, `<dialog>`, `Intl`, container
  queries and `prefers-color-scheme` instead of JS dependencies.
- **Icons are inlined** as SVG per component rather than pulled from `@sumup-oss/icons`.
- Each ported component ships with: the component, a unit test, a `*.stories.svelte`, an `*.mdx` doc
  page, an export in `src/lib/index.ts`, and a browser check of the rendered result.

## Status overview

Circuit has 74 components. We share 24 with it, 38 do not exist here yet, and 4 are our own
inventions (`Stack`, `Spacer`, `TestText`, plus the story components).

| Status         | Components                                                                                                             |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| In sync        | Body, Headline, Anchor, Compact, Display, List, Numeral, Status, Calendar, Card, CardFooter                            |
| Minor drift    | Button, Tag, ListItem, ProgressBar, Checkbox, InputRadio, ButtonGroup, Popover, Toggletip, DateInput                   |
| Major drift    | Input, Select, SearchInput, InputRadioGroup, Table, CardHeader, NotificationToast, SideNavigation, Pagination, Spinner |
| Dead / removed | CircleButton, SubHeadline, the duplicate `src/lib/SideNavigation.svelte`                                               |
| Ours only      | Stack, Spacer (no circuit equivalent; the closest relatives are in circuit's `legacy/` folder)                         |

Colors are fully in sync — every token in circuit's `light.ts` exists in our `styles.css`.

---

## Phase 0 — Foundations

Everything else depends on these two steps.

### 0.1 Design tokens ✅ done 2026-07-29

- [x] Add the 16 shared tokens we are missing:
      `--cui-icon-sizes-s/m/l/xl`, `--cui-display-xl-font-size`, `--cui-display-xl-line-height`,
      `--cui-numeral-xl-font-size`, `--cui-numeral-xl-line-height`, `--cui-border-radius-giga/tera/peta`,
      `--cui-spacings-yotta/ronna/quetta`, `--cui-letter-spacing-tight`, `--cui-z-index-side-panel`.
- [x] Keep the legacy names we still use as aliases of the new ones, so nothing breaks while
      components migrate: `--cui-typography-body-*` → `--cui-body-*`, `--cui-icon-size(s)-kilo/mega/giga/tera`
      → `--cui-icon-sizes-s/m/l/xl`.
- [x] Add the responsive display sizes (circuit's `sharedUntilGiga`, applied at `max-width: 959px`).
- [ ] `--cui-ty-headline-*`, `--cui-ty-sub-headline-*` and `--cui-typography-headline-*` were left as
      literals on purpose: circuit's new headline scale has different line heights, so they are not
      aliasable. They disappear when `SubHeadline` is deprecated (Phase 1) and when the last
      `--cui-typography-headline-four-*` references go (Calendar, Toggletip, DateInput).
- [ ] Note for later: circuit moved primary Button, selected Tag and the ProgressBar fill from
      `--cui-bg-accent-strong` to `--cui-bg-strong`. Both tokens exist here; the swap happens per
      component, not globally.

### 0.2 Field foundation (decision needed)

Circuit routes every form field through `components/Field/`, which supplies one shared contract:
`label`, `optionalLabel`, `hideLabel`, `validationHint`, `invalid`, `hasWarning`, `showValid`,
`disabled`, `required`, plus a `size` (`s`/`m`) that publishes `--field-input-padding-block`,
`--field-input-padding-inline`, `--field-input-font-size`, `--field-input-line-height` and
`--field-input-border-radius` for the input to consume. It also owns validity precedence
(`disabled > invalid > hasWarning > showValid`) and merges the caller's `aria-describedby` with the
generated hint id.

We have no equivalent, so all six form components re-inline that markup and have drifted apart.

- [ ] **Decide the shape.** Proposal: a shared `src/lib/styles/field.css` plus a small
      `src/lib/utils/field.ts` (validity resolution, id merging). Each component imports both and keeps
      its own markup, so atomicity holds but we stop copying ~150 lines of CSS per field.
- [ ] Fix the three a11y defects that every form component shares, as each one is migrated:
  - validation hints have no `id`, so nothing references them;
  - `ariaDescribedBy` replaces the hint id instead of merging with it;
  - a redundant `aria-label={label}` on the control overrides the visible label and drops
    `optionalLabel` from the accessible name.
- [ ] Also cross-cutting: circuit moved from ring-style `box-shadow: 0 0 0 1px` borders to real
      `border: 1px solid` plus an inset focus shadow. Our fields still use rings, so they sit ~2px
      smaller than circuit's.

---

## Phase 1 — Finish typography ✅ done 2026-07-29

- [x] **Compact** — like Body but denser, for tables and dense UI. Sizes `s`/`m`/`l`, weights
      `regular`/`semibold`/`bold`, same color set as Body.
- [x] **Display** — marketing title in the SumUp Black display typeface. Sizes `s`/`m`/`l`/`xl`,
      renders as any heading element. Defaults to the `black` weight at `xl` and `bold` elsewhere.
- [x] **List** — ordered and unordered lists, sizes inherited from Body, nesting supported.
- [x] **Numeral** — numbers with tabular figures, sizes `s`/`m`/`l`/`xl`, weight tied to the size.
- [x] **Deprecate Badge.** JSDoc `@deprecated` added pointing at `Status`, with the color mapping
      (success→confirm, warning→notify, danger→alert) recorded. The component still works as before.
- [x] **Deprecate SubHeadline.** JSDoc `@deprecated` added pointing at `<Headline size="s">`. Not a
      drop-in swap — ours is uppercase, Headline `s` is mixed case — so nothing has been switched over
      yet. Needs design sign-off, and the `--cui-ty-sub-headline-*` tokens go away with it.
- [ ] Follow-up: `Compact` should replace the hand-rolled dense typography in `Table`, `ListItem` and
      the form field labels when those are migrated (Phases 2–4).

---

## Phase 2 — Sync the existing form fields

Do these after 0.2, in this order — `SearchInput` is a wrapper over `Input` upstream.

### 2.1 Input — major drift (L)

- [ ] Add `size: 's' | 'm'` via the `--field-input-*` variables (the largest gap; nothing scales today).
- [ ] Add `as: 'input' | 'textarea'`, which is how `TextArea` is built in Phase 6.
- [ ] Add `passwordManagerIgnore` (five `data-*-ignore` attributes) and declare `readOnly` properly.
- [ ] Replace `textAlignRight?: boolean` with circuit's `textAlign: 'left' | 'right'`.
- [ ] Pass arguments to the prefix/suffix snippets — circuit's `renderPrefix` receives
      `{ className, value }` and `renderSuffix` receives `{ className }`.
- [ ] Typography is off by one step in both directions: input text should be `body-m` (we use `body-s`),
      label and hint should be `body-s` (we use `body-m`).
- [ ] Clean up the `<style>` block — `.wrapper`, `.prefix`/`.suffix` and `.validation-hint-invalid` are
      each defined two or three times, and `.icon` is unused.

### 2.2 Select — major drift (M)

- [ ] Add `options: SelectOption[]` and `placeholder` (renders a leading empty `<option>` when nothing
      is selected; without it there is no "no selection" state). `hasWarning`/`showValid` are
      deliberately absent upstream, so those are not gaps.
- [ ] `label` should be required (ours defaults to `''`), and `name` must not default to `'select'` —
      two selects on one page collide today.
- [ ] The declared `suffix` snippet is never rendered. Either wire it up or drop it.
- [ ] Move `size` onto the wrapper variables instead of per-element `class:s`/`class:m`, which
      currently leaves font size and border radius fixed.
- [ ] Center the chevron with `top: 50%; translateY(-50%)`; the pressed state drops the translate today,
      so it visibly jumps.
- [ ] Remove `min-width: max-content` (lets a long option push the select past its container) and fix
      the disabled hint color (`fg-subtle-disabled`, not `fg-danger-disabled`).

### 2.3 SearchInput — major drift (M)

- [ ] Rebuild as a thin wrapper over the fixed `Input`, which restores `validationHint`, `invalid`,
      `hasWarning`, `showValid`, `optionalLabel`, `required`, `readOnly` and `size` in one move.
- [ ] The clear button has **no accessible name** — `aria-labelledby="on clear"` points at nothing.
      Replace with `aria-label={clearLabel}` and add the `clearLabel` prop.
- [ ] Add `type="button"`; it submits the enclosing form today.
- [ ] Refocus the input after clearing, and hide the clear button when `disabled` or `readOnly`.
- [ ] Rename `onClearClick` to `onClear` and stop mutating `value` internally.
- [ ] Use a 24px search icon (ours is 16px in a 48px box) and add the `::-webkit-search-*` appearance
      reset — Chrome and Safari draw their own clear button next to ours today.

### 2.4 InputRadioGroup — major drift (M/L)

- [ ] Add the `options` array API so the group renders its radios and propagates `name` (auto-generated),
      `value`/`defaultValue`, `disabled` and `required`. None of those reach the inputs today.
- [ ] The declared `description` prop is unused, and `validationHint` is missing from the `Props`
      interface (it only type-checks through the index signature).
- [ ] Wrap the validation hint in `role="status" aria-live="polite"` — the only field of ours without it.
- [ ] Add the options container's `display: flex; flex-direction: column; gap: var(--cui-spacings-bit)`.
- [ ] Return nothing for an empty options array; omit `aria-invalid`/`aria-required` when falsy.

### 2.5 Checkbox — minor drift (S)

- [ ] Add `align: 'center' | 'start'` and default to `start` like circuit, so the box aligns to the
      first line of a multi-line label. Ours hardcodes a non-reactive `center`.
- [ ] Fix disabled + checked: the `{#if}` chain renders no SVG at all, so the box fills with color but
      shows no checkmark.
- [ ] Stop spreading `{...rest}` onto the checked `<svg>` — `name` and `value` leak into the markup.
- [ ] Swap `--cui-bg-accent-strong` for `--cui-bg-strong`, use `--cui-border-radius-bit` and
      `--cui-border-width-kilo` instead of literal `3px`/`1px`, and drop the 2px icon padding.
- [ ] Remove the dead `import type { Action }`.

### 2.6 InputRadio — minor drift (S)

- [ ] Give the visually hidden description an `id` and merge it into `aria-describedby`. Today the
      description is duplicated in the DOM and invisible to assistive tech.
- [ ] Add `align` (circuit forces `start`), make `name` optional so the group can inject it, and drop
      our invented per-radio `invalid` prop in favour of inheriting from the group's fieldset.
- [ ] Fix the circle geometry: label padding `1.25rem` (not 26px), outer circle `1.25rem` (not 18px),
      inner dot computed from the size (10px at 5px, not 10px at 4px).

---

## Phase 3 — Sync the core components

### 3.1 Button + CloseButton (M)

- [ ] Add `as`/`href` so a Button can render as an anchor; ours is always a `<button>`.
- [ ] The `.leading-icon`/`.trailing-icon` sizing rules are **commented out**, so icons render at
      intrinsic size instead of the enforced 16/24px.
- [ ] Port **CloseButton** as its own component. Button, CardHeader, Tag and NotificationToast each
      inline their own copy today.
- [ ] Reconcile our extra `compress` and `hideLabel` props — `hideLabel` is how old circuit did
      icon-only buttons; current circuit uses a separate `IconButton`.
- [ ] Size `m` should use `--cui-border-radius-kilo` (we use `byte`), disabled primary should use
      `--cui-bg-accent-strong-disabled` (we use `--cui-bg-highlight-disabled`), and tertiary needs
      `padding-inline: 0`.
- [ ] Apply the pressed-content nudge to `[aria-expanded="true"]` and `[aria-pressed="true"]`, not just
      `:active`, so toggle buttons don't look flat.
- [ ] Delete `src/lib/CircleButton.svelte` — Svelte 4 syntax, unexported, superseded by CloseButton.

### 3.2 CardHeader (M)

- [ ] Move to circuit's API: `onClose` + `closeButtonLabel` instead of `showCloseButton` +
      `onClickCloseButton`.
- [ ] Replace the ~90 lines of inlined close-button CSS with the CloseButton from 3.1.
- [ ] Add the `no-headline` class that right-aligns the button when there is no headline.
- [ ] Fix `padding-right: calc(-1 * var(--cui-spacings-mega))` — negative padding is invalid and does
      nothing.

### 3.3 ListItem + ListItemGroup (M)

- [ ] Apply typography that circuit applies automatically: label `body m`, details `body s subtle`,
      trailing label `body m semibold`. Ours passes snippets through unstyled.
- [ ] Wrap the `details` snippet in its `.details` container (the trailing path already does, so the two
      are inconsistent) and add `gap: var(--cui-spacings-bit)` to `.main` and `.trailing`.
- [ ] Add `.base:disabled *` so child text dims with the item.
- [ ] Drop the redundant `role="button"` and stop passing `disabled` when the element is a `div`/`a`.
- [ ] Port **ListItemGroup**: `variant` plain/inset, `items`, `label`, `hideLabel`, `details`, and focus
      tracking for the focused/selected row.

### 3.4 Tag (S/M)

- [ ] Rename `onclickRemove` to `onRemove` — not a Svelte idiom difference, a real divergence.
- [ ] The focus-visible class is **inverted**: `class:focus-visible={!onclick}`. Interactive tags lose
      their focus ring; static ones get a rule they can't use.
- [ ] Replace the ~150 lines of inlined remove-button CSS with CloseButton
      (`variant={selected ? 'primary' : 'secondary'}`, `size="s"`).
- [ ] Make the element choice reactive — it is computed once with `$state` at init, so it won't update
      if `href` or `onclick` change.
- [ ] Selected background: `--cui-bg-strong`, not `--cui-bg-accent-strong`.

### 3.5 ProgressBar (S)

- [ ] The loop selector `[data-loop]` matches even when the value is `"false"`, so the loop animation is
      always on. Use `[data-loop="true"]`.
- [ ] Label typography should be `--cui-body-s-*`; use `gap: var(--cui-spacings-byte)` instead of a
      margin on the label.
- [ ] Fill color `--cui-bg-strong`.
- [ ] Derive `id` from `$props.id()` — it defaults to the literal `'progress-bar'`, so two bars on a page
      share an id. Use `aria-labelledby` alone, drop the duplicate `aria-label`, make `label` required,
      and spread rest props onto the wrapper.

### 3.6 Spinner (S)

- [ ] Rewrite in Svelte 5 (`export let` today, no rest props) and move it to `src/lib/components/`.
- [ ] Sizes are on the removed API (`byte`/`kilo`/`giga`) — move to `s`/`m`/`l`. Pixel values already
      match, so this is API surface only.
- [ ] Use `currentColor` instead of the hardcoded `--cui-fg-accent`, so parents can recolor it.
- [ ] Export it from `index.ts`.

---

## Phase 4 — Rebuild the three big ones

### 4.1 Table (L)

- [ ] Adopt the data-driven contract: `headers`, `rows`, and the `HeaderCell`/`RowCell` shapes, with the
      component rendering head and body itself. Our thin DOM wrappers make every consumer write markup
      by hand.
- [ ] Add sorting: `onSortBy`, `initialSortDirection`, `initialSortedColumn`, per-header `sortable` /
      `sortLabel` / `sortByValue`, `aria-sort`, the sort arrow, and the hovered-column highlight.
- [ ] Add `condensed` (cascading from the table, not per cell), `rowHeaders` (sticky first column on
      mobile), `scrollable` (measures the parent for `--table-height` and translates the `thead`), and
      `onRowClick`.
- [ ] Row interaction: `tabIndex`, Enter/Space activation and the focus ring belong on `tr`. Ours are on
      `tbody`, so they never trigger.
- [ ] **The mobile media query is inverted** — `Table.svelte` uses `min-width: 767px` where circuit uses
      `max-width: 767px`, so horizontal scrolling doesn't work on mobile.
- [ ] `TH`'s `fixed` is a hardcoded `let fixed = true`, so every header is sticky instead of only the
      first column.
- [ ] Rename `borderCollapse` → `borderCollapsed`, `isScrollable` → `scrollable`; fix
      `--cui-spacings-bit` used where `--cui-border-radius-bit` was meant; move typography to `body-s`
      and borders to `--cui-border-width-kilo` + `--cui-border-divider`.

### 4.2 NotificationToast (M)

- [ ] Add the provider layer: `ToastProvider` + a `useToast` equivalent with `position`
      (`bottom` | `top` | `top-right`), rendered in the top layer via the Popover API. Ours is a
      module-level `$state` array pinned to the bottom.
- [ ] Add `onClose` and `isVisible`, and drive the enter/exit animation — our CSS declares the
      transitions but nothing changes the values, so only the `animate:flip` reorder animates.
- [ ] Rename `timeout` → `duration` with circuit's 6000 ms minimum, and allow a toast to persist (ours
      always schedules dismissal).
- [ ] Drop our `dismissible` prop (circuit always renders the close button), make `iconLabel` a string,
      and mark the close button `aria-hidden` with `tabindex="-1"`.
- [ ] Restyle: filled variant backgrounds (`--cui-bg-subtle`/`-success`/`-warning`/`-danger`) with
      `--cui-border-radius-kilo` and no border, instead of our elevated bordered card.

### 4.3 Pagination (M)

- [ ] Port `PageSelect` — above 5 pages circuit swaps the number list for a `<Select>`, with the
      `totalLabel(totalPages)` prop and its `aria-describedby` wiring.
- [ ] Move to `onChange(page)` + required `label` instead of mutating bindable `currentPage`/`totalPages`;
      rename `ariaLabel` → `label`.
- [ ] Render nothing when `totalPages < 2` (we render a lone page "1").
- [ ] The `…` separator is a focusable `<Button role="link">` with no handler and no `aria-hidden` —
      keyboard users tab onto dead buttons.
- [ ] Drop `role="link"` from page buttons and set `aria-current` on the active page.
- [ ] Fix the windowing hole: the `totalPages > 5 && !isCloseToBoth` branch is the only one that pushes
      pages beyond 7, so some inputs return an empty list.
- [ ] Add `flex-shrink: 0` to the chevron buttons.

---

## Phase 5 — New simple components

- [ ] **Hr** — semantic rule with `--cui-border-divider`.
- [ ] **AspectRatio** — aspect-ratio wrapper.
- [ ] **Image** — with the object-fit and loading behavior circuit ships.
- [ ] **Avatar** — `variant` object/identity, sizes, initials fallback.
- [ ] **Skeleton** — loading placeholder, needed by SideNavigation's `isLoading` in Phase 8.
- [ ] **Timestamp** — relative and absolute formatting via `Intl.RelativeTimeFormat`.

---

## Phase 6 — New form components

- [ ] **TextArea** — built on `Input as="textarea"` from 2.1.
- [ ] **Toggle** — switch with label and description.
- [ ] **CheckboxGroup** — options array, shared validation.
- [ ] **Selector** and **SelectorGroup** — card-style radio/checkbox.
- [ ] **ColorInput**
- [ ] **CurrencyInput** — locale-aware, `Intl.NumberFormat`.
- [ ] **PercentageInput**
- [ ] **PhoneNumberInput** — country code select plus subscriber number.
- [ ] **ImageInput** — upload with preview and clear.

Also here: **DateInput** is missing `defaultValue`, `closeCalendarButtonLabel` and
`autoComplete="bday"` from the original port.

---

## Phase 7 — Notifications

- [ ] **NotificationInline**
- [ ] **NotificationBanner**
- [ ] **NotificationModal**
- [ ] **NotificationFullscreen**
- [ ] **Callout** (experimental upstream)

---

## Phase 8 — Navigation

- [ ] **SkipLink**
- [ ] **Hamburger**
- [ ] **Tabs** (Tab, TabList, TabPanel inlined into one atomic component)
- [ ] **TopNavigation** (+ utility links)
- [ ] **SidePanel**
- [ ] **SideNavigation rewrite** — the largest single item. We have no mobile navigation at all
      (circuit switches to a full-screen modal below 1280px), no `isOpen`/`onClose`/`closeButtonLabel`,
      no `isLoading` skeletons, no `primaryNavigationLabel`/`secondaryNavigationLabel`, no skip link.
      `PrimaryLink` lacks `activeIcon`, `externalLabel`, `secondaryGroups`, `suffix` and the
      button-vs-anchor switch; our `badge` is a boolean `isNew` where circuit takes full badge props.
      Primary and secondary are unwired — circuit derives the secondary panel from the active primary
      link. Delete the Svelte 4 duplicate at `src/lib/SideNavigation.svelte` as part of this.

---

## Phase 9 — Overlays, brand and the tail

- [ ] **Tooltip**
- [ ] **ActionMenu**
- [ ] **Modal**
- [ ] **Step** (under review upstream)
- [ ] **SumUpLogo**
- [ ] **TierIndicator**
- [ ] **Carousel** + **CarouselPagination** (under review upstream)
- [ ] **ComparisonTable** (brand, large)
- [ ] **AutocompleteInput** (experimental upstream)
- [ ] **TimeInput** (experimental upstream)

---

## Smaller follow-ups

- [ ] **Popover** — no close button (circuit inherits Dialog's), no configurable `fallbackPlacements`
      (ours are hardcoded in CSS), `offset` takes a number rather than `{ mainAxis, crossAxis }`, and the
      placement union omits `left-start`/`left-end`/`right-start`/`right-end`.
- [ ] **Toggletip** — `action` should accept the full Button prop set (`destructive`, `disabled`,
      `isLoading`), not our narrow `{ label, href, target, onclick, icon }`.
- [ ] **ButtonGroup** — add `size` (`s`/`m`) driving the gap, replace the hardcoded `1rem` gap with
      `--cui-spacings-kilo`, drop the extra `margin-top`, remove the dead `.base .secondary` rule.
- [ ] **Dialog** — we deliberately kept our simpler API. Still worth taking from circuit: scroll lock,
      focus restore to the trigger, `hideCloseButton`, and renaming `preventClose` (it only hides the
      close button; Escape and backdrop clicks still close).
- [ ] **Stack** — drops `...rest`, so no `class`/`style` passthrough, and its default is column below
      600px / row above, which makes `vertical` a no-op on mobile.
- [ ] **`src/lib/stories/` is doing double duty** — `DateInput`, `ButtonGroup` and `Pagination` are
      exported as public components from `index.ts` while living in a directory named for stories.
      Consider renaming it (`src/lib/compositions/`?).
