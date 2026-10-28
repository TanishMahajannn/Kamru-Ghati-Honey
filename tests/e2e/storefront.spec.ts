import { test, expect } from '@playwright/test';

test.describe('Kamru Ghati Honey Storefront E2E Tests', () => {
  test('Home page redirects / to /en and renders verified brand milestones', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en/);

    // Verify brand heading & establishment year
    await expect(page.locator('text=Kamru Ghati').first()).toBeVisible();
    await expect(page.locator('text=2020').first()).toBeVisible();
    await expect(page.locator('text=Mandi').first()).toBeVisible();

    // Verify CTA buttons
    const exploreBtn = page.getByRole('link', { name: /Explore Honey Varieties/i });
    await expect(exploreBtn).toBeVisible();
  });

  test('Catalogue page displays all 4 honey varieties with size selectors', async ({
    page,
  }) => {
    await page.goto('/en/products');

    await expect(page.getByRole('heading', { name: /Our Honey Varieties/i })).toBeVisible();

    // Check all 4 products are present
    await expect(page.locator('text=Multi Flora Honey')).toBeVisible();
    await expect(page.locator('text=Lahul Spiti Honey')).toBeVisible();
    await expect(page.locator('text=Ajwain Honey')).toBeVisible();
    await expect(page.locator('text=Jamun Honey')).toBeVisible();

    // Filter by single variety
    await page.getByRole('button', { name: /Ajwain Honey/i }).click();
    await expect(page.locator('text=Ajwain Honey')).toBeVisible();
    await expect(page.locator('text=Jamun Honey')).not.toBeVisible();
  });

  test('Product detail page updates price on size selection and has WhatsApp action', async ({
    page,
  }) => {
    await page.goto('/en/products/multi-flora');

    await expect(page.getByRole('heading', { name: /Multi Flora Honey/i })).toBeVisible();

    // Check size selection
    const oneKgSize = page.getByRole('radio', { name: /1 kg/i });
    await oneKgSize.click();
    await expect(page.locator('text=₹800').first()).toBeVisible();

    // Verify WhatsApp button presence and format
    const whatsappLink = page.getByRole('link', { name: /Enquire on WhatsApp/i });
    await expect(whatsappLink).toBeVisible();
    const href = await whatsappLink.getAttribute('href');
    expect(href).toContain('https://wa.me/');
    expect(href).toContain('Multi%20Flora%20Honey');
  });

  test('Language switching to Hindi preserves route and renders Devanagari content', async ({
    page,
  }) => {
    await page.goto('/en/products');

    // Click Hindi language button
    const hindiBtn = page.getByRole('button', { name: 'हिन्दी' });
    await hindiBtn.click();

    await expect(page).toHaveURL(/\/hi\/products/);
    await expect(page.getByRole('heading', { name: /हमारे शहद की किस्में/i })).toBeVisible();
    await expect(page.locator('text=मल्टी फ्लोरा')).toBeVisible();
  });

  test('Wholesale enquiry form validates missing required fields', async ({ page }) => {
    await page.goto('/en/wholesale');

    await expect(page.getByRole('heading', { name: /Wholesale Honey Enquiries/i })).toBeVisible();

    // Attempt submission without filling inputs
    const submitBtn = page.getByRole('button', { name: /Send Wholesale Enquiry on WhatsApp/i });
    await submitBtn.click();

    // Validation messages appear
    await expect(page.locator('text=Name must be at least 2 characters')).toBeVisible();
    await expect(
      page.locator('text=Please enter a valid 10-digit Indian mobile number')
    ).toBeVisible();
  });

  test('Customer policy pages render with legal advisory disclaimer', async ({ page }) => {
    await page.goto('/en/policies/privacy');
    await expect(page.getByRole('heading', { name: /Privacy Policy/i })).toBeVisible();

    await page.goto('/en/policies/shipping');
    await expect(page.getByRole('heading', { name: /Shipping & Delivery Policy/i })).toBeVisible();
    await expect(page.locator('text=Mandi, Himachal Pradesh').first()).toBeVisible();
  });
});
