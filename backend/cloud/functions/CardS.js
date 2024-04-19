

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
    // const userId = request.params; // Get the current user's objectId
    const query = new Parse.Query('create_gig');
  
    // query.equalTo('userId', userId); // Add a filter to get gigs only for the current user
    query.include(['userId', 'profileId']);// Ensure to include the user object to access its data
  
    const results = await query.find();
  
    return results.map(result => {
      // Access the user and profile object from the pointer
      const user = result.get('userId');
      const profile = result.get('profileId');
      const firstname = user ? user.get('firstname') : null; // Adjust field names as necessary
      const image = profile ? profile.get('image') : null; 
  
      return {
        userId: user.id, 
        objectId : result.id,
        image1 : result.get("image1"),
        image2 : result.get("image2"),
        image3 : result.get("image3"),
        price: result.get('homePrice'),
        title: result.get('title'),
        firstname: firstname,
          image: image,
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
    const user = card.get("userId"); 
                              // This is the MUserT object, could be null if pointer does not exist

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
      category : card.get("selectedCategory1"),
      subcategory : card.get("selectedSubcategory"),
      orderDay1:card.get("orderDay1"),
      orderDay2:card.get("orderDay2"),
      orderDay3:card.get("orderDay3"),
      image1 : card.get("image1"),
      image2 : card.get("image2"),
      image3 : card.get("image3"),
     
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

Parse.Cloud.define("getGigByUserId", async (request) => {
  const { id } = request.params; // Assuming this is the ID of the MUserT object
  const Gig = Parse.Object.extend("create_gig");
  const userQuery = new Parse.Query(Parse.Object.extend("MUserT"));
  const profileQuery = new Parse.Query(Parse.Object.extend("profile"));

  try {
    const user = await userQuery.get(id); // Fetch the user by ID to validate existence

    // Query to find the profile matching the user ID
    profileQuery.equalTo("userId", user); // Assuming 'userId' is a pointer to the MUserT object
    const userProfile = await profileQuery.first(); // Use .first() if you expect one result

    const query = new Parse.Query(Gig);
    query.equalTo("userId", user); // Search for gigs where 'userId' matches the provided user object
    query.include("userId"); // Include the pointer to fetch the related MUserT object data

    const card = await query.first(); // Use .first() if you expect one result or modify as needed

    if (!card) {
      return {
        status: 0,
        message: "No gig found for the provided user ID",
      };
    }

    let profileImage = userProfile ? userProfile.get("image") : null; // Get image from profile if exists

    // Constructing response data with fields from create_gig, user object, and profile image
    const responseData = {
      objectId: card.id,
      title: card.get("title"),
      // Add other fields as before...
      profileImage: profileImage, // Image from the profile
      user: {
        userId: user.id,
        firstname: user.get("firstname"),
        // Add other user fields as needed...
      },
    };

    return {
      status: 1,
      data: responseData,
    };
  } catch (error) {
    console.error('Error fetching gig or profile by user ID', error);
    return {
      status: 0,
      message: "Error fetching gig or profile by user ID",
      error: error.message,
    };
  }
});


