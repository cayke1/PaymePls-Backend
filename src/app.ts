import express, { Express } from "express";
import { routes } from "./routes";
import cors from "cors";
import { errorHandlerMiddleware } from "./middlewares/ErrorHandler";
import { setupSwagger } from "./config/swagger";

class App {
  public express: express.Application | Express;

  public constructor() {
    this.express = express();

    setupSwagger(this.express as Express);
    this.middlewares();

    this.routes();

    this.errorHandler();
  }

  private middlewares() {
    this.express.use(express.json());

    this.express.use(
      cors({
        credentials: true,
      })
    );

    this.express.use(function (req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      next();
    });
  }

  private errorHandler() {
    this.express.use(errorHandlerMiddleware);
  }

  private routes() {
    this.express.use(routes);
  }
}

export default new App().express;
