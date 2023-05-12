const {Router} = require("express")
const {Show }= require("../../models/index")
const router = Router()


router.get("/", async (req, res, next) => {
      const shows = await Show.findAll();
      res.json(shows);
      next();
  });
router.get('/:id', async (req, res,next) => {
    const chosenId = req.params.id;
  

      const showById = await Show.findByPk(chosenId);
  
      if (showById) {
        res.json(showById);
        next()
      } else {
        // If Show is not found, send a 404 response
        res.status(404).json({ error: 'Show not found' });
      }
    });

    

  module.exports = router