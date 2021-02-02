const express = require("express");
const multer = require("multer");
const routes = express.Router();

const uploadConfig = require("./config/upload");
const serviceController = require("./controllers/serviceController");
const userController = require("./controllers/userController");
const agendaController = require("./controllers/agendaController");
const authController = require("./controllers/authController");
const userServiceController = require("./controllers/userServiceController");
const userServiceSearch = require("./controllers/userServiceSearch");
const userAgendaController = require("./controllers/userAgendaController");
const specifyServiceController = require("./controllers/specifyServiceController");

const upload = multer(uploadConfig);

routes.post("/auth", authController.login);

routes.get("/users", userController.index); // Lista todos os usuários
routes.get("/users/:id", userController.get); // Lista apenas um usuário
routes.post("/users", upload.single("avatar"), userController.create); // Cria um usuário
routes.put("/users/:id", upload.single("avatar"), userController.update);
routes.delete("/users/:id", userController.delete);

routes.get("/services", serviceController.index);
routes.post("/services", serviceController.create);
routes.delete("/services/:id", serviceController.delete);
routes.put("/services/:id", serviceController.update);
routes.get("/specifyService/:service_id", specifyServiceController.index); // Lista apenas um serviço especifico

routes.get("/userServices/", userServiceController.index);
routes.get("/userServiceSearch", userServiceSearch.index);

routes.get("/agenda", agendaController.index);
routes.post("/agenda", agendaController.create);
routes.delete("/agenda/:id", agendaController.delete);
routes.put("/agenda/:id", agendaController.update);

routes.get("/userAgenda/:id", userAgendaController.index);

module.exports = routes;
