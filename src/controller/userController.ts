
import { RequestHandler } from "express";
import prismaClient from "../db/db.config";

export const createUser: RequestHandler = async (req, res) => {
    const { name, email, password } = req.body;

    const findUser = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    })

    if (findUser) {
        res.status(400).json({
            message: "Email Already Taken, Please use another email."
        })
    }

    const newUser = await prismaClient.user.create({
        data: {
            email,
            name,
            password
        }
    })

    res.status(200).json({
        data: newUser,
        message: "User created!!"
    })
}

export const fetchUser: RequestHandler = async (req, res) => {
    const users = await prismaClient.user.findMany({
        // include: {
        //     Post: {
        //         select: {
        //             title: true,
        //             comment_count: true
        //         }
        //     }
        // },
        // ----------------------------------------
        select: {
            _count: {
                select: {
                    post: true,
                    comment: true
                }
            }
        }
        // include: {
        //     post: {
        //         select: {
        //             title: true
        //         }
        //     }
        // }
    });

    res.status(200).json({
        users
    })
}

export const showUser: RequestHandler = async (req, res) => {
    const userId = req.params.id;
    const user = await prismaClient.user.findFirst({
        where: {
            id: Number(userId),
        }
    })
    res.status(200).json({
        user
    })
}

export const updateUser: RequestHandler = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    await prismaClient.user.update({
        where: {
            id: Number(userId),
        },
        data: {
            name,
            email,
            password
        }
    })
    res.status(201).json({
        message: "User updated Successfully"
    })
}

export const deleteUser: RequestHandler = async (req, res) => {
    const userId = req.params.id;
    await prismaClient.user.delete({
        where: {
            id: Number(userId),
        }
    })
    res.status(200).json({
        message: "User deleted Successfully!!"
    })
}