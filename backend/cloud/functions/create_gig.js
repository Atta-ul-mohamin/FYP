Parse.Cloud.define("giginfo", async (request) => {
  const { gigtitle, category, discription, pricediscription, dileverytime, price, userId } = request.params;

  try {
    const userPointer = Parse.User.createWithoutData(userId);
    console.log(userPointer);
    console.log(userId);
    const create_gig = Parse.Object.extend("create_gig");
    const gig = new create_gig();
    
    gig.set("gigtitle", gigtitle);
    gig.set("category", category);
    gig.set("discription", discription);
    gig.set("pricediscription", pricediscription);
    gig.set("dileverytime", dileverytime);
    gig.set("price", price);
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
        gigtitle: result.get('gigtitle'),
        price: result.get('price'),
        discription: result.get('discription'),
    }));
});
