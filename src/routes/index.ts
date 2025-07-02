import { Router } from "express";

export const router = Router();

interface Route {
  path: string;
  route: Router;
}

const routes: Route[] = [];

routes.forEach((route) => {
  router.use(route.path, route.route);
});
