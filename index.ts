import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

const topics: Record<string, ((data: string) => void)[]> = {}

app.get("/sub/:topic", (req, res) => {
  const topic = req.params.topic
  if (!topics[topic]) {
    topics[topic] = []
  }

  const subFunc = async (data: string) => {
    topics[topic] = topics[topic].filter((f) => f !== subFunc)

    res.json({
      topic,
      data,
    })
  }

  console.log("New topic registered")
  topics[topic].push(subFunc)
})

app.post("/pub/:topic", async (req, res) => {
  const topic = req.params.topic
  const data = req.body.data

  if (topics[topic]) {
    while (topics[topic].length)
      for (const sub of topics[topic]) {
        sub(data)
      }
  }

  res.json({
    topic,
  })
})

app.get("/topics", (req, res) => {
  res.json(Object.keys(topics))
})

app.listen(3080)
