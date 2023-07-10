import xlsx from "xlsx";
import searchProduct from "./searchProduct.js";

type Row = {
  id: string;
  name: string;
};

type OutputRow = Row & {
  status: string;
  url?: string;
  price?: number;
  listPrice?: number;
  priceWithoutDiscount?: number;
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
    if (data.length === 0) {
      outputData.push({ id, name, status: "Not found" });
    } else {
      const linkText: string = data.hits.hits[0]._source.linkText;
      const price: number =
        data.hits.hits[0]._source.items[0].sellers[0].commertialOffer.Price;
      const listPrice: number =
        data.hits.hits[0]._source.items[0].sellers[0].commertialOffer.ListPrice;
      const priceWithoutDiscount: number =
        data.hits.hits[0]._source.items[0].sellers[0].commertialOffer
          .PriceWithoutDiscount;
      const title = data.hits.hits[0]._source.productName;
      const description = data.hits.hits[0]._source.description;
      outputData.push({
        id,
        name,
        status: "Found",
        url: `https://www.nike.cl/${linkText}/p`,
        price,
        listPrice,
        priceWithoutDiscount,
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
