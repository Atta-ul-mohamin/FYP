
Parse.Cloud.define("getCardData", async (request) => {
  const cardQuery = new Parse.Query("Card");

  const cards = await cardQuery.find();
  const combinedData = cards.map(card => {
      return {
           objectId: card.id,
          gigtitle: card.get("title"),
          gigprice: card.get("price"),
          firstname: card.get("name")
      };
  });

  return combinedData;
});





// In your Parse Server Cloud Code (user.js)
Parse.Cloud.define("getCardById", async (request) => {
  const { id } = request.params;
  const Card = Parse.Object.extend("Card");
  const query = new Parse.Query(Card);

  try {
    const card = await query.get(id);
    return {
      status: 1,
      data: card,
    };
  } catch (error) {
    console.error('Error fetching card by ID', error);
    return {
      status: 0,
      message: "Error fetching card by ID",
      error: error.message,
    };
  }
});