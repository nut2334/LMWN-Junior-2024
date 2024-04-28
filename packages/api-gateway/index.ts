import express, { Application } from "express";
import cors from "cors";
import axios from "axios";

const app: Application = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("LINE MAN Wongnai Frontend Assignment"));
app.get("/Restaurant/:id", (req, res) => {
  let id = req.params.id;
  axios
    .get(
      "https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/" +
        id +
        ".json"
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});
app.get("/ShortMenu/:id/:menu", (req, res) => {
  let id = req.params.id;
  let menu = req.params.menu;
  axios
    .get(
      "https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/" +
        id +
        "/menus/" +
        menu +
        "/short.json"
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});
app.get("/FullMenu/:id/:menu", (req, res) => {
  let id = req.params.id;
  let menu = req.params.menu;
  axios
    .get(
      "https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/" +
        id +
        "/menus/" +
        menu +
        "/full.json"
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${(error as Error).message}`);
}
