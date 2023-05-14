const {Router} = require("express")
const {User }= require("../../models/index")
const router = Router()
const {Show} = require('../../models/index')

router.get("/", async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  });
  
  // Get one user by ID
router.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  });
  
// Get all shows watched by a user
router.get("/:id/shows", async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, { include: Show });
      if (user) {
        res.json(user.Shows);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  });
  
// Update and add a show if a user has watched it
router.put("/:id/shows/:showId", async (req, res, next) => {
    try {
      const { id, showId } = req.params;
      const user = await User.findByPk(id);
      const show = await Show.findByPk(showId);
      if (user && show) {
        await user.addShow(show);
        res.status(200).send("Show updated successfully");
      } else {
        res.status(404).json({ error: "User or Show not found" });
      }
    } catch (error) {
      next(error);
    }
  });
      
      module.exports = router;
