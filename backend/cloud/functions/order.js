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


Parse.Cloud.define("updateOrders", async (request) => {
    const { id, rating, review , completionPercent} = request.params;  // Destructure the parameters

    // Create a query for the HistoryOrders class
    const query = new Parse.Query('HistoryOrders');

    // Query the object by id
    try {
        const order = await query.get(id); // Retrieve the specific order

        // Check if order exists
        if (!order) {
            throw new Error('Order not found');
        }

        // Set the new rating and review
        order.set('rating', rating);
        order.set('review', review);
        order.set('completionConfirmation', completionPercent);

        // Save the updated order
        const updatedOrder = await order.save(null, { useMasterKey: true }); // Use master key if necessary

        // Return the updated order
        return {
            success: true,
            message: 'Order updated successfully',
            data: {
                objectId: updatedOrder.id,
                rating: updatedOrder.get('rating'),
                review: updatedOrder.get('review'),
                completionConfirm: updatedOrder.get('completionConfirmation')
            }
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
});
