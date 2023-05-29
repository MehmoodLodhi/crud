const { User } = require("./models/user");

async function getuser() {
  const users = await User.find();
  users.map(async (item) => {
    item["address"] = "house 2";
    await item.save();
  });
}

const epochToDate = (timeStamp) => {
  return new Date(timeStamp).toLocaleString();
};

module.exports.getuser = getuser;
module.exports.epochToDate = epochToDate;
