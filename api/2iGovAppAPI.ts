import { APIResponse } from "@playwright/test";
import { BaseAPI } from "./base";
import { WorldLike } from "../support/apiLogger";
import { currentEnv } from "../config/env.config";

const baseUrl = currentEnv.services.govAppAPIBaseUrl;

export interface Address {
  line1: string;
  line2?: string;
  town: string;
  county?: string;
  postcode: string;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: Address;
}

export interface BusinessDetails {
  businessName: string;
  companyNumber?: string;
  businessType: string;
  businessPhone: string;
  businessEmail?: string;
  businessAddress: Address;
}

export interface LicenseDetails {
  licenseType: string;
  premisesType: string;
  premisesAddress: Address;
  activities: string[];
  operatingHours?: Record<string, string>;
}

export interface ApplicationPayload {
  personalDetails: PersonalDetails;
  businessDetails: BusinessDetails;
  licenseDetails: LicenseDetails;
  declaration: boolean | string;
}

// Response Types

export interface CreateApplicationResponse {
  success: boolean;
  data: {
    applicationId: number | string;
    status: string;
    [key: string]: unknown;
  };
}

// API Client

export class GovApplicationAPI extends BaseAPI {
  baseUrl: string;

  constructor(world: WorldLike, customBaseUrl?: string) {
    super(world);
    this.baseUrl = customBaseUrl || baseUrl;
  }

  async createApplication(
    application: ApplicationPayload
  ): Promise<APIResponse> {
    await this.init();
    return await this.post(`${this.baseUrl}/applications`, application);
  }

  async getApplicationById(id: string | number): Promise<APIResponse> {
    await this.init();
    return await this.get(`${this.baseUrl}/applications/${id}`);
  }

  async deleteApplication(id: string | number): Promise<APIResponse> {
    await this.init();
    return await this.delete(`${this.baseUrl}/applications/${id}`);
  }

  async getApplications(query?: {
    limit?: number;
    offset?: number;
    status?: string;
  }): Promise<APIResponse> {
    await this.init();
    const params = new URLSearchParams();
    if (query?.limit !== undefined) params.append("limit", String(query.limit));
    if (query?.offset !== undefined)
      params.append("offset", String(query.offset));
    if (query?.status) params.append("status", query.status);

    const url =
      params.toString().length > 0
        ? `${this.baseUrl}/applications?${params.toString()}`
        : `${this.baseUrl}/applications`;

    return await this.get(url);
  }
}
