const axios = require("axios");
const { list, find, create } = require("../../common/database/mongoCloud");
// index, show, store, update, destroy

const database = "tutorial-icc";
const collection = "devs";

module.exports = {
  async index(req, res) {
    try {
      const devs = await list(database, collection);

      res.json(devs);
    } catch (err) {
      console.log("Error on dev index", err);
      res.status(400).json("Error on get devs");
    }
  },

  async store(req, res) {
    const { name, githubProfile, age, city, country } = req.body;

    try {
      let dev = await find(database, collection, { githubProfile });

      if (dev.length === 0) {
        const response = await axios.get(
          `https://api.github.com/users/${githubProfile}`,
        );

        const {
          avatar_url,
          bio,
          public_repos,
          followers,
          company,
        } = response.data;

        const devData = {
          name,
          githubProfile,
          age,
          city,
          country,
          avatar_url,
          bio,
          public_repos,
          followers,
          company,
        };

        dev = await create(database, collection, devData);
        res.json(dev);
      } else {
        res.json(null);
      }
    } catch (err) {
      res.status(400).json("Error on store dev");
    }
  },

  async show(req, res) {
    const { github } = req.params;

    console.log("Github", github);

    try {
      const dev = await find(database, collection, { githubProfile: github });

      console.log(dev);
      if (dev.length === 0) {
        res.json(null);
      } else {
        res.json(dev[0]);
      }
    } catch (err) {
      res.status(400).json("Error on show dev");
    }
  },
};
