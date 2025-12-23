import conf from "../conf/conf.js";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method here we use login if user acc finds then logged in directly on the login screen
        return this.login(email, password);

        
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  } //use the create method

 async login(email, password) {
  try {
    return await this.account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw error;
  }
}


  async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

   async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    } //deleteSessions method for deleting all current sessions and deleteSessions("current") for current session only
}

// Delete session
// Logout the user. Use 'current' as the session ID to logout on this device, use a session ID to logout on another device. If you're looking to logout the user on all devices, use Delete Sessions instead.
//Delete all sessions from the user account and remove any sessions cookies from the end client.
const authService = new AuthService();

export default authService;
