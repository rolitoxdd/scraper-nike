import xlsx from "xlsx";
import searchProduct from "./searchProduct.js";

type Row = {
  id: string;
  name: string;
};

type OutputRow = Row &
  (
    | {
        status: "Not found";
      }
    | {
        status: "Found";
        url: string;
        price: string;
        fullPrice: string;
      }
  );

async function run() {
  const workbook = xlsx.readFile("./input.xlsx");

  const excelData: Row[] = xlsx.utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[0]]
  );

  const outputData: OutputRow[] = [];
  let i = 0;
  for (const { id, name } of excelData) {
    console.log(`searching ${++i} of ${excelData.length}: ${id}`);
    const data = await searchProduct(id);
    if (!data) {
      outputData.push({ id, name, status: "Not found" });
    } else {
      outputData.push({
        id,
        name,
        status: "Found",
        url: data.url,
        price: data.price,
        fullPrice: data.fullPrice,
      });
    }
  }
  const outputSheet = xlsx.utils.json_to_sheet(outputData);
  xlsx.utils.book_append_sheet(workbook, outputSheet, "output");
  xlsx.writeFile(workbook, "./output.xlsx");
}

run();
