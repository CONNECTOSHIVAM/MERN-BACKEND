import express from 'express'
import dotenv from 'dotenv'

//load env varibles
dotenv.config()
const port = process.env.PORT

const app = express();

app.get('/', (req, res) => {
    res.send(`<h1>radhe radhe</h1>`)
})

app.get('/api/jaun', (req, res) => {
    const poetry = [
        {
            id: 1,
            title: "Heartbeat",
            poetry: "You’re not just in my heart, you are my heartbeat."
        },
        {
            id: 2,
            title: "Garden of Love",
            poetry: "If I had a flower for every time I thought of you, I could walk in my garden forever."
        },
        {
            id: 3,
            title: "Fate",
            poetry: "Meeting you was fate, becoming your friend was a choice, but falling in love with you was beyond my control."
        },
        {
            id: 4,
            title: "Unwritten Poem",
            poetry: "You’re the poem I never knew how to write, and the song I always wanted to hear."
        },
        {
            id: 5,
            title: "Chapter of Life",
            poetry: "Every time I look at you, I see my favorite chapter of life being written."
        }
    ];
    res.json(poetry)
})
app.listen(port, () => {
    console.log(`server run on http://localhost:${port}`)
})

