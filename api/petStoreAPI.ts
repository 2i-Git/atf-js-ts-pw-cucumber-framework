import { APIResponse } from "@playwright/test";
import { BaseAPI } from "./base";
import { WorldLike } from "../support/apiLogger";
import { currentEnv } from "../config/env.config";
import { Pet, Order, User } from "../models/Petstore.models";

const baseUrl = currentEnv.services.petStoreBaseUrl;



export class PetStoreAPI extends BaseAPI {
  baseUrl: string;

  constructor(world: WorldLike, customBaseUrl?: string) {
    super(world);
    this.baseUrl = customBaseUrl || baseUrl;
  }

  // Pet Operations

  async addPet(pet: Pet): Promise<APIResponse> {
    return await this.post(`${this.baseUrl}/pet`, pet);
  }

  async updatePet(pet: Pet): Promise<APIResponse> {
    return await this.put(`${this.baseUrl}/pet`, pet);
  }

  async findPetsByStatus(status: string): Promise<APIResponse> {

    return await this.get(`${this.baseUrl}/pet/findByStatus?status=${status}`);
  }

  async getPetById(petId: number): Promise<APIResponse> {

    return await this.get(`${this.baseUrl}/pet/${petId}`);
  }

  async deletePet(petId: number): Promise<APIResponse> {

    return await this.delete(`${this.baseUrl}/pet/${petId}`);
  }

  // Store Operations

  async getStoreInventory(): Promise<APIResponse> {

    return await this.get(`${this.baseUrl}/store/inventory`);
  }

  async placeOrder(order: Order): Promise<APIResponse> {

    return await this.post(`${this.baseUrl}/store/order`, order);
  }

  async getOrderById(orderId: number): Promise<APIResponse> {

    return await this.get(`${this.baseUrl}/store/order/${orderId}`);
  }

  async deleteOrder(orderId: number): Promise<APIResponse> {

    return await this.delete(`${this.baseUrl}/store/order/${orderId}`);
  }

  // User Operations

  async createUser(user: User): Promise<APIResponse> {

    return await this.post(`${this.baseUrl}/user`, user);
  }

  async getUserByUsername(username: string): Promise<APIResponse> {

    return await this.get(`${this.baseUrl}/user/${username}`);
  }

  async updateUser(username: string, user: User): Promise<APIResponse> {

    return await this.put(`${this.baseUrl}/user/${username}`, user);
  }

  async deleteUser(username: string): Promise<APIResponse> {

    return await this.delete(`${this.baseUrl}/user/${username}`);
  }

  async loginUser(username: string, password: string): Promise<APIResponse> {

    return await this.get(`${this.baseUrl}/user/login?username=${username}&password=${password}`);
  }

  async logoutUser(): Promise<APIResponse> {

    return await this.get(`${this.baseUrl}/user/logout`);
  }
}
