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
    if (data.data.productSuggestions.products.length === 0) {
      outputData.push({ id, name, status: "Not found" });
    } else {
      const product = data.data.productSuggestions.products.find(
        (product: any) => product.productReference === id
      );
      const linkText = product.linkText;
      const listPrice = product.priceRange.listPrice;
      const listPriceLowPrice = listPrice.lowPrice;
      const listPriceHighPrice = listPrice.highPrice;
      const sellingPrice = product.priceRange.sellingPrice;
      const sellingPriceLowPrice = sellingPrice.lowPrice;
      const sellingPriceHighPrice = sellingPrice.highPrice;
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
      });
    }
  }

  const outputSheet = xlsx.utils.json_to_sheet(outputData);
  xlsx.utils.book_append_sheet(workbook, outputSheet, "output");
  xlsx.writeFile(workbook, "./output.xlsx");
}

run();
