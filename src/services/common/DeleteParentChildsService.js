const mongoose = require("mongoose");

const DeleteParentChildsService = async (Request, ParentModel, ChildModel, JoinPropertyName) => {

    // Create a transaction session
    // `startSession` initializes a new session which is used to group operations that should be executed together atomically.
    const session = await mongoose.startSession();

    try {
        // Begin the transaction within the session
        // `startTransaction` begins a new transaction in the session. All operations in this session will be part of a single transaction.
        await session.startTransaction();

        // Extract the ID to delete from request parameters and user email from request headers
        let deleteId = Request.params.id;
        let userEmail = Request.headers.email;

        // Child Query Object
        // Construct a query to find all child documents related to the parent document
        let childQuery = {};
        // Set the parent reference in the child query to the delete ID
        childQuery[JoinPropertyName] = deleteId;
        // Add user email to ensure the query is specific to the user
        childQuery.userEmail = userEmail;

        // Parent Query Object
        // Construct a query to find the parent document to delete
        let parentQuery = {};
        // Set the parent document's ID in the query to the delete ID
        parentQuery['_id'] = deleteId;
        // Add user email to ensure the query is specific to the user
        parentQuery.userEmail = userEmail;

        // Delete Child Documents - First Database Operation
        // Delete all child documents matching the child query within the transaction session
        let childDelete = await ChildModel.deleteMany(childQuery).session(session);

        // Delete Parent Document - Second Database Operation
        // Delete the parent document matching the parent query within the transaction session
        let parentDelete = await ParentModel.deleteOne(parentQuery).session(session);
        
        // Commit the transaction if both delete operations are successful
        // `commitTransaction` finalizes the transaction, making all changes permanent
        await session.commitTransaction();

        // End the session after a successful transaction
        // It's important to end the session to free up resources
        session.endSession();

        // Return a success response with the deletion results
        return { status: "success", parent: parentDelete, childs: childDelete };
    } 
    
    catch (error) {
        // Rollback the transaction if any error occurs
        // `abortTransaction` rolls back all operations performed in the transaction, ensuring no partial changes are saved
        await session.abortTransaction();

        // End the session after a rollback
        session.endSession();

        // Return a failure response with the error details
        return { status: "fail", data: error };
    }
}

module.exports = DeleteParentChildsService;