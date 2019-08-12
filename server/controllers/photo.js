const axios = require('axios');
const Unsplash = require('unsplash-js').default;
const unsplash = new Unsplash({
  applicationId: process.env.UNSPLASH_ACCESS_KEY,
  secret: process.env.UNSPLASH_SECRET_KEY
});
class Photo {
  static search(req,res,next){
    axios.get('https://api.unsplash.com/search/photos?client_id='+process.env.UNSPLASH_ACCESS_KEY+'&page=1&per_page=1&query='+req.query.search)
      .then(({data}) => {
        if(data.results.length > 0) res.json(data.results[0].urls);
        next({httpStatus: 404, message: 'Not Found!'})

        // return axios.get(data.results[0])
      })
      .catch(next)
  }
}

module.exports = Photo;