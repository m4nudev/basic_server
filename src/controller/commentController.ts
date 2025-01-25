import { RequestHandler } from "express";
import prismaClient from "../db/db.config";

export const fetchComments: RequestHandler = async (req, res) => {
    const comments = await prismaClient.comment.findMany({
        include: {
            user: true,
            post: {
                include: {
                    user: true
                }
            }
        }
    });

    res.status(200).json({
        comments
    })
}


export const createComment: RequestHandler = async (req, res) => {
    const { user_id, post_id, comment } = req.body;

    // Increase the comment counter
    await prismaClient.post.update({
        where: {
            id: Number(post_id),
        },
        data: {
            comment_count: {
                increment: 1,
            }
        }
    })

    const newComment = await prismaClient.comment.create({
        data: {
            user_id: Number(user_id),
            post_id: Number(post_id),
            comment,
        }
    })

    res.status(200).json({
        data: newComment,
        message: "Comment Created Successfully!!"
    })
}


export const showComment: RequestHandler = async (req, res) => {
    const commentId = req.params.id;
    const comment = await prismaClient.comment.findFirst({
        where: {
            id: commentId
        }
    })
    res.status(200).json({
        comment
    })
}

export const deleteComment: RequestHandler = async (req, res) => {
    const commentId = req.params.id;
    const { post_id } = req.body;

    // Decrease the comment counter
    await prismaClient.post.update({
        where: {
            id: Number(post_id),
        },
        data: {
            comment_count: {
                decrement: 1,
            }
        }
    })

    await prismaClient.comment.delete({
        where: {
            id: commentId,
        }
    })

    res.status(200).json({
        message: "Comment deleted Successfully!!"
    })
}