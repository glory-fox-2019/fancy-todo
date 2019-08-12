const { Todo } = require('../models/model-todo');

function authorize(err, req, res, next){

    if (req.headers.hasOwnProperty('params')) {
        Todo.findOne({ owner: req.params.id })
            .then(todo => {
                if (todo) {
                    if (todo.owner == req.decoded.id) {
                        next()
                    } else {
                        res.status(403).json({ err: 'Forbident' })
                    }
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })

    } else {
        res.status(400).json("msg: 'not authorize'")
    }   
}

module.exports = authorize
