import app from "./app";
import { pool } from "./db";

const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected successfully");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();