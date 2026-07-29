import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Pagination, { GAP, getPages } from './Pagination.svelte';

const baseProps = { label: 'Pagination', onChange: () => {} };

test('should render every page when they fit', () => {
  expect(getPages(5, 1)).toEqual([1, 2, 3, 4, 5]);
  expect(getPages(7, 4)).toEqual([1, 2, 3, 4, 5, 6, 7]);
});

test('should never render more than seven items, however many pages there are', () => {
  for (const totalPages of [8, 42, 1000, 10_000_000]) {
    for (const currentPage of [1, 4, 5, Math.floor(totalPages / 2), totalPages - 3, totalPages]) {
      const pages = getPages(totalPages, currentPage);

      expect(pages).toHaveLength(7);
      expect(pages[0]).toBe(1);
      expect(pages.at(-1)).toBe(totalPages);
    }
  }
});

test('should window around the current page', () => {
  expect(getPages(1000, 1)).toEqual([1, 2, 3, 4, 5, GAP, 1000]);
  expect(getPages(1000, 500)).toEqual([1, GAP, 499, 500, 501, GAP, 1000]);
  expect(getPages(1000, 1000)).toEqual([1, GAP, 996, 997, 998, 999, 1000]);
});

test('should clamp a page outside the range', () => {
  expect(getPages(10, 0)).toEqual([1, 2, 3, 4, 5, GAP, 10]);
  expect(getPages(10, 99)).toEqual([1, GAP, 6, 7, 8, 9, 10]);
});

test('should render nothing with a single page', () => {
  const { container } = render(Pagination, { ...baseProps, totalPages: 1 });

  expect(container.querySelector('nav')).toBeNull();
});

test('should mark the current page', () => {
  const { getByRole } = render(Pagination, { ...baseProps, totalPages: 5, currentPage: 3 });

  expect(getByRole('button', { name: 'Go to page 3' })).toHaveAttribute('aria-current', 'page');
});

test('should not make the gap focusable', () => {
  const { container, getAllByRole } = render(Pagination, {
    ...baseProps,
    totalPages: 1000,
    currentPage: 500
  });

  expect(container.querySelectorAll('.gap')).toHaveLength(2);
  expect(getAllByRole('button', { name: /Go to page/ })).toHaveLength(5);
});
