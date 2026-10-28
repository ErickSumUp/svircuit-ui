import { chromium } from '@playwright/test';

const targets = {
  circuit: 'http://localhost:6040/iframe.html?viewMode=story&id=navigation-sidenavigation--base',
  ours: 'http://localhost:6030/iframe.html?viewMode=story&id=navigation-sidenavigation--base'
};
const browser = await chromium.launch({ channel: 'chrome' });

async function measure(page) {
  return page.evaluate(() => {
    const visible = (el) => el.checkVisibility();
    const find = (text) =>
      [...document.querySelectorAll('a, button, h2, span')].find(
        (el) => visible(el) && el.textContent.trim() === text && el.children.length === 0
      );
    const box = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return `x${Math.round(r.x)} y${Math.round(r.y)} w${Math.round(r.width)} h${Math.round(r.height)} ${s.fontSize}/${s.lineHeight} w${s.fontWeight} ${s.color}`;
    };
    const item = (text) => find(text)?.closest('a, button');
    return {
      label: box(find('Your business')),
      items: box(find('Items')),
      itemsRow: box(item('Items')),
      catalog: box(find('Catalog')),
      catalogRow: box(item('Catalog')),
      reports: box(find('Reports')),
      settingsRow: box(item('Settings')),
      icon: box(item('Payouts')?.querySelector('svg'))
    };
  });
}

for (const [width, mobile] of [
  [1440, false],
  [390, true]
]) {
  for (const scheme of ['light', 'dark']) {
    for (const [name, url] of Object.entries(targets)) {
      const page = await browser.newPage({ viewport: { width, height: 800 } });
      await page.goto(url + (scheme === 'dark' ? '&globals=colorScheme:dark' : ''));
      await page.waitForTimeout(2500);
      if (mobile && name === 'ours') {
        await page.getByRole('button', { name: 'Open navigation' }).click();
        await page.waitForTimeout(500);
      }
      await page.mouse.move(width - 5, 790);
      const file = `/tmp/cmp-${width}-${scheme}-${name}.png`;
      await page.screenshot({ path: file });
      if (scheme === 'light') console.log(width, name, JSON.stringify(await measure(page), null, 1));
      await page.close();
    }
  }
}
await browser.close();
