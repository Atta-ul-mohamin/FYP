Parse.Cloud.define("giginfo", async (request) => {
  const {  title , year_Of_Experience  , type, skillLevel , level  , level_1_Description  ,  level_1_Price, level_2_Description , level_2_Price  ,  level_3_Description , level_3_Price , homePrice , selectedCategory1, selectedSubcategory,userId } = request.params;

  try {
    // const userPointer = Parse.User.createWithoutData(userId);
    // console.log(userPointer);
    console.log(userId);
    const create_gig = Parse.Object.extend("create_gig");
    const gig = new create_gig();
    gig.set("userId", { "__type": "Pointer", "className": "MUserT", "objectId": userId });
    gig.set("title", title);
    gig.set("year_Of_Experience", year_Of_Experience);
    gig.set("type", type);
    gig.set("skillLevel", skillLevel);
    gig.set("level", level);
    gig.set("level_1_Description", level_1_Description);
    gig.set("level_1_Price" , level_1_Price)
    gig.set("level_2_Description" , level_2_Description)
    gig.set("level_2_Price", level_2_Price);
    gig.set("level_3_Description" , level_3_Description)
    gig.set("level_3_Price", level_3_Price);
    gig.set("homePrice", homePrice);
    gig.set("selectedCategory1", selectedCategory1);
    gig.set("selectedSubcategory", selectedSubcategory);
     // Associate gig with the user

    const result = await gig.save();
    if( result){
        return{
            status:1
        }
    }
    else{
        return{
            status:0
        }
    }
  } catch (error) {
    console.error("Error creating gig:", error);
    throw new Error("Failed to create gig");
  }
});


Parse.Cloud.define("updateGiginfo", async (request) => {
    const {  gigId ,title , year_Of_Experience  , type, skillLevel , level  , level_1_Description  ,  level_1_Price, level_2_Description , level_2_Price  ,  level_3_Description , level_3_Price , homePrice , selectedCategory1, selectedSubcategory,userId } = request.params;
  

    

        const query = new Parse.Query("create_gig");
        const gig = await query.get(gigId, { useMasterKey: true });
      
        if (gig) {
 
        gig.set("userId", { "__type": "Pointer", "className": "MUserT", "objectId": userId });
        gig.set("title", title);
        gig.set("year_Of_Experience", year_Of_Experience);
        gig.set("type", type);
        gig.set("skillLevel", skillLevel);
        gig.set("level", level);
        gig.set("level_1_Description", level_1_Description);
        gig.set("level_1_Price" , level_1_Price)
        gig.set("level_2_Description" , level_2_Description)
        gig.set("level_2_Price", level_2_Price);
        gig.set("level_3_Description" , level_3_Description)
        gig.set("level_3_Price", level_3_Price);
        gig.set("homePrice", homePrice);
        gig.set("selectedCategory1", selectedCategory1);
        gig.set("selectedSubcategory", selectedSubcategory);
          await gig.save(null, { useMasterKey: true });
          return { 
            status: 1 
           }; // Indicate success
        } else {
          return { status: 0 }; // User not found
        }

      
  });
  

  Parse.Cloud.define("deleteGig", async (request) => {
    const gigId = request.params.gigId;
    const query = new Parse.Query("create_gig");
    console.log(query);
    query.equalTo("objectId", gigId);
     
    const user = await query.first({ useMasterKey: true });
    console.log(user);
    if (user) {
      await user.destroy({ useMasterKey: true });
      return { status: 1 }; // Indicate success
    } else {
      return { status: 0 }; // User not found
    }
  });


Parse.Cloud.define("getGigs", async (request) => {

    const {userId} = request.params; // Get the current user's objectId
    const query = new Parse.Query('create_gig');
    query.equalTo('userId', userId); // Add a filter to get gigs only for the current user
    const results = await query.find();

    return results.map(result => ({
        gigtitle: result.get('title'),
        price: result.get('homePrice'),
        type: result.get('type'),
        objectId : result.id,
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
