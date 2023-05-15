const { Router } = require("express");
const { Show } = require("../../models/index");
const router = Router();

// Get all shows
router.get("/", async (req, res, next) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (error) {
    next(error);
  }
});

// Get one show by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const show = await Show.findByPk(id);
    if (show) {
      res.json(show);
    } else {
      res.status(404).json({ error: "Show not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Get shows of a  specific genre
router.get("/genres/:genre", async (req, res, next) => {
  try {
    const { genre } = req.params;
    const shows = await Show.findAll({ where: { genre } });
    res.json(shows);
  } catch (error) {
    next(error);
  }
});

// Update a show by ID
router.put("/:id/:ratings", async (req, res, next) => {
    try {
      const { id, ratings } = req.params;
  
      const show = await Show.findByPk(id);
      if (show) {
        show.rating = ratings; // Updates the rating with the new value
        await show.save();
  
        res.status(200).send({message: 'Update Complete'});
      } else {
        res.status(404).json({ error: "Show not found" });
      }
    } catch (error) {
      next(error);
    }
  });
router.put("/:id/status/:status", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.params;
  
      const show = await Show.findByPk(id);
      if (show) {
        show.status = status; // Updates the status with the new value
        await show.save();
  
        res.status(200).send({message: 'Change Complete'});
      } else {
        res.status(404).json({ error: "Show not found" });
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;

