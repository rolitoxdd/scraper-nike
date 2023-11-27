import xlsx from "xlsx";
import searchProduct from "./searchProduct.js";

type Row = {
  id: string;
  name: string;
};

type OutputRow = Row & {
  status: string;
  url?: string;
  listPriceLowPrice?: number;
  listPriceHighPrice?: number;
  sellingPriceLowPrice?: number;
  sellingPriceHighPrice?: number;
  listPrice?: string;
  price?: string;
  title?: string;
  description?: string;
};

async function run() {
  const workbook = xlsx.readFile("./input.xlsx");

  const excelData: Row[] = xlsx.utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[0]]
  );

  const outputData: OutputRow[] = [];

  let i = 0;
  for (const { id, name } of excelData) {
    console.log(`fetching ${++i} of ${excelData.length}: ${id}`);
    const data = await searchProduct(id);

    let products = data.data.productSuggestions.products;

    if (products === null) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const data = await searchProduct(id);
      products = data.data.productSuggestions.products;
    }

    const product = products?.find(
      (product: any) =>
        product.productReference.toLowerCase() === id.toLowerCase()
    );
    if (!product) {
      outputData.push({ id, name, status: "Not found" });
    } else {
      const linkText = product.linkText;
      const listPrice = product.priceRange.listPrice;
      const listPriceLowPrice = listPrice.lowPrice;
      const listPriceHighPrice = listPrice.highPrice;
      const sellingPrice = product.priceRange.sellingPrice;
      const sellingPriceLowPrice = sellingPrice.lowPrice;
      const sellingPriceHighPrice = sellingPrice.highPrice;

      const firstItem = product.items[0];
      const firstSeller = firstItem.sellers[0];

      const listPrice1 = firstSeller.commertialOffer.ListPrice;
      const price1 = firstSeller.commertialOffer.Price;

      const title = product.productName;
      const description = product.description;
      outputData.push({
        id,
        name,
        status: "Found",
        url: `https://www.nike.cl/${linkText}/p`,
        listPriceLowPrice,
        listPriceHighPrice,
        sellingPriceLowPrice,
        sellingPriceHighPrice,
        title,
        description,
        price: price1,
        listPrice: listPrice1,
      });
    }
  }

  const outputSheet = xlsx.utils.json_to_sheet(outputData);
  xlsx.utils.book_append_sheet(workbook, outputSheet, "output");
  xlsx.writeFile(workbook, "./output.xlsx");
}

run();
