# What is this Svircuit UI?

Svircuit UI is an implementation of Circuit UI Design System implemented in Svelte.

We have taken many lessons from the Reacts Circuit UI implementation and applied then in Svelte, but we have also taken
important design decisions that take the development afar from the React implementation, therefore this is NOT a
port in Svelte.

# Roadmap

## v1.0

We require a version that can be seamlessly and safely integrated into backoffices.

- [ ] Prepare a documentation that can be used by developers to integrate Svircuit into their projects.
- [ ] Create tests that can help detect errors in components when they can break the design implementation.
- [ ] Integrate dark mode (a.k.a. B&W theme in Circuit) into Svircuit.

## Desired features but not needed for v1.0

- [ ] Integrate extra color and style modifications themes (Take [daisyUI](https://daisyui.com/docs/themes/) as example)
- [ ] Integrate automated deployments to npm.

# Guidelines:

- Showcase as close as possible to CircuitUI (React) with Storybook.
- Use style guidelines of CircuitUI design system. i.e. color tokens, B&W colors and new buttons.
- Follow T.R.U.T.H Principles

# T.R.U.T.H Principles

- **T**ransparent: Our work speaks for itself, we don't hide complexity, we embrace it and show it. We expect people to review and contribute.
- **R**epeat yourself please. We don't prioritize DRY code over easy to understand code. Unneeded abstractions are discouraged. When it makes sense, we repeat the code.
- **U**ser-centric: Accessibility is a memory and knowledge issue. Accessibility properties are enforced on components when possible.
- **T**empered: We don't want to overengineer the solution, neither do we want to cover every possible use case there is out there. Solve the problems that are in front of us, not the ones that might never come.
- **H**TML semantic: Components are made as little more than HTML wrappers, properties that exist in html will be redirected, reducing the component code size. We respect web standards.

## How these principles affect our development?

### Standard

Other than svelte:

- We use plain css.
- We use HTML without libraries.
- We use JS without libraries.

### Components and stories

- Components DON'T depend on any other component, they are standalone. Other components might be received as snippets in Svelte 5, but never as part of the component itself.
- Stories are the place where components are used together because it makes sense. Example: Navigation components, Complex Table components, Pagination, etc.
