const axios = require('axios')

class ThirdApiController {

    static yesOrNo(req, res, next) {

        axios({
                method: 'get',
                url: `http://yesno.wtf/api`
            })
            .then(({
                data
            }) => {
                res.status(200).json(data)
            })
            .catch(next)

    }

}

module.exports = ThirdApiController