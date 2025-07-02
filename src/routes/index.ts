import { Router } from "express";
import { BookRoutes } from "../modules/book/book.routes";

export const router = Router();

interface Route {
  path: string;
  route: Router;
}

const routes: Route[] = [
  {
    path: "/books",
    route: BookRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});
