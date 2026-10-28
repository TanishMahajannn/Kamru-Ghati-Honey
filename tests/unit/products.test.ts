import { describe, it, expect } from 'vitest';
import { PRODUCTS, getProductBySlug, getActiveProducts, getFeaturedProducts } from '@/data/products';

describe('Product Catalogue Data & Sourcing Consistency', () => {
  it('contains all 4 confirmed launch varieties', () => {
    const slugs = PRODUCTS.map((p) => p.slug);
    expect(slugs).toContain('multi-flora');
    expect(slugs).toContain('lahul-spiti');
    expect(slugs).toContain('ajwain');
    expect(slugs).toContain('jamun');
  });

  it('all products have bilingual names and descriptions', () => {
    PRODUCTS.forEach((product) => {
      expect(product.name.en).toBeTruthy();
      expect(product.name.hi).toBeTruthy();
      expect(product.description.en).toBeTruthy();
      expect(product.description.hi).toBeTruthy();
      expect(product.imageAlt.en).toBeTruthy();
      expect(product.imageAlt.hi).toBeTruthy();
    });
  });

  it('all products have configured size options (250g, 500g, 1kg)', () => {
    PRODUCTS.forEach((product) => {
      const grams = product.sizes.map((s) => s.grams);
      expect(grams).toContain(250);
      expect(grams).toContain(500);
      expect(grams).toContain(1000);
    });
  });

  it('correctly handles unconfirmed prices as null rather than 0 or fake discounts', () => {
    // Lahul Spiti 250g and Jamun 1kg are intentionally set to null in seed data
    const lahul = getProductBySlug('lahul-spiti');
    expect(lahul).toBeDefined();
    const lahul250 = lahul?.sizes.find((s) => s.grams === 250);
    expect(lahul250?.pricePaise).toBeNull();

    const jamun = getProductBySlug('jamun');
    expect(jamun).toBeDefined();
    const jamun1kg = jamun?.sizes.find((s) => s.grams === 1000);
    expect(jamun1kg?.pricePaise).toBeNull();
  });

  it('retrieves active products and featured products correctly', () => {
    const active = getActiveProducts();
    expect(active.length).toBe(PRODUCTS.length);

    const featured = getFeaturedProducts();
    expect(featured.length).toBeGreaterThan(0);
    featured.forEach((p) => {
      expect(p.featured).toBe(true);
    });
  });
});
