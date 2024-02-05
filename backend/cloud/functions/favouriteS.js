Parse.Cloud.define("addFavourite", async (request) => {
  const { CardObjectId, currentUserObjectId } = request.params;

  const Favourite = Parse.Object.extend("favourites");
  const query = new Parse.Query(Favourite);
  query.equalTo("CardId", CardObjectId);
  query.equalTo("userId", currentUserObjectId);

  const existingEntry = await query.first();
  if (existingEntry) {
    // Entry already exists
    return { status: 0, message: 'It is already added ' };
  }

  // If no existing entry, create a new one
  const favourite = new Favourite();
  favourite.set("CardId", CardObjectId);
  favourite.set("userId", currentUserObjectId);

  await favourite.save();
  return { status: 1, message: ' Added to your favourites' };
});

Parse.Cloud.define("getFavorites", async (request) => {
  const { userId } = request.params;

  // Query to get favorite items for the user
  const Favourite = Parse.Object.extend("favourites");
  const favoriteQuery = new Parse.Query(Favourite);
  favoriteQuery.equalTo("userId", userId);

  const favorites = await favoriteQuery.find();
  const cardIds = favorites.map(f => f.get("CardId"));

  // Query to get card details
  const Card = Parse.Object.extend("Card");
  const cardQuery = new Parse.Query(Card);
  cardQuery.containedIn("objectId", cardIds);

  const cards = await cardQuery.find();
  const cardMap = cards.reduce((map, card) => {
    map[card.id] = card;
    return map;
  }, {});

  // Map each favorite to its details and include the favorite's object ID
  return favorites.map(favorite => {
    const card = cardMap[favorite.get("CardId")];
    return {
      favoriteObjectId: favorite.id, // Returning the objectId of the favorite
      gigtitle: card ? card.get("title") : '',
      gigprice: card ? card.get("price") : '',
      firstname: card ? card.get("name") : ''
    };
  });
});



// In your Parse Server cloud code (e.g., main.js)
Parse.Cloud.define("removeFavorite", async (request) => {
  const { objectId } = request.params;
  console.log(objectId);
  const Favourite = Parse.Object.extend("favourites");
  const query = new Parse.Query(Favourite);

  try {
    // Find the favorite object by its objectId
    const favoriteObject = await query.get(objectId, { useMasterKey: true });
    if (favoriteObject) {
      // Delete the favorite object
      await favoriteObject.destroy({ useMasterKey: true });
      return { success: true, message: "Favorite removed successfully." };
    } else {
      throw new Error("Favorite object not found");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error in removing favorite");
  }
});