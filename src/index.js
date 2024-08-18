const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const port = 3001;

mongoose.connect('mongodb+srv://larissa:VcyATtbGWa3DmweA@hp-quotes-api.qk7bw.mongodb.net/?retryWrites=true&w=majority&appName=hp-quotes-api');

const Quote = mongoose.model('Quote', {
    sentence: String,
    author: String,
    movie: String
});

app.get("/", async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.send(quotes);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete("/:id", async (req, res) => {
    const quote = await Quote.findByIdAndDelete(req.params.id)
    return res.send(quote)
})

app.put("/:id", async (req, res) => {
    const quote = await Quote.findByIdAndUpdate(req.params.id, {
        sentence: req.body.sentence,
        author: req.body.author,
        movie: req.body.movie
    }, {
        new: true
    })
    return res.send(quote)
})

app.post("/", async (req, res) => {
        const quote = new Quote({
        sentence: req.body.sentence,
        author: req.body.author,
        movie: req.body.movie
    });

    await quote.save();
    return res.send(quote);

});

app.listen(port, () => {
    console.log('App running');
});
