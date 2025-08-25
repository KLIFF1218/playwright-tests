import { test, expect } from '@playwright/test';

test('Главная страница отображает карточки товаров', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const productsGrid = page.locator('div.bg-white.grid');
  await expect(productsGrid).toBeVisible();

  const cards = productsGrid.locator('div.md\\:w-\\[340px]\\');
  await expect(cards).not.toHaveCount(0);

  const firstCard = cards.first();
  await expect(firstCard.locator('img')).toBeVisible();
  await expect(firstCard.locator('p.font-bold')).toContainText('₽');

  const link = firstCard.locator('a[href^="/product/"]');
  await expect(link).toHaveAttribute('href', /\/product\/.+/);
})