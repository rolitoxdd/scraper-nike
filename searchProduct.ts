import fetch from "node-fetch";

export default async function searchProduct(id: string): Promise<any> {
  const query = {
    productOriginVtex: false,
    simulationBehavior: "default",
    hideUnavailableItems: false,
    fullText: id,
    count: 5,
    shippingOptions: [],
    variant: null,
  };
  const url = `https://nikeclprod.vtexassets.com/_v/segment/graphql/v1?workspace=master&maxAge=medium&appsEtag=remove&domain=store&locale=es-CL&operationName=productSuggestions&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22c6f3f04750f6176e275d0fe4baaaf295f9be9c7d6ee9b4bdee061d6bb4930fcb%22%2C%22sender%22%3A%22vtex.store-resources%400.x%22%2C%22provider%22%3A%22vtex.search-graphql%400.x%22%7D%2C%22variables%22%3A%22${encodeURIComponent(
    btoa(JSON.stringify(query))
  )}%22%7D`;
  let data;
  try {
    const res = await fetch(url, {});
    data = await res.json();
  } catch (e) {
    // wait 3 seconds and try again
    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const res = await fetch(url, {});
      data = await res.json();
    } catch (e) {
      // wait 5 seconds and try again
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const res = await fetch(url, {});
      data = await res.json();
      // if it doesn't respond, throw error
    }
  }
  return data;
}
