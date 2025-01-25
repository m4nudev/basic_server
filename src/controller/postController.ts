
import { RequestHandler } from "express";
import prismaClient from "../db/db.config";


export const createPost: RequestHandler = async (req, res) => {
    const { user_id, title, description } = req.body;

    const newPost = await prismaClient.post.create({
        data: {
            user_id: Number(user_id),
            title,
            description
        }
    })

    res.status(200).json({
        data: newPost,
        message: "Post created!!"
    })
}

export const fetchPosts: RequestHandler = async (req, res) => {
    const posts = await prismaClient.post.findMany({
        include: {
            comment: {
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        },
        orderBy: {
            id: "desc"
        },
        // where: {
        //     comment_count: {
        //         gt: 0
        //     }
        // }
        where: {
            title: {
                startsWith: "Next",
            }
        }
    });

    res.status(200).json({
        posts
    })
}

export const showPost: RequestHandler = async (req, res) => {
    const postId = req.params.id;
    const post = await prismaClient.post.findFirst({
        where: {
            id: Number(postId),
        }
    })
    res.status(200).json({
        post
    })
}

export const updatePost: RequestHandler = async (req, res) => {
    const postId = req.params.id;
    const { title, description } = req.body;

    await prismaClient.post.update({
        where: {
            id: Number(postId),
        },
        data: {
            title,
            description
        }
    })
    res.status(201).json({
        message: "Post updated Successfully"
    })
}

export const deletePost: RequestHandler = async (req, res) => {
    const postId = req.params.id;
    await prismaClient.post.delete({
        where: {
            id: Number(postId),
        }
    })
    res.status(200).json({
        message: "Post deleted Successfully!!"
    })
}

// To search the post
export const searchPost: RequestHandler = async (req, res) => {
    const query = req.query.q;
    const posts = await prismaClient.post.findMany({
        where: {
            description: {
                search: query as string,
            }
        }
    })
    res.status(200).json({
        posts
    })
}