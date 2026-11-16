import { fireEvent, render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import ImageInputExample from './ImageInputExample.test.svelte';

const file = new File(['image'], 'coffee.png', { type: 'image/png' });

function getInput() {
  return screen.getByLabelText<HTMLInputElement>('Upload an image');
}

function getImage() {
  return document.querySelector('img') as HTMLImageElement;
}

beforeEach(() => {
  URL.createObjectURL = vi.fn(() => 'blob:preview');
  URL.revokeObjectURL = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('should match the snapshot', () => {
  const { container } = render(ImageInputExample, { src: 'coffee.jpg' });

  expect(container).toMatchSnapshot();
});

describe('picking an image', () => {
  test('should call onchange with the picked file', async () => {
    const onchange = vi.fn();
    render(ImageInputExample, { onchange });

    await userEvent.upload(getInput(), file);

    expect(onchange).toHaveBeenCalledWith(file);
  });

  test('should show a preview of the picked file', async () => {
    render(ImageInputExample);

    await userEvent.upload(getInput(), file);

    expect(getImage()).toHaveAttribute('src', 'blob:preview');
  });

  test('should prefer the src over the preview', async () => {
    render(ImageInputExample, { src: 'coffee.jpg' });

    await userEvent.upload(getInput(), file);

    expect(getImage()).toHaveAttribute('src', 'coffee.jpg');
  });

  test('should only accept images', () => {
    render(ImageInputExample);

    expect(getInput()).toHaveAttribute('accept', 'image/*');
  });

  test('should show the loading state until onchange settles', async () => {
    let resolve = () => {};
    const onchange = () => new Promise<void>((done) => (resolve = done));
    render(ImageInputExample, { onchange });

    await userEvent.upload(getInput(), file);
    expect(getInput()).toBeDisabled();
    expect(screen.getByText('Uploading').parentElement).toHaveClass('loading');

    resolve();
    await vi.waitFor(() => expect(getInput()).toBeEnabled());
    expect(screen.getByText('Uploading').parentElement).not.toHaveClass('loading');
  });

  test('should stop loading when onchange rejects', async () => {
    const onchange = () => Promise.reject(new Error('Upload failed'));
    render(ImageInputExample, { onchange });

    await userEvent.upload(getInput(), file);

    await vi.waitFor(() => expect(getInput()).toBeEnabled());
  });

  test('should accept a pasted image', async () => {
    const onchange = vi.fn();
    render(ImageInputExample, { onchange });

    getInput().focus();
    await userEvent.paste({ files: [file] } as unknown as DataTransfer);

    expect(onchange).toHaveBeenCalledWith(file);
  });

  test('should accept a dropped image', async () => {
    const onchange = vi.fn();
    render(ImageInputExample, { onchange });
    const label = getImage().parentElement as HTMLLabelElement;

    await fireEvent.dragEnter(label, { dataTransfer: { files: [file] } });
    expect(label).toHaveClass('dragging');

    await fireEvent.drop(label, { dataTransfer: { files: [file] } });
    expect(label).not.toHaveClass('dragging');
    expect(onchange).toHaveBeenCalledWith(file);
  });

  test('should revoke the previous preview', async () => {
    render(ImageInputExample);

    await userEvent.upload(getInput(), file);
    await userEvent.upload(getInput(), file);

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:preview');
  });
});

describe('clearing the image', () => {
  test('should show a decorative add button without an image', () => {
    render(ImageInputExample);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('should call onclear from the clear button', async () => {
    const onclear = vi.fn();
    render(ImageInputExample, { src: 'coffee.jpg', onclear });

    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(onclear).toHaveBeenCalledOnce();
  });

  test('should clear the preview', async () => {
    const { rerender } = render(ImageInputExample);
    await userEvent.upload(getInput(), file);

    await rerender({ src: 'coffee.jpg' });
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    await rerender({ src: undefined });

    await vi.waitFor(() => expect(getImage()).not.toHaveAttribute('src'));
  });

  test('should label the clear button with its tooltip', () => {
    render(ImageInputExample, { src: 'coffee.jpg' });

    expect(screen.getByRole('button', { name: 'Clear' })).toHaveAttribute(
      'aria-labelledby',
      screen.getByRole('tooltip', { hidden: true }).id
    );
  });

  test('should dismiss the tooltip with Escape', async () => {
    render(ImageInputExample, { src: 'coffee.jpg' });

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard('{Escape}');

    expect(screen.getByRole('tooltip', { hidden: true })).toHaveClass('dismissed');
  });
});

describe('field', () => {
  test('should hide the label visually by default', () => {
    render(ImageInputExample);

    const labelTexts = screen.getAllByText('Upload an image');
    expect(labelTexts.every((element) => element.classList.contains('hide-visually'))).toBe(true);
  });

  test('should show the label and the optional label', () => {
    render(ImageInputExample, { hideLabel: false, optionalLabel: 'optional' });

    expect(screen.getByText('(optional)', { exact: false })).toBeVisible();
  });

  test('should mark the input as invalid with a live hint', () => {
    render(ImageInputExample, { invalid: true, validationHint: 'Too large' });

    expect(getInput()).toHaveAttribute('aria-invalid', 'true');
    expect(getInput()).toHaveAccessibleDescription('Too large');
    expect(screen.getByRole('status')).toHaveTextContent('Too large');
  });

  test('should disable the input and the clear button', () => {
    render(ImageInputExample, { src: 'coffee.jpg', disabled: true });

    expect(getInput()).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeDisabled();
  });
});
