import { APIResponse } from "@playwright/test";
import { BaseAPI } from "./base";
import { WorldLike } from "../support/apiLogger";
import { currentEnv } from "../config/env.config";

const baseUrl = currentEnv.services.petStoreBaseUrl;

export interface Pet {
  id?: number;
  category?: {
    id?: number;
    name?: string;
  };
  name: string;
  photoUrls: string[];
  tags?: Array<{
    id?: number;
    name?: string;
  }>;
  status?: "available" | "pending" | "sold";
}

export interface Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  status?: "placed" | "approved" | "delivered";
  complete?: boolean;
}

export interface User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  userStatus?: number;
}

export class PetStoreAPI extends BaseAPI {
  baseUrl: string;

  constructor(world: WorldLike, customBaseUrl?: string) {
    super(world);
    this.baseUrl = customBaseUrl || baseUrl;
  }

  // Pet Operations

  async addPet(pet: Pet): Promise<APIResponse> {
    await this.init();
    return await this.post(`${this.baseUrl}/pet`, pet);
  }

  async updatePet(pet: Pet): Promise<APIResponse> {
    await this.init();
    return await this.put(`${this.baseUrl}/pet`, pet);
  }

  async findPetsByStatus(status: string): Promise<APIResponse> {
    await this.init();
    return await this.get(`${this.baseUrl}/pet/findByStatus?status=${status}`);
  }

  async getPetById(petId: number): Promise<APIResponse> {
    await this.init();
    return await this.get(`${this.baseUrl}/pet/${petId}`);
  }

  async deletePet(petId: number): Promise<APIResponse> {
    await this.init();
    return await this.delete(`${this.baseUrl}/pet/${petId}`);
  }

  // Store Operations

  async getStoreInventory(): Promise<APIResponse> {
    await this.init();
    return await this.get(`${this.baseUrl}/store/inventory`);
  }

  async placeOrder(order: Order): Promise<APIResponse> {
    await this.init();
    return await this.post(`${this.baseUrl}/store/order`, order);
  }

  async getOrderById(orderId: number): Promise<APIResponse> {
    await this.init();
    return await this.get(`${this.baseUrl}/store/order/${orderId}`);
  }

  async deleteOrder(orderId: number): Promise<APIResponse> {
    await this.init();
    return await this.delete(`${this.baseUrl}/store/order/${orderId}`);
  }

  // User Operations

  async createUser(user: User): Promise<APIResponse> {
    await this.init();
    return await this.post(`${this.baseUrl}/user`, user);
  }

  async getUserByUsername(username: string): Promise<APIResponse> {
    await this.init();
    return await this.get(`${this.baseUrl}/user/${username}`);
  }

  async updateUser(username: string, user: User): Promise<APIResponse> {
    await this.init();
    return await this.put(`${this.baseUrl}/user/${username}`, user);
  }

  async deleteUser(username: string): Promise<APIResponse> {
    await this.init();
    return await this.delete(`${this.baseUrl}/user/${username}`);
  }

  async loginUser(username: string, password: string): Promise<APIResponse> {
    await this.init();
    return await this.get(`${this.baseUrl}/user/login?username=${username}&password=${password}`);
  }

  async logoutUser(): Promise<APIResponse> {
    await this.init();
    return await this.get(`${this.baseUrl}/user/logout`);
  }
}
