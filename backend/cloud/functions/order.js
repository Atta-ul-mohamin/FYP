Parse.Cloud.define("orderPlace", async (request) => {
    // Create pointers to the appropriate classes
    const CreateGig = Parse.Object.extend("create_gig");
    const MUserT = Parse.Object.extend("MUserT");
    const MUser = Parse.Object.extend("MUser");

    // Create pointers for cardId, teacherId, and studentId
    const cardPointer = new CreateGig();
    cardPointer.id = request.params.cardId;

    const teacherPointer = new MUserT();
    teacherPointer.id = request.params.teacherId;

    const studentPointer = new MUser();
    studentPointer.id = request.params.studentId;

    try {
        // Query for existing orders with the same cardId
        const Order = Parse.Object.extend("order");
        const query = new Parse.Query(Order);
        query.equalTo("cardId", cardPointer);

        const existingOrder = await query.first();

        if (existingOrder) {
            // If an order with the same cardId exists, return a response with status: 0 and message
            return { status: 0, message: "Order already placed for this card" };
        } else {
            // If no existing order found, proceed to save the new order
            const order = new Order();
            order.set("cardId", cardPointer);
            order.set("teacherId", teacherPointer);
            order.set("studentId", studentPointer);
            order.set("price", request.params.price);
            order.set("orderDay", request.params.orderDay);
            order.set("title" ,request.params.title)
            const result = await order.save();
            return result;
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error while placing order:", error);
        return { status: -1, message: "An error occurred while placing the order" };
    }
});


Parse.Cloud.define("getOrders", async (request) => {

    const {userId} = request.params; // Get the current user's objectId
    const query = new Parse.Query('order');
    query.equalTo('studentId', userId); // Add a filter to get gigs only for the current user
    const results = await query.find();

    return results.map(result => ({
        cardId : result.get('cardId'),
        teacherId : result.get('teacherId'),
        price: result.get('price'),
        orderDay: result.get('orderDay'),
        objectId : result.id,
        title :  result.get('title'),
        created :result.get('createdAt'),
    }));
});


Parse.Cloud.define("getCancelOrders", async (request) => {

    const {userId} = request.params; // Get the current user's objectId
    const query = new Parse.Query('cancelOrders');
    query.equalTo('studentId', userId); // Add a filter to get gigs only for the current user
    const results = await query.find();

    return results.map(result => ({
        cardId : result.get('cardId'),
        price: result.get('price'),
        objectId : result.id,
        title :  result.get('title'),
        created :result.get('createdAt'),
    }));
});

Parse.Cloud.define("getCancelOrdersTeacher", async (request) => {

    const {userId} = request.params; // Get the current user's objectId
    const query = new Parse.Query('cancelOrders');
    query.equalTo('teacherId', userId); // Add a filter to get gigs only for the current user
    const results = await query.find();

    return results.map(result => ({
        cardId : result.get('cardId'),
        price: result.get('price'),
        objectId : result.id,
        title :  result.get('title'),
        created :result.get('createdAt'),
    }));
});

Parse.Cloud.define("getIncompleteOrdersTeacher", async (request) => {

    const {userId} = request.params; // Get the current user's objectId
    const query = new Parse.Query('incompleteOrders');
    query.equalTo('teacherId', userId); // Add a filter to get gigs only for the current user
    const results = await query.find();

    return results.map(result => ({
        cardId : result.get('cardId'),
        price: result.get('price'),
        objectId : result.id,
        title :  result.get('title'),
        created :result.get('createdAt'),
    }));
});

Parse.Cloud.define("getIncompleteOrdersStudent", async (request) => {

    const {userId} = request.params; // Get the current user's objectId
    const query = new Parse.Query('incompleteOrders');
    query.equalTo('studentId', userId); // Add a filter to get gigs only for the current user
    const results = await query.find();

    return results.map(result => ({
        cardId : result.get('cardId'),
        price: result.get('price'),
        objectId : result.id,
        title :  result.get('title'),
        created :result.get('createdAt'),
    }));
});


Parse.Cloud.define("getTitles", async (request) => {
    // Create a new query on the 'create_gig' class
    const query = new Parse.Query("create_gig");
  
    // Specify that we want to retrieve the 'title' and 'cardId' fields
    query.select("title", "cardId");
  
    try {
      // Execute the query
      const results = await query.find();
  
      // Extract titles and cardIds from the results
      const titles = results.map((record) => ({
        title: record.get("title"),
        cardId: record.get("cardId")
      }));
  
      // Return the titles and cardIds in a success response
      return {
        status: 1,
        data: titles
      };
    } catch (error) {
      // Handle any errors that occurred during the query
      console.error("Error retrieving titles:", error);
      return {
        status: 0,
        message: "Error retrieving titles",
        error: error.message
      };
    }
  });
  
  

Parse.Cloud.define("MoveToIncompleteOrders", async (request) => {
    const { orderId } = request.params;
  
    // Query to find the specific order
    const query = new Parse.Query('order');
    query.equalTo('objectId', orderId);
    const order = await query.first(); // Use first() since objectId is unique
  
    if (order) {
      const incompleteOrders = Parse.Object.extend("incompleteOrders");
      const incompleteOrder = new incompleteOrders();
  
      // Create pointers for related objects
      const cardIdPointer = order.get("cardId");
      const studentIdPointer = order.get("studentId");
      const teacherIdPointer = order.get("teacherId");
  
      // Set the fields for the incompleteOrders table
      incompleteOrder.set("cardId", cardIdPointer);
      incompleteOrder.set("price", order.get("price"));
      incompleteOrder.set("title", order.get("title"));
      incompleteOrder.set("studentId", studentIdPointer);
      incompleteOrder.set("teacherId", teacherIdPointer);
      incompleteOrder.set("orderDay", order.get("orderDay"));
  
      try {
        // Save the incompleteOrder
        await incompleteOrder.save();
  
        // Delete the order
        await order.destroy();
  
        // Return success message
        return { status: 1, message: "Order moved to incompleteOrders and removed from orders table" };
      } catch (error) {
        // Error handling
        return { status: 0, error: error.message };
      }
    } else {
      // No order found
      return { status: 0, message: "No order found with the provided ID." };
    }
  });
  

Parse.Cloud.define("getOrdersTeacher", async (request) => {

    const {userId} = request.params; // Get the current user's objectId
    const query = new Parse.Query('order');
    query.equalTo('teacherId', userId); // Add a filter to get gigs only for the current user
    const results = await query.find();

    return results.map(result => ({
        cardId : result.get('cardId'),
        teacherId : result.get('teacherId'),
        studentId : result.get('studentId'),
        price: result.get('price'),
        orderDay: result.get('orderDay'),
        objectId : result.id,
        title :  result.get('title'),
        created :result.get('createdAt'),
    }));
});



Parse.Cloud.define("getHistoryOrderDetails", async (request) => {
    const { cardId } = request.params;
    const query = new Parse.Query('HistoryOrders');

    // Query the 'HistoryOrders' for rows matching the provided 'cardId'
    query.equalTo('cardId', cardId);

    try {
        // Execute the query
        const results = await query.find();
        const reviews = [];

        for (const order of results) {
            const studentId = order.get('studentId'); // Assuming 'studentId' is a pointer to the 'MUser' class

            // Fetch the student's name from the 'MUser' class
            const student = await studentId.fetch();

            // Append the review and student's name to the reviews array
            reviews.push({
                review: order.get('review'),
                studentName: student.get('name') // Assuming 'name' is the field for student's name in 'MUser'
            });
        }

        return {
            success: true,
            reviews: reviews
        };
    } catch (error) {
        return {
            success: false,
            message: `Error fetching order details: ${error.message}`
        };
    }
});


Parse.Cloud.define("getHistoryOrdersTeacher", async (request) => {

    const {userId} = request.params; // Get the current user's objectId
    const query = new Parse.Query('HistoryOrders');
    query.equalTo('teacherId', userId); // Add a filter to get gigs only for the current user
    const results = await query.find();

    return results.map(result => ({
        cardId : result.get('cardId'),
        teacherId : result.get('teacherId'),
        studentId : result.get('studentId'),
        price: result.get('price'),
        orderDay: result.get('orderDay'),
        objectId : result.id,
        title :  result.get('title'),
        orderDate :result.get('created'),
        review : result.get('review'),
        rating : result.get('rating'),
        completion: result.get('createdAt'),
        completionConfirm : result.get('completionConfirmation')
    }));
});

Parse.Cloud.define("getHistoryOrdersStudent", async (request) => {

    const {userId} = request.params; // Get the current user's objectId
    const query = new Parse.Query('HistoryOrders');
    query.equalTo('studentId', userId); // Add a filter to get gigs only for the current user
    const results = await query.find();

    return results.map(result => ({
        cardId : result.get('cardId'),
        teacherId : result.get('teacherId'),
        studentId : result.get('studentId'),
        price: result.get('price'),
        orderDay: result.get('orderDay'),
        objectId : result.id,
        title :  result.get('title'),
        orderDate :result.get('created'),
        review : result.get('review'),
        rating : result.get('rating'),
        completion: result.get('createdAt'),
        completionConfirm : result.get('completionConfirmation')
    }));
});

Parse.Cloud.define("CompleteOrdersTeacher", async (request) => {
    const { orderId } = request.params;

    // Query to find the specific order
    const query = new Parse.Query('order');
    query.equalTo('objectId', orderId);
    const order = await query.first(); // Use first() since objectId is unique

    if (order) {
        // Prepare new HistoryOrders object
        const HistoryOrders = Parse.Object.extend("HistoryOrders");
        const historyOrder = new HistoryOrders();

        // Set data from the order to historyOrder
        historyOrder.set("cardId", order.get("cardId"));
        historyOrder.set("teacherId", order.get("teacherId"));
        historyOrder.set("studentId", order.get("studentId"));
        historyOrder.set("price", order.get("price"));
        historyOrder.set("orderDay", order.get("orderDay"));
        historyOrder.set("title", order.get("title"));
        historyOrder.set("created", order.get("createdAt")); // Ensure the field name is correct in DB
        historyOrder.set("review" , "null");
        historyOrder.set("rating" , "null");
        historyOrder.set("completionConfirmation" , "null");

        try {
            // Save the new historyOrder object to HistoryOrders class
            await historyOrder.save();
            // Delete the original order object
            await order.destroy();
            // Return success message
            return { status: 1, message: "Order completed and moved to history." };
        } catch (error) {
            // Error handling
            return { status: 0, error: error.message };
        }
    } else {
        // No order found
        return { status: 0, message: "No order found with the provided ID." };
    }
});



Parse.Cloud.define("CancelOrdersStudent", async (request) => {
    const { orderId } = request.params;

    // Query to find the specific order
    const query = new Parse.Query('order');
    query.equalTo('objectId', orderId);
    const order = await query.first(); // Use first() since objectId is unique

    if (order) {
        const cancelOrders = Parse.Object.extend("cancelOrders");
        const cancelOrder = new cancelOrders();

        // Create pointers for related objects
        const cardIdPointer = order.get("cardId");
        const studentIdPointer = order.get("studentId");
        const teacherIdPointer = order.get("teacherId");

        // Set the fields for the cancelOrders table
        cancelOrder.set("cardId", cardIdPointer);
        cancelOrder.set("price", order.get("price"));
        cancelOrder.set("title", order.get("title"));
        cancelOrder.set("studentId", studentIdPointer);
        cancelOrder.set("teacherId", teacherIdPointer);
        cancelOrder.set("orderDay", order.get("orderDay"));

        try {
            // Save the cancelOrder
            await cancelOrder.save();

            // Delete the order
            await order.destroy();

            // Return success message
            return { status: 1, message: "Order cancelled and saved in cancelOrders table" };
        } catch (error) {
            // Error handling
            return { status: 0, error: error.message };
        }
    } else {
        // No order found
        return { status: 0, message: "No order found with the provided ID." };
    }
});



Parse.Cloud.define("updateOrders", async (request) => {
    const { id, rating, review, completionPercent } = request.params;

    const HistoryOrders = Parse.Object.extend('HistoryOrders');
    const query = new Parse.Query(HistoryOrders);

    try {
        const order = await query.get(id);
        if (!order) {
            throw new Error('Order not found');
        }

        order.set('rating', rating);
        order.set('review', review);
        order.set('completionConfirmation', completionPercent);
        const updatedOrder = await order.save(null, { useMasterKey: true });

        // Retrieve the objectId from the updated order
        const cardId = updatedOrder.get('cardId');

        // Query for other orders with the same objectId
        const objectIdQuery = new Parse.Query(HistoryOrders);
        objectIdQuery.equalTo('cardId', cardId);
        const relatedOrders = await objectIdQuery.find();

        // Calculate the average rating
        const sumRating = relatedOrders.reduce((acc, cur) => acc + Number(cur.get('rating')), 0);
        const averageRating = sumRating / relatedOrders.length;


        // Update the 'create_gig' table with the average rating
        const CreateGig = Parse.Object.extend('create_gig');
        const gigQuery = new Parse.Query(CreateGig);
        gigQuery.equalTo('objectId', cardId); // Assuming create_gig table also uses objectId to correlate
        const gig = await gigQuery.first();

        if (gig) {
            gig.set('averageRating', averageRating);
            await gig.save(null, { useMasterKey: true });
        }

        return {
            success: true,
            message: 'Order and gig average rating updated successfully',
            data: {
                objectId: updatedOrder.id,
                rating: updatedOrder.get('rating'),
                review: updatedOrder.get('review'),
                completionConfirm: updatedOrder.get('completionConfirmation'),
                averageRating: averageRating
            }
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
});



