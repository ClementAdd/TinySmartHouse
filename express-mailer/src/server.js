import app from "./app.js";

const port = process.env.PORT || 1375;

app.listen(port, () => {
  console.log(`Server is listening on : http://localhost:${port}`);
});
