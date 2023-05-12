const {Router} = require("express")
const {User }= require("../../models/index")
const router = Router()
const {Show} = require('../../models/index')


router.get("/", async (req, res, next) => {
    const user = await User.findAll();
    res.json(user);
    next();
});

router.get('/:id', async (req, res,next) => {
    const chosenId = req.params.id;
  

      const userById = await User.findByPk(chosenId,{include: Show});
  
      if (userById) {
        res.json(userById);
        next()
      } else {
        // If Show is not found, send a 404 response
        res.status(404).json({ error: 'Show not found' });
      }
    });
    router.get("/:id/show",async(req,res)=>{
        const {id }= req.params
        const user = await User.findByPk(id,{include:Show});
        res.json(user.Shows);

    })

    router.put("/:id/show/:showId",async(req,res)=>{
        const {id,showId} = req.params
        const user = awaitUser.findByPk(id,{include: Show});
        const userShow = await Show.findByPk(showId);
        await user.addShows(userShow);
        res.status(200).send("Show updated successfully");

    })
      
      module.exports = router;
