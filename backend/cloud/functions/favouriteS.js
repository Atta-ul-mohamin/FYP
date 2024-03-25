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
  // favourite.set("CardId", CardObjectId);
  favourite.set("userId", { "__type": "Pointer", "className": "MUser", "objectId": currentUserObjectId });
  // favourite.set("userId", currentUserObjectId);
  favourite.set("cardId", { "__type": "Pointer", "className": "create_gig", "objectId": CardObjectId });

  await favourite.save();
  return { status: 1, message: ' Added to your favourites' };
});

Parse.Cloud.define("getFavorites", async (request) => {
  const { userId } = request.params;

  // Query to get favorite items for the user
  const Favourite = Parse.Object.extend("favourites");
  const favoriteQuery = new Parse.Query(Favourite);
  favoriteQuery.equalTo("userId", Parse.Object.extend("MUserT").createWithoutData(userId));

  const favorites = await favoriteQuery.find();
  const cardIds = favorites.map(f => f.get("cardId"));

  // Query to get card details and include user data
  const Card = Parse.Object.extend("create_gig");
  const cardQuery = new Parse.Query(Card);
  cardQuery.containedIn("objectId", cardIds);
  cardQuery.include("userId"); // Include the user object related to the gig

  const cards = await cardQuery.find();
  const cardMap = cards.reduce((map, card) => {
    map[card.id] = {
      objectId: card.id, // Include the objectId of the create_gig item
      title: card.get("title"),
      homePrice: card.get("homePrice"),
      userFirstname: card.get("userId") ? card.get("userId").get("firstname") : null // Get firstname from the included user object
    };
    return map;
  }, {});

  // Map each favorite to its details and include the favorite's object ID, user's firstname, and the objectId of create_gig
  return favorites.map(favorite => {
    const cardDetail = cardMap[favorite.get("cardId")];
    return {
      favoriteObjectId: favorite.id, // Returning the objectId of the favorite
      gigObjectId: cardDetail ? cardDetail.objectId : '', // Include the objectId of the create_gig
      gigtitle: cardDetail ? cardDetail.title : '',
      gigprice: cardDetail ? cardDetail.homePrice : '',
      userFirstname: cardDetail ? cardDetail.userFirstname : '' // Include the firstname of the user
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