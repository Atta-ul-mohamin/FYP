

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
        averageRating: result.get('averageRating'),
        firstname: firstname,
          image: image,
         // Access the firstname field from the MUserT class
      };
    });
  });
  


  Parse.Cloud.define('getCardsWithCategory', async (request) => {
    const { category, subcategory } = request.params;
    const query = new Parse.Query('create_gig');
    query.equalTo('selectedCategory1', category);
    query.equalTo('selectedSubcategory', subcategory);
  
    try {
      const results = await query.find({ useMasterKey: true });
      if (results.length === 0) {
        return { status: 0 };
      }
  
      const cards = await Promise.all(results.map(async (gig) => {
        const card = {
          objectId: gig.id,
          image1: gig.get('image1'),
          title: gig.get('title'),
          homePrice: gig.get('homePrice'),
          averageRating: gig.get('averageRating')
        };
  
        // Fetching user data from MUser table
        const userPointer = gig.get('userId');
        if (userPointer) {
          const user = await userPointer.fetch();
          card.userName = user.get('firstname');
        }
  
        // Fetching profile image from profile table
        const profilePointer = gig.get('profileId');
        if (profilePointer) {
          const profile = await profilePointer.fetch();
          card.profileImage = profile.get('image');
        }
  
        return card;
      }));
  
      return cards;
    } catch (error) {
      console.error('Error fetching gigs: ', error);
      throw new Error('Unable to fetch cards');
    }
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








Parse.Cloud.define('getCardsForTitle', async (request) => {
  const { title } = request.params;
  
  // Function to calculate similarity percentage
  function calculateSimilarity(str1, str2) {
    let longer = str1;
    let shorter = str2;
    if (str1.length < str2.length) {
      longer = str2;
      shorter = str1;
    }
    const longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    const editDistance = getEditDistance(longer, shorter);
    return (longerLength - editDistance) / parseFloat(longerLength);
  }

  // Function to calculate the edit distance between two strings
  function getEditDistance(str1, str2) {
    const costs = [];
    for (let i = 0; i <= str1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= str2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (str1.charAt(i - 1) !== str2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) {
        costs[str2.length] = lastValue;
      }
    }
    return costs[str2.length];
  }

  // Fetch all relevant rows from the create_gig table
  const CreateGig = Parse.Object.extend('create_gig');
  const query = new Parse.Query(CreateGig);
  query.include(['userId', 'profileId']);
  const results = await query.find();

  // Filter and sort rows based on the similarity percentage
  const filteredResults = results.map(result => {
    const gigTitle = result.get('title');
    const similarity = calculateSimilarity(gigTitle.toLowerCase(), title.toLowerCase());
    return {
      objectId: result.id,
      image1: result.get('image1'),
      title: gigTitle,
      homePrice: result.get('homePrice'),
      averageRating: result.get('averageRating'),
      userId: result.get('userId'),
      profileId: result.get('profileId'),
      similarity
    };
  }).filter(result => result.similarity >= 0.8)
    .sort((a, b) => b.similarity - a.similarity);

  // Retrieve additional information from the MUser and profile tables
  const cards = await Promise.all(filteredResults.map(async result => {
    const user = result.userId;
    const profile = result.profileId;

    return {
      objectId: result.objectId,
      image1: result.image1,
      title: result.title,
      homePrice: result.homePrice,
      averageRating: result.averageRating,
      firstname: user ? user.get('firstname') : null,
      profileImage: profile ? profile.get('image') : null,
      similarity: result.similarity
    };
  }));

  return cards;
});
