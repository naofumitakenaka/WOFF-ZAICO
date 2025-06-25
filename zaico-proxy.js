export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const keyword = url.searchParams.get("search");
    const ZAICO_TOKEN = "2dYz6xYjMYj8v9vW6f17nCd2URi83QZp";

    if (!keyword) {
      return new Response("Missing 'search' parameter", { status: 400 });
    }

    const apiUrl = `https://api.zaico.io/v1/items?search_word=${encodeURIComponent(keyword)}`;

    const zaicoResponse = await fetch(apiUrl, {
      headers: {
        "Authorization": `Bearer ${ZAICO_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    const result = await zaicoResponse.text(); // JSON形式で受け取る

    return new Response(result, {
      status: zaicoResponse.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // CORS対応
      }
    });
  }
}
