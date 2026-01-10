import { Post } from "../models/post.models.js";
const createPost = async (req,res) => {

    try {

        const {name, description, age} = req.body;

        if(!name || !description || !age) return res.status(400).json
        ({
            message: "All feel are must required."
        })

        const post = await Post.create({name,description,age})

        res.status(200).json({
            message: "Post Created successfully.",post
    
        })
    
        
    } catch (error) {
        console.error("Post Creation error: ",error);
        return res.status(500).json({message: "Internal server error."+error.message})
    }
}

//read the all posts.
const getPost = async (req,res) => {

    try {
        
        const posts = await Post.find();
        res.status(200).json(posts)
    } catch (error) {
        console.error("getPost Error ",error);
        return res.send(500).json({message: "Internal server error."})
    }
}

const updatePost = async (req,res) => {

    try {
        //basic validation to check the if body is empty.
        if(Object.keys(req.body).length === 0) return res.status(400).json({
            message: "no data provide for update."
        })

        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new: true})

        if(!post) return res.status(400).json({message: "Post not found."})

        res.status(200).json({
            message: "Post Updated successfully dear..",post
        })

    } catch (error) {
        console.error("Post updation error",error);
        return res.status(500).json(error.message)
    }
}

const deletePost = async (req,res) => {

    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(400).json({message: "post not found."});

        res.status(200).json({message: "Post is deleted successfully."})
    } catch (error) {
        console.error("Post Deletion error",error);
        return res.status(500).json({message: "Internal Server error"+error.message})
    }
}


export {createPost, getPost, updatePost, deletePost };