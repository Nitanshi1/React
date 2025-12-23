import conf from "../conf/conf.js";

import { Client, ID, Query, Databases, Storage, Account } from "appwrite";
export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // all the methods for CRUD operations on posts are defined here by the help of Appwrite Docs..

  // Slug is used as a unique identifier for each post. Here in the respect of documentID

async createPost({ title, slug, content, featuredImage, status, userId }) {
  try {
    return await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteTableId,
      slug, // documentId
      {
        title,
        content,
        featuredImage,
        status,
        userId,
      }
    );
  } catch (error) {
    console.log("Appwrite service :: createPost :: error", error);
  }
}

  // async createPost({ title, slug, content, featuredImage, status, userId }) {
  //   try {
  //     return await this.databases.createDocument(
  //       conf.appwriteDatabaseId,
  //       // conf.appwriteTableId,
  //       slug,
  //       {
  //         title,
  //         content,
  //         featuredImage,
  //         status,
  //         userId,
  //       }
  //     );
  //   } catch (error) {
  //     console.log("Appwrite serive :: createPost :: error", error);
  //   }
  // }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  // async getPost() {
  //   try {
  //     return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteTableId,  slug);
  //   } catch (error) {
  //     console.log("Appwrite serive :: getPost :: error", error);

  //     return false;
  //   }
  // }
  async getPost(slug) {
    return await this.databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteTableId,
      slug
    );
  }

  // async getPosts(queries = [Query.equal("status", "active")]) {
  //   try {
  //     return await this.databases.listDocuments(
  //       conf.appwriteDatabaseId,
  //       conf.appwriteTableId,
  //       queries
  //     );
  //   } catch (error) {
  //     console.log("Appwrite serive :: getPosts :: error", error);
  //     return false;
  //   }
  // }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteTableId, // ✅ REQUIRED
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  //file upload SERVICE
  // async uploadFile(file) {
  //   try {
  //     await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
  //     return true;
  //   } catch (error) {
  //     console.log("Appwrite serive :: uploadFile :: error", error);
  //     return false;
  //   }
  // }
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
