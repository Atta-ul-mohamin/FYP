Parse.Cloud.define("addFavourite", async (request) => {
  const { CardObjectId, currentUserObjectId } = request.params;

  const Favourite = Parse.Object.extend("favourites");
  const query = new Parse.Query(Favourite);
  query.equalTo("cardId", CardObjectId);
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

  // Create a reference to the user
  const userRef = Parse.Object.extend("MUserT").createWithoutData(userId);

  // Query to get favorite items for the user
  const Favourite = Parse.Object.extend("favourites");
  const favoriteQuery = new Parse.Query(Favourite);
  favoriteQuery.equalTo("userId", userRef); // Match favorites by user pointer

  // Attempt to fetch all matching favorites
  const favorites = await favoriteQuery.find();

  // Prepare an array to hold the combined favorite and gig data
  let combinedData = [];

  for (let favorite of favorites) {
    // Extract the cardId pointer from each favorite
    const cardIdPointer = favorite.get("cardId");

    if (cardIdPointer) {
      // Fetch the corresponding create_gig entry
      const Card = Parse.Object.extend("create_gig");
      const cardQuery = new Parse.Query(Card);
      cardQuery.equalTo("objectId", cardIdPointer.id); // Match by objectId
      cardQuery.include("userId"); // Include the user object related to the gig

      const card = await cardQuery.first(); // Use .first() assuming unique cardId

      if (card) {
        // Combine the favorite and card data
        combinedData.push({
          favoriteId: favorite.id,
          gig: {
            objectId: card.id,
            title: card.get("title"),
            homePrice: card.get("homePrice"),
            // Add more fields from the create_gig entry as needed
          },
          user: {
            firstname: card.get("userId") ? card.get("userId").get("firstname") : null
            // Include additional user details as needed
          }
        });
      }
    }
  }

  return combinedData;
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




// Define a Cloud Code function for handling live queries
Parse.Cloud.define("subscribeToFavourites", async (request) => {
  // Define the query for the "favourites" class
  const query = new Parse.Query('favourites');

  // Subscribe to the live query
  const subscription = query.subscribe();

  // Define event handlers for various live query events
  subscription.on('open', () => {
      console.log('LiveQuery subscription opened');
  });

  subscription.on('create', (object) => {
      console.log('New object created:', object);
  });

  subscription.on('update', (object) => {
      console.log('Object updated:', object);
  });

  subscription.on('delete', (object) => {
      console.log('Object deleted:', object);
  });

  subscription.on('close', () => {
      console.log('LiveQuery subscription closed');
  });

  // Return a success message indicating that the subscription is active
  return { success: true, message: "LiveQuery subscription started for 'favourites' class." };
});
