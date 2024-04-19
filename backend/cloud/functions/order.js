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
        title :  result.get('title')
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
        title :  result.get('title')
    }));
});

