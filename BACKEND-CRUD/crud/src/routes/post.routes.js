import { Router } from "express";
import { createPost, deletePost, lookPost, updatePost } from "../controllers/post.controller.js";

const router = Router();

router.route('/create').post(createPost);
router.route('/looks').get(lookPost);
router.route('/update/:id').patch(updatePost)
router.route('delete/:id').delete(deletePost)


export default  router;

