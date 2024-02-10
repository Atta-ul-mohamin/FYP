

  // const { userId } = request.params;
  // const userQuery = new Parse.Query("MUserT");
  // userQuery.equalTo("objectId", userId);
  // const user = await userQuery.first();

  // if (user) {
  //     // Create a new card object
  //     const Card = Parse.Object.extend("create_gig");
  //     const card = new Card();

  // const cards = await cardQuery.find();
  // const combinedData = cards.map(card => {
  //     return {
  //          objectId: card.id,
  //         gigtitle: card.get("title"),
  //         gigprice: card.get("price"),
  //         firstname: card.get("name")
  //     };
  // });

  // return combinedData;
  Parse.Cloud.define("getGigData", async (request) => {
    const {userId} = request.params; // Get the current user's objectId
    const query = new Parse.Query('create_gig');
  
    // query.equalTo('userId', userId); // Add a filter to get gigs only for the current user
    query.include('userId'); // Ensure to include the user object to access its data
  
    const results = await query.find();
  
    return results.map(result => {
      // Access the user object from the pointer
      const user = result.get('userId');
  
      return {
        objectId: result.id, 
        price: result.get('homePrice'),
        title: result.get('title'),
        firstname: user.get('firstname'),
         // Access the firstname field from the MUserT class
      };
    });
  });
  





// In your Parse Server Cloud Code (user.js)
Parse.Cloud.define("getGigById", async (request) => {
  const { id } = request.params;
  const Card = Parse.Object.extend("create_gig");
  const query = new Parse.Query(Card);

  query.include("userId"); // Include the pointer to fetch the related MUserT object

  try {
    const card = await query.get(id);
    const user = card.get("userId"); // This is the MUserT object, could be null if pointer does not exist

    // Constructing response data with fields from create_gig and user object
    const responseData = {
      objectId: card.id, // ID of the create_gig object
      title: card.get("title"), // Example field from create_gig
      price: card.get("homePrice"),
      type: card.get("type"),
       experience:card.get("year_Of_Experience"),
      skillLevel:card.get("skillLevel"),
      level:card.get("level"),
      level_1_price: card.get("level_1_Price"),
      level_2_price: card.get("level_2_Price"),
      level_3_price: card.get("level_3_Price"),
      level_1_Description: card.get("level_1_Description"),
      level_2_Description: card.get("level_2_Description"),
      level_3_Description: card.get("level_3_Description"),
    
    };

    // Include user data if it exists
    if (user) {
      responseData.user = {
         // ID of the MUserT object
         userId: user.id ,
        firstname: user.get("firstname"), 
   // Example field from MUserT
        // Add other fields from MUserT as needed
      };
    }

    return {
      status: 1,
      data: responseData,
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
