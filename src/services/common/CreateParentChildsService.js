// const mongoose = require("mongoose");

// const CreateParentChildsService = async (request, parentModel, childModel, joinParentname) => {

//     // Create a transaction session
//     // `startSession` initializes a new session which is used to group operations that should be executed together atomically.
//     const session = await mongoose.startSession();

//     try {
//         // Begin the transaction within the session
//         // `startTransaction` begins a new transaction in the session. All operations in this session will be part of a single transaction.
//         await session.startTransaction();

//         // First Process: Creating Parent Data
//         // Extract parent data from the request body
//         const parentPostBody = request.body.parent;
//         // Add the user's email from the request headers to the parent data for tracking purposes
//         parentPostBody.userEmail = request.headers.email;

//         // Create the parent document in the database within the transaction session
//         // This operation is part of the transaction and will be rolled back if the transaction fails
//         const parentDataCreation = await parentModel.create([parentPostBody], { session });

//         // Second Process: Creating Child Data
//         // Extract child data from the request body
//         const childPostBody = request.body.childs;

//         // Update each child record to include the parent ID and user email
//         // This ensures that each child document references the correct parent document and includes user information
//         childPostBody.forEach(element => {
//             // Set the parent reference using the parent document's ID
//             element[joinParentname] = parentDataCreation[0]['_id'];
//             // Add the user's email from the request headers
//             element.userEmail = request.headers.email;
//         });

//         // Create the child documents in the database within the transaction session
//         // This operation is also part of the transaction and will be rolled back if the transaction fails
//         const childDataCreation = await childModel.insertMany(childPostBody, { session });

//         // Commit the transaction if both parent and child data creation are successful
//         // `commitTransaction` finalizes the transaction, making all changes permanent
//         await session.commitTransaction();

//         // End the session after a successful transaction
//         // It's important to end the session to free up resources
//         session.endSession();

//         // Return a success response with the created parent and child data
//         return { status: "success", parentData: parentDataCreation, childData: childDataCreation };
//     } 
    
//     catch (error) {
//         // Rollback the transaction if any error occurs
//         // `abortTransaction` rolls back all operations performed in the transaction, ensuring no partial changes are saved
//         await session.abortTransaction();
//         // End the session after a rollback
//         session.endSession();
//         // Return a failure response with the error details
//         return { status: "fail", data: error.message };
//     }
// };

// module.exports = CreateParentChildsService;


const mongoose = require("mongoose");

const CreateParentChildsService = async (request, parentModel, childModel, joinParentname) => {
    const session = await mongoose.startSession();

    try {
        await session.startTransaction();

        // Check if parent data is provided
        if (!request.body.parent) {
            throw new Error("Parent data is missing in the request body.");
        }
        const parentPostBody = request.body.parent;

        // Add `userEmail` to parent data if it exists in the headers
        if (request.headers && request.headers.email) {
            parentPostBody.userEmail = request.headers.email;
        } else {
            throw new Error("User email is missing in the request headers.");
        }

        const parentDataCreation = await parentModel.create([parentPostBody], { session });

        // Check if child data is provided
        if (!request.body.childs || !Array.isArray(request.body.childs)) {
            throw new Error("Child data is missing or not an array in the request body.");
        }
        const childPostBody = request.body.childs;

        // Add parent ID and `userEmail` to each child document
        childPostBody.forEach(element => {
            element[joinParentname] = parentDataCreation[0]['_id'];
            element.userEmail = request.headers.email;
        });

        const childDataCreation = await childModel.insertMany(childPostBody, { session });

        await session.commitTransaction();
        session.endSession();

        return { status: "success", parentData: parentDataCreation, childData: childDataCreation };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return { status: "fail", data: error.message };
    }
};

module.exports = CreateParentChildsService;
