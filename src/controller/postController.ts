
import { RequestHandler } from "express";
import prismaClient from "../db/db.config";

export const fetchPosts: RequestHandler = async (req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    if (page <= 0) {
        page = 1;
    }
    if (limit <= 0 || limit > 100) {
        limit = 10;
    }

    const skip = (page - 1) * limit;

    const posts = await prismaClient.post.findMany({
        skip: skip,
        take: limit,
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
        where: {
            NOT: {
                title: {
                    endsWith: "Blog"
                }
            }
        }
    });

    const totalPosts = await prismaClient.post.count();
    const totalPages = Math.ceil(totalPosts / limit);
    res.status(200).json({
        posts,
        meta: {
            totalPages,
            currentPage: page,
            limit: limit
        }
    })
};


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
        message: "Post created Successfully!!"
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