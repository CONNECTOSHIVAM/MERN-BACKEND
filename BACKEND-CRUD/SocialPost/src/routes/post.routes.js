import { Router } from "express";
import { createPost, deletePost, getPost, updatePost } from "../controllers/post.controller.js";

const router = Router();

router.route('/create').post(createPost);
router.route('/getpost').get(getPost);
router.route('/update/:id').put(updatePost)
router.route('/delete/:id').delete(deletePost)

export default router;