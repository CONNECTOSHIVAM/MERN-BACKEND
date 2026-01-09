import { Router } from "express";
import { createPost, getPost, updatePost, deletePost } from "../controllers/post.controller.js";


const router = Router();

router.route('/create').post(createPost)
router.route('/lookposts').get(getPost)
router.route('/update').get(updatePost)
router.route('/deletePost').get(deletePost)

export default router;