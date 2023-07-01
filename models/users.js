const { BSON } = require("mongodb");
const client = require("../database/mongo.database");
const db = client.db("instagram");
const coll = db.collection("users");

const createUser = async function (data) {
  try {
    let user = await coll.findOne({
      email: { $exists: true, $eq: data.email },
    });

    if (!user) {
      const result = await coll.insertOne({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      return { status: "success", msg: "User Created", data: result };
    } else {
      return { status: "error", errorCode: 403, msg: "EmailAlreadyExists" };
    }
  } catch (error) {
    return { status: "error", msg: error.codeName };
  }
};

const getUserByEmail = async function (data) {
  try {
    let user = await coll.findOne({
      $or: [{ email: { $eq: data } }, { username: { $eq: data } }],
    });

    if (user) {
      return { status: "success", data: user };
    } else {
      return { status: "error", errorCode: 404, msg: "UserDoesNotExist" };
    }
  } catch (error) {
    return { status: "error", msg: error.codeName };
  }
};

const getUserById = async function (id) {
  try {
    let user = await coll.findOne({ _id: { $eq: new BSON.ObjectId(id) } });

    if (user) {
      return { status: "success", data: user };
    } else {
      return { status: "error", errorCode: 404, msg: "UserDoesNotExist" };
    }
  } catch (error) {
    return {
      status: "error",
      msg: error.codeName ? error.codeName : "InternalServerError",
    };
  }
};

const updateUser = async function (id, data) {
  try {
    let result = await coll.updateOne(
      { _id: new BSON.ObjectId(id) },
      { $set: data }
    );

    return { status: "succes", msg: "UpdatedSuccessfully" };
  } catch (error) {
    console.log(error);
    return { status: "error", msg: error.codeName };
  }
};

const addUserSession = async function (id, data) {
  try {
    let result = await coll.updateOne(
      { _id: new BSON.ObjectId(id) },
      { $set :{session:{}}}
    );

    return { status: "succes", msg: "SessionAdded" };

  } catch (error) {
    console.log(error);
    return { status: "error", msg: error.codeName };
  }
};

const deleteUserSession = async function (token) {
  try {
    let result = await coll.updateOne(
      { session:{token:token} },
      { $addToSet: data }
    );

    return { status: "succes", msg: "SessionDeleted" };
    
  } catch (error) {
    console.log(error);
    return { status: "error", msg: error.codeName };
  }
};

module.exports = {
  createUserModel: createUser,
  getUserByEmailModel: getUserByEmail,
  getUserByIdModel: getUserById,
  updateUserModel: updateUser,
  addUserSessionModel: addUserSession,
  deleteUserSessionModel: deleteUserSession
};
