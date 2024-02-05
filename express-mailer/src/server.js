import app from "./app.js";

const port = process.env.PORT || 1375;

process.on("SIGINT", function () {
  console.log("👋🏼 Shutting down the server . . . ");
  process.exit(0);
});

app.listen(port, () => {
  console.log(`🛠️  Server is listening on : http://localhost:${port}`);
  console.log("⚠️  To exit press CTRL+C");
});
