import config from "./config";
import { Client, Account, Storage, ID } from "appwrite";

export class Service {
  client = new Client();
  account;
  storage;
  bucket;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("65dc248ac2038b34e8a3");
    this.account = new Account(this.client);
    this.storage = new Storage(this.client);
    this.bucket = new Storage(this.client);
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }
async logout () {
    try {
        return await this.account.deleteSessions() ;
    } catch (error) {
        throw error
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
 
  async uploadFile(file) {
    try {
      return await this.storage.createFile(config.appwriteBucketId, file);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(fileId);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      return await this.storage.getFilePreview(fileId);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

const service = new Service();

export default service;
