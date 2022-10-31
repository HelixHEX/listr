import { Client, Account, ID, Databases, Query } from "appwrite";
import {
  APPWRITE_PROJECT_ID,
  APPWRITE_ENDPOINT,
  APPWRITE_DATABASE,
  APPWRITE_LIST_COLLECTION_ID,
  APPWRITE_TASK_COLLECTION_ID,
} from "@env";

const appwrite = new Client();

class AppwriteService {
  account;
  database;
  constructor() {
    appwrite.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
    this.account = new Account(appwrite);
    this.database = new Databases(appwrite);
  }

  async createAccount({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    let account = await this.account.create(ID.unique(), email, password, name);
    if (account) {
      return this.login({ email, password });
    } else {
      return account;
    }
  }

  async getCurrentUser() {
    return await this.account.get();
  }

  logout() {
    return this.account.deleteSession("current");
  }

  async login({ email, password }: { email: string; password: string }) {
    return await this.account.createEmailSession(email, password);
  }

  //get lists from appwrite
  async getLists() {
    let user = await this.getCurrentUser();
    //subscribe to realtime updates on list collection
    let lists = await this.database.listDocuments(
      APPWRITE_DATABASE,
      APPWRITE_LIST_COLLECTION_ID,
      [Query.equal("user_id", user.$id)]
    );
    return lists;
  }

  //delete a list
  async deleteList({ id }: { id: string }) {
    return await this.database.deleteDocument(
      APPWRITE_DATABASE,
      APPWRITE_LIST_COLLECTION_ID,
      id
    );
  }

  //update list name and color
  async updateList({ id, name, color }: { id: string; name: string; color: string }) {
    return await this.database.updateDocument(
      APPWRITE_DATABASE,
      APPWRITE_LIST_COLLECTION_ID,
      id,
      {
        name,
        color,
      }
    );
  }

  //create a list
  async createList({ name, color }: { name: string; color: string }) {
    let user = await this.getCurrentUser();
    return await this.database.createDocument(
      APPWRITE_DATABASE,
      APPWRITE_LIST_COLLECTION_ID,
      ID.unique(),
      {
        name,
        color,
        user_id: user.$id,
      }
    );
  }

  //get tasks from appwrite
  async getTasks({ listId }: { listId: string }) {
    let user = await this.getCurrentUser();
    let tasks = await this.database.listDocuments(
      APPWRITE_DATABASE,
      APPWRITE_TASK_COLLECTION_ID,
      [Query.equal("list_id", listId)]
    );
    return tasks;
  }

  //create a task
  async createTask({ name, list_id }: { name: string; list_id: string }) {
    let user = await this.getCurrentUser();
    return await this.database.createDocument(
      APPWRITE_DATABASE,
      APPWRITE_TASK_COLLECTION_ID,
      ID.unique(),
      {
        name,
        list_id,
        user_id: user.$id,
        completed: false,
      }
    );
  }

  //update a task to completed or not completed
  async updateTask({ id, completed }: { id: string; completed: boolean }) {
    return await this.database.updateDocument(
      APPWRITE_DATABASE,
      APPWRITE_TASK_COLLECTION_ID,
      id,
      {
        completed,
      }
    );
  }
}

export default AppwriteService;