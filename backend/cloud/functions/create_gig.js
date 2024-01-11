Parse.Cloud.define("giginfo", async (request) => {
  const {  category, gigtitle , discription_about_work , price , discription_about_price, type , min_days , max_days , userId } = request.params;

  try {
    const userPointer = Parse.User.createWithoutData(userId);
    console.log(userPointer);
    console.log(userId);
    const create_gig = Parse.Object.extend("create_gig");
    const gig = new create_gig();
    
    gig.set("title", gigtitle);
    gig.set("category", category);
    gig.set("discription_about_work", discription_about_work);
    gig.set("price", price);
    gig.set("discription_about_price", discription_about_price);
    gig.set("type", type);
    gig.set("min_days" , min_days)
    gig.set("max_days" , max_days)
    gig.set("userId", userId); // Associate gig with the user

    const result = await gig.save();
    return result;
  } catch (error) {
    console.error("Error creating gig:", error);
    throw new Error("Failed to create gig");
  }
});



Parse.Cloud.define("getGigs", async (request) => {

    const {userId} = request.params; // Get the current user's objectId
    const query = new Parse.Query('create_gig');
    query.equalTo('userId', userId); // Add a filter to get gigs only for the current user
    const results = await query.find();

    return results.map(result => ({
        gigtitle: result.get('title'),
        price: result.get('price'),
        discription: result.get('discription_about_work'),
    }));
});



// card.js


// Define a function to create cards for all gigs
// card.js

// Define a function to create cards for new gigs
Parse.Cloud.define("createCardsForGigs", async () => {
    // Retrieve all gigs
    const gigQuery = new Parse.Query("create_gig");
    const gigs = await gigQuery.find();

    for (const gig of gigs) {
        const gigId = gig.id;

        // Check if a card already exists for this gig
        const cardQuery = new Parse.Query("Card");
        cardQuery.equalTo("object_Id_Of_Gig", gigId);
        const cardExists = await cardQuery.first();

        if (!cardExists) {
            const userId = gig.get("userId");

            // Retrieve the corresponding user information
            const userQuery = new Parse.Query("MUserT");
            userQuery.equalTo("objectId", userId);
            const user = await userQuery.first();

            if (user) {
                // Create a new card object
                const Card = Parse.Object.extend("Card");
                const card = new Card();

                card.set("name", user.get("firstname"));
                card.set("title", gig.get("title"));
                card.set("price", gig.get("price"));
                card.set("category", gig.get("category"));
                card.set("object_Id_Of_Gig", gigId);
                card.set("object_Id_Of_signUpTeacher", userId);

                // Save the card
                try {
                    await card.save();
                } catch (error) {
                    console.error("Error creating card for gig ID " + gigId + ":", error);
                }
            }
        }
    }

    return "Cards creation process for new gigs completed";
});
