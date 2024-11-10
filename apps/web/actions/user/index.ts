"use server";

import prisma from "../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AwardIcon } from "lucide-react";
import cloudinary from "cloudinary";
import { v2 as cloudinaryV2 } from "cloudinary";

// Configure Cloudinary
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadImageToCloudinary(imageFile: File): Promise<any> {
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    const cloudinaryResponse = await new Promise((resolve, reject) => {
        cloudinaryV2.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        }).end(buffer); 
    });

    
    return cloudinaryResponse;
}

export async function register(email: string, password: string, name: string) {
  try {
    const find = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (find) {
      return {
        success: false,
        message: "User already exists",
      };
    }
    const saltround = 10;
    const salt = await bcrypt.genSalt(saltround);
    const hash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
        name: name,
      },
    });
    const token = await jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      {
        expiresIn: "10d",
      }
    );

    return {
      success: true,
      message: "User registered successfully",
      token,
      user
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message: "User registration failed",
    };
  }
}

export async function login(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    const token = await jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      {
        expiresIn: "10d",
      }
    );

    return {
      success: true,
      message: "Login successful",
      token,
      user
    };
  } catch (error) {
    console.error("Error logging in user:", error);
    return {
      success: false,
      message: "Login failed",
    };
  }
}

export async function addCampaign(token:any, category:any,deadline:any,description:any,goal:any,title:any,walletAddress:any) {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      return {
        success: false,
        message: "Invalid token",
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        id: parseInt(decoded.userId) as number,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

  
    const campaign = await prisma.campaign.create({
      data: {
        title: title,
        description: description,
        goal: parseInt(goal),
        deadline: deadline,
        creatorId: user.id,
        image: "",
        walletAddress: walletAddress,
        category: category,
      },
    });

    return {
      success: true,
      message: "Campaign created successfully",
      campaign
    };
  } catch (error) {
    console.error("Error creating campaign:", error);
    return {
      success: false,
      message: "Campaign creation failed",
    };
  }
}

export async function getCapaigns() {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        creator: true,
      },
    });

    return campaigns;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
}