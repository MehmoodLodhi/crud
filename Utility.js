const { User } = require("./models/user");

async function getuser() {
  const users = await User.find();
  users.map(async (item) => {
    item["address"] = "house 2";
    await item.save();
  });
}

module.exports.getuser = getuser;
