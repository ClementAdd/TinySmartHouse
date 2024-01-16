import { Router } from "express";
const indexRouter = Router();

/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  res.send({ title: "Express node mailer service" });
});

export default indexRouter;
