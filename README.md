# What is this Svircuit UI?

Svircuit UI is an implementation of Circuit UI Design System implemented in Svelte.

We have taken many lessons from the Reacts Circuit UI implementation and applied then in Svelte, but we have also taken
important design decisions that take the development afar from the React implementation, therefore this is NOT a
port in Svelte.

# Roadmap

## 0.1.0

We require a basic version that has all the components that are used by current users of Svircuit UI.
It is currently being used with copy-pasted components, which we encourage, but we want to also provide the option
for them to use components from a downloadable library. Sorted alphabetically, not by importance or use:

Components:

- [x] Anchor
- [x] Badge
- [x] Body
- [x] Button
- [x] Card
- [x] DateInput
- [x] Headline
- [x] Input
- [x] Modal
- [ ] NotificationToast
- [x] Pagination
- [ ] Navigation
- [x] Select
- [ ] Table, TableHead, TableBody, TableRow, TableCell

Icons:

- [x] Alert
- [x] ChevronDown
- [x] ChevronLeft
- [x] ChevronRight
- [x] ChevronUp
- [x] Close
- [x] Confirm
- [x] Notify

All of these components must follow the guidelines to be approved for the 0.1.0 release.

# Guidelines:

- Showcase as close as possible to CircuitUI (React) with Storybook.
- Use style guidelines of CircuitUI design system. i.e. color tokens, B&W colors and new buttons.
- Follow T.R.U.T.H Principles

# T.R.U.T.H Principles

- **T**ransparent: Our work speaks for itself, we don't hide complexity, we embrace it and show it. We expect people to review and contribute.
- **R**epeat yourself please. We don't prioritize DRY code over easy to understand code. Unneeded abstractions are discouraged. When it makes sense, we repeat the code.
- **U**ser-centric: Accessibility is a memory and knowledge issue. Accessibility properties are enforced on components when possible.
- **T**empered: We don't want to overengineer the solution, neither do we want to cover every possible use case there is out there. Solve the problems that are in front of us, not the ones that might never come.
- **H**TML implicit: Components are made as little more than HTML wrappers, properties that exist in html will be redirected, reducing the component code size.
- **T**raditional: We try to stay as close to the web standards. Every technology chosen is justified as a bridge to use those standards more efficiently while having an amazing user experience.

## How these principles affect our development?

### Standard

- We use plain css
- We use HTML without libraries
- We use JS without libraries

### Components and stories

- Components DON'T depend on any other component, they are standalone. Other components might be received as slots (or future snippets in Svelte 5), but never as part of the component itself.
- Stories are the place where components are used together because it makes sense. Example: Navigation components, Complex Table components, etc.
