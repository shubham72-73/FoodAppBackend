const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.post('/foodData', (req, res)=>{
    try {
        res.send([global.food_items, global.foodCategory])
    } catch (error) {
        console.err(err);
        re.send("Server Error");
    }
})

module.exports = router;