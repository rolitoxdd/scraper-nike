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
  const url =
    //             https://www.nike.cl/_v/segment/graphql/v1?workspace=master&maxAge=medium&appsEtag=remove&domain=store&locale=es-CL&operationName=productSuggestions&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2238162aedddb0d0a8642b0fdb5beac3ff921e16d77701245aa71d464633a969b7%22%2C%22sender%22%3A%22vtex.store-resources%400.x%22%2C%22provider%22%3A%22vtex.search-graphql%400.x%22%7D%2C%22variables%22%3A%22eyJwcm9kdWN0T3JpZ2luVnRleCI6ZmFsc2UsInNpbXVsYXRpb25CZWhhdmlvciI6ImRlZmF1bHQiLCJoaWRlVW5hdmFpbGFibGVJdGVtcyI6ZmFsc2UsImZ1bGxUZXh0IjoiZHoyNzA4IiwiY291bnQiOjUsInNoaXBwaW5nT3B0aW9ucyI6W10sInZhcmlhbnQiOm51bGx9%22%7D
    `https://nikeclprod.vtexassets.com/_v/segment/graphql/v1?workspace=master&maxAge=medium&appsEtag=remove&domain=store&locale=es-CL&operationName=productSuggestions&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2238162aedddb0d0a8642b0fdb5beac3ff921e16d77701245aa71d464633a969b7%22%2C%22sender%22%3A%22vtex.store-resources%400.x%22%2C%22provider%22%3A%22vtex.search-graphql%400.x%22%7D%2C%22variables%22%3A%22${encodeURIComponent(
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
