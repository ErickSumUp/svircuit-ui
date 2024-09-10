<script context="module" lang="ts">
  import Card from '$lib/components/Card.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Typography/Card',
    component: Card,
    argTypes: {
      spacing: {
        control: { type: 'radio', defaultValue: 'mega' },
        options: ['mega', 'giga']
      },
      children: {
        control: { type: 'text' }
      }
    },
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script lang="ts">
  import CardHeader from '$lib/stories/CardHeader.svelte';
  import Headline from '$lib/components/Headline.svelte';
  import Body from '$lib/components/Body.svelte';
  import CardFooter from '$lib/stories/CardFooter.svelte';
  import Button from '$lib/components/Button.svelte';
  import ButtonGroup from '$lib/stories/ButtonGroup.svelte';
  import Stack from '$lib/components/Stack.svelte';

  setTemplate(template);
</script>

{#snippet template({ children, ...args }: Args<typeof Story>)}
  <Card {...args}><Body>{children}</Body></Card>
{/snippet}

<Story name="Base" args={{ spacing: 'giga', children: 'Content' }} />

<Story name="Spacings">
  <div class="stack">
    <Card spacing="mega">
      <div
        style="
				background: var(--cui-bg-highlight);
				width: 15rem;
				height: 10rem;
			"
      ></div>
    </Card>
    <Card spacing="giga">
      <div
        style="
				background: var(--cui-bg-highlight);
				width: 15rem;
				height: 10rem;
			"
      ></div>
    </Card>
  </div>
</Story>

<Story name="WithHeader">
  <div style="display:flex; flex-direction: row; gap: 2rem">
    <Card>
      <CardHeader title="Title" subtitle="Subtitle">
        <Headline size="four" as="h2">Card Heading</Headline>
      </CardHeader>
      <Body>This is some text showing in my card</Body>
    </Card>
    <Card>
      <CardHeader title="Title" subtitle="Subtitle" showCloseButton>
        <Headline size="four" as="h2">Card Heading w/Button</Headline>
      </CardHeader>
      <Body>This is some text showing in my card</Body>
    </Card>
  </div>
</Story>

<Story name="WithFooter">
  <Stack>
    <Card>
      <Body>This is some text showing in my card</Body>
      <CardFooter>
        <ButtonGroup>
          <Button stretch={true} variant="primary">Confirm</Button>
          <Button stretch={true} variant="tertiary">Cancel</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
    <Card>
      <Body>This is some text showing in my card</Body>
      <CardFooter align="left">
        <ButtonGroup>
          <Button stretch={true} variant="primary">Confirm</Button>
          <Button stretch={true} variant="tertiary">Cancel</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  </Stack>
</Story>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
  }

  @media screen and (min-width: 600px) {
    .stack {
      flex-direction: row;
    }
  }
</style>
