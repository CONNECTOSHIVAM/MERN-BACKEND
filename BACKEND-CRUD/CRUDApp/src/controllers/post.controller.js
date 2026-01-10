import { Post } from "../models/post.model.js";

const createPost = async(req,res) => {

    try {
        
        const {name,description,age} = req.body;

        if(!name || !description || !age)
        {
            return res.status(400).json({message: "All fields are required."})
        }

        const post = await Post.create({name, description,age});

        res.status(201).json({
            message:"Post created successfully: ",post
        })
    } catch (error) {
        console.error("Post creation error:",error)
        return res.status(500).json({message: "Internal server error"})
    }

}

//read all the posts
const getPost = async(req,res) => {

    try {
        const posts = await Post.find();
        res.status(200).json(posts)
        
    } catch (error) {
        console.error(`Get Post error`,error)
        return res.status(500).json({message: "Internal sever error."})
    }
}

const updatePost = async(req,res) => {

    try {
        //basic validation to check if the body is empty.
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message:"No data provide for update."})
        }

        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new: true});

        if(!post) return res.status(404).json({
            message: "post not found."
        })

        res.status(200).json({
            message: "Post Updated Successfully",post
        })
        


    } catch (error) {
        console.error("Internal Server Error",error)
        return res.status(500).json({message: "Internal server error..",error})
    }
}

const deletePost = async(req,res) => {

    try {
        
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(400).json({message: "post not found."})

        res.status(200).json({message: "Post is deleted successfully."})
        
    } catch (error) {
        console.error("Delete Post Error...",error);
        return res.status(500).json("Internal server issue...")
    }
}

export {createPost, getPost, updatePost, deletePost}