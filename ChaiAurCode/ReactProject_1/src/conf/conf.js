const conf = {
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_API_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_API_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_API_DATABASE_ID),
    appwriteTableId:String(import.meta.env.VITE_APPWRITE_API_TABLE_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_API_BUCKET_ID)
}


export default conf;