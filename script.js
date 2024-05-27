const express = require('express');
const app = express();
const ytdl = require("ytdl-core");
const cors = require("cors");

const corsOptions = {
    origin: "https://nirvay.netlify.app",
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: "*",
};
app.use(cors(corsOptions));

app.get("/download", async (req, res, next) => {
    console.log(req.query.url);
    try {
        const videoUrl = req.query.url;
        const videoInfo = await ytdl.getInfo(videoUrl);
        const audioFormats = ytdl.filterFormats(videoInfo.formats, "audioonly");
        console.log(audioFormats);

        // Assuming you want to send all audio formats' URLs as a JSON array
        const audioUrls = audioFormats.map(item => item.url);
        res.json(audioUrls);
    } catch (error) {
        next(error);
    }
});

app.listen(3000, () => {
    console.log("Server running at port 3000");
});
