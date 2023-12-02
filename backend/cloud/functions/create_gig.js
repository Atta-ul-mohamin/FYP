Parse.Cloud.define("giginfo", async (request) => {
    const create_gig= Parse.Object.extend("create_gig");
    const user = new create_gig();
    user.set("gigtitle", request.params.gigtitle);
    user.set("category", request.params.category);
    user.set("discription", request.params.discription);
    user.set("images", request.params.images);
    user.set("sampledocument", request.params.sampledocument);
    user.set("pricediscription", request.params.pricediscription);
    user.set("dileverytime", request.params.dileverytime);
    user.set("price", request.params.price);
  
    const result = await user.save();
    return result;
    });


Parse.Cloud.define("getGigs", async (request) => {
  const query = new Parse.Query('create_gig');
  const results = await query.find();

  return results.map(result => ({
    gigtitle: result.get('gigtitle'),
    category: result.get('category'),
    discription: result.get('discription'),
    images: result.get('images') ? result.get('images').url() : null,
    // ... other properties ...
  }));
});
