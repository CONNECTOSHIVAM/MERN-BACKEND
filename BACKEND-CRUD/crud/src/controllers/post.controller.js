import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {

    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) return res.status(400).json({ message: "All fields are required." })

        const post = await Post.create({
            name,
            description,
            age,
        })

        res.status(201).json({
            message: "Post created successfully ||", post
        })

    } catch (error) {
        console.error("Server error of post creation ||",error)
        return res.status(500).json({message: " Server is error ||"+error.message})
    }

}

const lookPost = async (req, res) => {

    try {
        const posts = await Post.find()
        res.status(200).json(posts)

    } catch (error) {
        
        console.error("Server error of lookPost ||",error)
        return res.status(500).json({message: " Server is error ||"+error.message})    }
}

const updatePost = async (req, res) => {

    try {

        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message: "no data provide for update"})
        }




        
    } catch (error) {
        
    }
}

const deletePost = async (req,res) => {

    try {

        const deleted = await Post.findByIdAndUpdate(req.params.id);
        if(!deleted) return res.status(400).json({message: "Post not found."})

        res.status(200).json({message: "Post deleted is successfuly."})

        
    } catch (error) {
        
        console.error(`Server error from the delete Post. ||${error.message}`)
        res.status(500).json("Internal server issue...")
    }
}

export {createPost, lookPost, updatePost, deletePost}