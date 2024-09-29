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
    //https://www.nike.cl/_v/segment/graphql/v1?workspace=master&maxAge=medium&appsEtag=remove&domain=store&locale=es-CL&operationName=productSuggestions&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22db333c9cfdf258f98d62add1567adf4e594a8195da9c70f68a1ef614d5a67242%22%2C%22sender%22%3A%22vtex.store-resources%400.x%22%2C%22provider%22%3A%22vtex.search-graphql%400.x%22%7D%2C%22variables%22%3A%22eyJwcm9kdWN0T3JpZ2luVnRleCI6ZmFsc2UsInNpbXVsYXRpb25CZWhhdmlvciI6ImRlZmF1bHQiLCJoaWRlVW5hdmFpbGFibGVJdGVtcyI6ZmFsc2UsImFkdmVydGlzZW1lbnRPcHRpb25zIjp7InNob3dTcG9uc29yZWQiOnRydWUsInNwb25zb3JlZENvdW50IjoyLCJyZXBlYXRTcG9uc29yZWRQcm9kdWN0cyI6ZmFsc2UsImFkdmVydGlzZW1lbnRQbGFjZW1lbnQiOiJhdXRvY29tcGxldGUifSwiZnVsbFRleHQiOiJOSUtFIEZVTEwgRk9SQ0UgTE8iLCJjb3VudCI6NSwic2hpcHBpbmdPcHRpb25zIjpbXSwidmFyaWFudCI6bnVsbH0%3D%22%7D
    `https://nikeclprod.vtexassets.com/_v/segment/graphql/v1?workspace=master&maxAge=medium&appsEtag=remove&domain=store&locale=es-CL&operationName=productSuggestions&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22db333c9cfdf258f98d62add1567adf4e594a8195da9c70f68a1ef614d5a67242%22%2C%22sender%22%3A%22vtex.store-resources%400.x%22%2C%22provider%22%3A%22vtex.search-graphql%400.x%22%7D%2C%22variables%22%3A%22${encodeURIComponent(
      btoa(JSON.stringify(query))
    )}%3D%22%7D`;
  let data;
  try {
    const res = await fetch(url, {});
    data = await res.json();
  } catch (e) {
    // wait 3 seconds and try again
    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const res = await fetch(url, {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9,es;q=0.8",
          "cache-control": "max-age=0",
          priority: "u=0, i",
          "sec-ch-ua":
            '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "service-worker-navigation-preload": "true",
          "upgrade-insecure-requests": "1",
        },
        method: "GET",
      });
      data = await res.json();
    } catch (e) {
      // wait 5 seconds and try again
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const res = await fetch(url, {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9,es;q=0.8",
          "cache-control": "max-age=0",
          priority: "u=0, i",
          "sec-ch-ua":
            '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "service-worker-navigation-preload": "true",
          "upgrade-insecure-requests": "1",
        },
        method: "GET",
      });
      data = await res.json();
      // if it doesn't respond, throw error
    }
  }
  return data;
}
