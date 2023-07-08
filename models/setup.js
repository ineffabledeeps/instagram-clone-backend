var client = require("../database/mongo.database");
var db = client.db("instagram");

const initializeDatabaseModel = async function initializeDatabase() {
  try {
    await db.createCollection("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "User object Validation",
          required: ["firstName", "lastName", "email", "password"],
          properties: {
            firstName: {
              bsonType: "string",
              description: "'firstName' must be a string",
            },
            lastName: {
              bsonType: "string",
              description: "'lastName' must be a string",
            },
            email: {
              bsonType: "string",
              description: "'email' must be a string",
            },
            password: {
              bsonType: "string",
              description: "'password' must be a string",
            },
            avatar: {
              bsonType: "string",
              description: "'avatar' must be a string",
            },
            numberOfPosts: {
              bsonType: "int",
              minimum: 0,
              description: "'numberOfPosts must be an integer value",
            },
            numberOfFollowers: {
              bsonType: "int",
              minimum: 0,
              description: "'numberOfFollowers' must be an integer",
            },
            numberOfFollowings: {
              bsonType: "int",
              minimum: 0,
              description: "'numberOfFollowings' must be an integer",
            },
            active: {
              bsonType: "bool",
              description: "'active' must be either true or false",
            },
            dateCreated: {
              bsonType: "date",
              description: "'date' must be in format of date object",
            },
          },
        },
      },
    });

    await db.createCollection("posts", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "Posts object Validation",
          required: ["dateCreated"],
          properties: {
            content: {
              bsonType: "string",
              description: "'content' must be of string type",
            },
            category: {
              bsonType: "string",
              description: "'category must be of string type",
            },
            dateCreated: {
              bsonType: "date",
              description: "'date' must be a valid date",
            },
            createdBy: {
              bsonType: "string",
              description: "'createdBy' must be of string type",
            },
            numberOfReactions: {
              bsonType: "int",
              description: "'numberOfReaction' must be of integer type",
            },
          },
        },
      },
    });

    await db.createCollection("postReaction", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "object validation for postReaction",
          required: ["postId", "userId"],
          properties: {
            postId: {
              bsonType: "string",
              description: "'postId' must be of type string",
            },
            userId: {
              bsonType: "string",
              description: "'userId' must be of type string",
            },
          },
        },
      },
    });

    await db.createCollection("userNotification", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "userNotification object validation",
          required: ["notificationImage", "notificationMessage", "user_id"],
          properties: {
            notificationImage: {
              bsonType: "string",
              description: "'userNotification' must be a string",
            },
            notificationMessage: {
              bsonType: "string",
              description: "'notificationMessage' must be of type string",
            },
            userId: {
              bsonType: "string",
              description: "'userId' must be a string",
            },
          },
        },
      },
    });

    await db.createCollection("userFollower", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "userFollower object validation",
          required: ["userId", "followerId"],
          properties: {
            userId: {
              bsonType: "string",
              description: "'userId' must be of type string",
            },
            followerId: {
              bsonType: "string",
              description: "'followerId' must be of type string",
            },
          },
        },
      },
    });

    await db.command({
      collMod: "users",
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "User object Validation",
          required: ["firstName", "lastName", "email", "password"],
          properties: {
            firstName: {
              bsonType: "string",
              description: "'firstName' must be a string",
            },
            lastName: {
              bsonType: "string",
              description: "'lastName' must be a string",
            },
            username: {
              bsonType: "string",
              description: "'username' must be a string",
            },
            email: {
              bsonType: "string",
              description: "'email' must be a string",
            },
            password: {
              bsonType: "string",
              description: "'password' must be a string",
            },
            avatar: {
              bsonType: "string",
              description: "'avatar' must be a string",
            },
            numberOfPosts: {
              bsonType: "int",
              minimum: 0,
              description: "'numberOfPosts must be an integer value",
            },
            numberOfFollowers: {
              bsonType: "int",
              minimum: 0,
              description: "'numberOfFollowers' must be an integer",
            },
            numberOfFollowings: {
              bsonType: "int",
              minimum: 0,
              description: "'numberOfFollowings' must be an integer",
            },
            active: {
              bsonType: "bool",
              description: "'active' must be either true or false",
            },
            session: {
              bsonType: "object",
              properties: {
                sessionId: {
                  bsonType: "string",
                },
                token: {
                  bsonType: "string",
                },
              },
            },
            dateCreated: {
              bsonType: "date",
              description: "'date' must be in format of date object",
            },
          },
        },
      },
    });

    return { status: "success", msg: "Database initialized successfully" };
  } catch (error) {
    return { status: "error", msg: error.codeName };
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

const modifyDatabaseModel = async function modifyDatabase() {
  try {
    await db.command({
      collMod: "users",
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "User object Validation v2",
          required: ["fullName", "username", "password"],
          properties: {
            fullName: {
              bsonType: "string",
              description: "'fullName' must be a string",
            },
            username: {
              bsonType: "string",
              description: "'username' must be a string",
            },
            mobileNumber:{
              bsonType: "string",
              description:"'mobile number must be a string'"
            },
            email: {
              bsonType: "string",
              description: "'email' must be a string",
            },
            password: {
              bsonType: "string",
              description: "'password' must be a string",
            },
            avatar: {
              bsonType: "string",
              description: "'avatar' must be a string",
            },
            numberOfPosts: {
              bsonType: "int",
              minimum: 0,
              description: "'numberOfPosts must be an integer value",
            },
            numberOfFollowers: {
              bsonType: "int",
              minimum: 0,
              description: "'numberOfFollowers' must be an integer",
            },
            numberOfFollowings: {
              bsonType: "int",
              minimum: 0,
              description: "'numberOfFollowings' must be an integer",
            },
            active: {
              bsonType: "bool",
              description: "'active' must be either true or false",
            },
            session: {
              bsonType: "object",
              properties: {
                sessionId: {
                  bsonType: "string",
                },
                token: {
                  bsonType: "string",
                },
              },
            },
            dateCreated: {
              bsonType: "date",
              description: "'date' must be in format of date object",
            },
          },
        },
      },
    });

    return { status: "success", msg: "Database Modified successfully" };
  } catch (error) {
    return { status: "error", msg: error.codeName };
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

module.exports = {initializeDatabaseModel:initializeDatabaseModel, modifyDatabaseModel:modifyDatabaseModel};
