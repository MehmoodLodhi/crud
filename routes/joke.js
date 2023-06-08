let axiox = require("axios");
const express = require("express");
const router = express.Router();

router.get("/joke", async (req, res) => {
  let url = "https://official-joke-api.appspot.com/jokes/programming/random";

  axiox.get(url).then(function (response) {
    // handle success
    let joke = {
      He: response.data[0].setup + "🤔",
      She: response.data[0].punchline + "😂",
    };

    res.send(joke);

    // console.log(response.data[0].punchline);
  });
});

module.exports = router;
