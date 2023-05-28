import fetch from "node-fetch";

export default async function searchProduct(id: string): Promise<any> {
  const url = `https://u.braindw.com/els/nikeclprod?ft=${id}&_from=0&qt=5&sc=1&refreshmetadata=true&aggregations=true&hash=nikecl_produccion_j4ufe&objecttype=vtex`;
  const res = await fetch(url, {});
  const data = await res.json();
  return data;
}
