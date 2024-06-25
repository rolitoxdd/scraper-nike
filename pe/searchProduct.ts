import fetch from "node-fetch";
import { parse } from "node-html-parser";
import { cleanPrice } from "./cleanPrice";

export async function searchProduct(
  id: string
): Promise<{ url: string; price: string; fullPrice: string } | null> {
  const response = await fetch(
    "https://www.nike.com.pe/on/demandware.store/Sites-NikePeru-Site/es_PE/SearchServices-ShowPreview?q=" +
      id
  );

  const text = await response.text();

  const root = parse(text);

  const productsRoot = root.querySelectorAll(".product-preview");
  const product = productsRoot.find((p) =>
    p.attributes["href"].toLowerCase().includes(id.toLowerCase())
  );
  if (!product) {
    return null;
  }
  const url = product.attributes["href"];
  const priceRoot = product.querySelector(".price");

  const price = cleanPrice(priceRoot?.querySelector(".sales")?.text) || "";
  const fullPrice =
    cleanPrice(priceRoot?.querySelector(".strike-through")?.text) ||
    price ||
    "";

  return { url, price, fullPrice };
}

export default searchProduct;
