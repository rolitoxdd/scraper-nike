export function cleanPrice(price?: string) {
  if (price) {
    return price.trim().replace("S/ ", "").replace(",", "").replace(".", ",");
  }
}
