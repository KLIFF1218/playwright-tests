import { test, expect, Page, Locator } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: { type: string; value: string };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo Playwright',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Community' }),
    name: 'Community',
    text: 'Community',
    attribute: {
      type: 'href',
      value: '/community/welcome',
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub repository',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright',
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord server',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord',
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Switch between dark and light',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Search (Ctrl+K)' }),
    name: 'Search (Ctrl+K)',
  },
];

const lightModes = ['light', 'dark'];

test.describe('тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения  навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test('Проверка названий элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      test.step(`Проверка отображения текста ${name}`, async () => {
        if (text) {
          await expect.soft(locator(page)).toContainText(text);
        }
      });
    });
  });

  test('Проверка перехода по href в навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, attribute }) => {
      if (attribute) {
        test.step('Проверка по href ', async () => {
          await expect(locator(page)).toHaveAttribute(
            attribute.type,
            attribute.value,
          );
        });
      }
    });
  });

  test('Проверка смены темы', async ({ page }) => {
    await page.goto('http://playwright.dev/');

    await page
      .getByRole('button', { name: 'Switch between dark and light' })
      .click();
    await expect
      .soft(page.locator('html'))
      .toHaveAttribute('data-theme', 'light');
  });

  test('Отображается заголовок', async ({ page }) => {
    await page.goto('http://playwright.dev/');

    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toBeVisible();

    await expect
      .soft(page.getByRole('heading', { level: 1 }))
      .toContainText(
        'Playwright enables reliable end-to-end testing for modern web apps.',
      );
  });

  test('проверка Get Started ', async ({ page }) => {
    await page.goto('http://playwright.dev/');

    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toBeVisible();
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toContainText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
  });

  lightModes.forEach(theme => {
    test(`Проверка стилей активного ${theme} мода`, async ({ page }) => {
      await page.evaluate(theme => {
        document.querySelector('html')?.setAttribute('data-theme', theme)
      }, theme);
      await expect(page).toHaveScreenshot(`pageWith${theme}.png`);
    });
  });
});
