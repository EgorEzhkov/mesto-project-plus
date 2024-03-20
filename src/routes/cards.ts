import { createCard, deleteCard, getCards } from "../controllers/cards";
import { Router } from "express";

const router = Router();

router.post("/cards", createCard);

router.get("/cards", getCards);

router.delete("/cards/:cardId", deleteCard);

export default router;
