const router = require('express').Router()

router.get('/:email') // get all todos based on email
router.post('/:email') // make todo

router.get('/:email/:name') // filter todo by name

router.patch('/:email/:id') // update a todo

router.delete('/:email/:id') // delete a todo

module.exports = router