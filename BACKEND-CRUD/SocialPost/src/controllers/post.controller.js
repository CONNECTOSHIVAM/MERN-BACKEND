import {Post} from "../models/user.models.js"

const createPost = async (req,res) => {

    try {

        const {name, description, age} = req.body;

        if(!name || !description || !post) return res.status(400).json
        ({
            message: "All feel are must required."
        })

        const post = await Post.create({name,description,age})

        res.status(200).json({
            message: "Post Created successfully.",
            post
        })
    
        
    } catch (error) {
        console.error("Post Creation error: ",error);
        return res.status(500).json({message: "Internal server error."+error.message})
    }
}


export {createPost};