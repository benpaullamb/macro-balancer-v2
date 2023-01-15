import axios from 'axios';
import Food from 'Food';
import { JSDOM } from 'jsdom';
import { Tabletojson as tableToJSON } from 'tabletojson';

interface TescoProduct {
  id: string;
  name: string;
  link: string;
  image: string;
}

interface TableRow {
  [key: string]: string;
}

export async function searchTesco(name: string): Promise<TescoProduct[]> {
  const { data: searchPage } = await axios.get(
    `https://www.tesco.com/groceries/en-GB/search?query=${encodeURIComponent(name)}`
  );
  const { document } = new JSDOM(searchPage).window;

  const tiles = Array.from(document.querySelectorAll('[id^="tile"]'));

  return tiles.map(tile => {
    const title = tile.querySelector('.product-details--wrapper h3 a')!;
    const image = tile.querySelector('.product-image-wrapper img')!;

    const link = title.getAttribute('href')!;
    const linkPath = link.split('/');

    return {
      id: linkPath[linkPath.length - 1],
      name: title.textContent!,
      link: `https://www.tesco.com${link}`,
      image: image.getAttribute('src')!
    };
  });
}

export async function getFoodFromTescoProduct(product: TescoProduct): Promise<Food | undefined> {
  const { data: productPage } = await axios.get(
    `https://www.tesco.com/groceries/en-GB/products/${encodeURIComponent(product.id)}`
  );
  const { document } = new JSDOM(productPage).window;

  const tableElement = document.querySelector('table.product__info-table')?.outerHTML;
  if (!tableElement) {
    return;
  }
  const [table] = tableToJSON.convert(tableElement);

  return new Food({
    name: product.name,
    nutritionPer100g: {
      protein: getNutrientPer100(table, 'protein'),
      carbs: getNutrientPer100(table, 'carb'),
      fat: getNutrientPer100(table, 'fat')
    }
  });
}

function getNutrientPer100(table: TableRow[], nutrient: string): number {
  const cols = Object.keys(table[0]);
  const col100 = cols.find(col => col.includes('100'))!;
  const typicalCol = cols.find(col => col.toLowerCase().includes('typical'))!;

  const nutrientRow = table.find((row: TableRow) =>
    row[typicalCol].toLowerCase().includes(nutrient)
  )!;
  const nutrientGrams = nutrientRow[col100];
  return Number(nutrientGrams.slice(0, -1));
}
