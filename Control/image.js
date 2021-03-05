const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '05eab0cd23af49439d4c1d7839efbcf7'
});

const handleApiCall = () => (req, res) => {
    app.models
    .predict("f76196b43bbd45c99b4f3cd8e8b40a8a", req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to use API key'))
}    

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}