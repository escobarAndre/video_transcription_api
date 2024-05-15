import express from "express";
import cors from "cors";
import { downloader } from "./download-video.js";
import { createMP3 } from "./create-mp3.js";
import { transcribe } from "./transcribe.js";

const app = express();
app.use(cors());

app.get(
  "/audio",
  async (request, response) => {
    console.log(request)
    const videoId = request.query.videoId;
    console.log(videoId)
    try {
      await downloader(videoId)
      await createMP3()

      const data = await transcribe();

      return response.json(data)  
    } catch (error) {
      console.error(error)
      return response.status(500).send("Internal server error")
    }
  }
);

app.listen(3333, () => console.log("Server is running on port 3333"));
