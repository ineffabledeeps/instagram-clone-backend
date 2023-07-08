const { BSON } = require("mongodb");
const client = require("../database/mongo.database");
const db = client.db("instagram");
const coll = db.collection("users");

const createUser = async function (data) {
  try {
    await coll.insertOne(data);
    return {status:"success",msg:"UserCreatedSuccessfully"}
  } catch (error) {
    return { status: "error", msg: error.codeName };
  }
};

const getUserByEmail = async function (email) {
  try {
    let user = await coll.findOne({
      email: { $eq: email },
    });

    if (user) {
      return { status: "success", data: user };
    } else {
      return { status: "error", errorCode: 404, msg: "EmailDoesNotExist" };
    }
  } catch (error) {
    return { status: "error", msg: error.codeName };
  }
};

const getUserByUsername = async function (username) {
  try {
    let user = await coll.findOne({
      username: { $exists: true, $eq: username },
    });

    if (user) {
      return { status: "success", data: user };
    } else {
      return { status: "error", errorCode: 404, msg: "UsernameDoesNotExist" };
    }
  } catch (error) {
    return { status: "error", msg: error.codeName };
  }
};
const getUserByMobileNumber = async function (mobileNumber) {
  try {
    let user = await coll.findOne({
      mobileNumber: { $exists: true, $eq: mobileNumber },
    });

    if (user) {
      return { status: "success", data: user };
    } else {
      return { status: "error", errorCode: 404, msg: "MobileNumberDoesNotExist" };
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
    await coll.updateOne(
      { _id: new BSON.ObjectId(id) },
      { $addToSet: { session: data } }
    );

    return { status: "succes", msg: "SessionAdded" };
  } catch (error) {
    console.log(error);
    return { status: "error", msg: error.codeName };
  }
};

const deleteUserSession = async function (token) {
  try {
    await coll.updateOne({ session: { token: token } }, { $addToSet: data });

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
  getUserByUsernameModel: getUserByUsername,
  getUserByMobileNumberModel : getUserByMobileNumber,
  updateUserModel: updateUser,
  addUserSessionModel: addUserSession,
  deleteUserSessionModel: deleteUserSession,
};
