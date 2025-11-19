/**
 * PetStore Faker Data Generators
 * Utilities for generating randomized test data for PetStore API testing
 * Based on Swagger PetStore API specification: https://petstore.swagger.io/v2/swagger.json
 */

import { faker } from "@faker-js/faker";
import { Pet, Order, User } from "../Petstore.models";

// Generates a fully randomized Pet object using Faker

export function generatePet(overrides?: Partial<Pet>): Pet {
  // Common pet categories from the PetStore API
  const categories = ["Dogs", "Cats", "Birds", "Fish", "Reptiles", "Small Pets"];

  // Common pet tags
  const availableTags = [
    "friendly",
    "vaccinated",
    "trained",
    "neutered",
    "microchipped",
    "good with kids",
    "good with other pets",
    "hypoallergenic",
    "indoor",
    "outdoor",
  ];

  return {
    id: faker.number.int({ min: 1, max: 999999 }),
    category: {
      id: faker.number.int({ min: 1, max: 6 }),
      name: faker.helpers.arrayElement(categories),
    },
    name: faker.animal.type(),
    photoUrls: [
      faker.image.url(),
      faker.image.url(),
      faker.image.url(),
    ],
    tags: faker.helpers.arrayElements(availableTags, { min: 1, max: 3 }).map((tagName,) => ({
      id: faker.number.int({ min: 1, max: 100 }),
      name: tagName,
    })),
    status: faker.helpers.arrayElement(["available", "pending", "sold"] as const),
    ...overrides,
  };
}


// Generates a simple Pet with only required fields (name and photoUrls)

export function generateSimplePet(overrides?: Partial<Pet>): Pet {
  return {
    name: faker.animal.type(),
    photoUrls: [faker.image.url()],
    ...overrides,
  };
}

//Generates a Pet with a specific status
export function generatePetWithStatus(
  status: "available" | "pending" | "sold",
  overrides?: Partial<Pet>
): Pet {
  return generatePet({ status, ...overrides });
}

//Generates a randomized Order object using Faker
export function generateOrder(overrides?: Partial<Order>): Order {
  return {
    id: faker.number.int({ min: 1, max: 999999 }),
    petId: faker.number.int({ min: 1, max: 999999 }),
    quantity: faker.number.int({ min: 1, max: 10 }),
    shipDate: faker.date.future().toISOString(),
    status: faker.helpers.arrayElement(["placed", "approved", "delivered"] as const),
    complete: faker.datatype.boolean(),
    ...overrides,
  };
}

// Generates a randomized User object using Faker
// Follows the PetStore API specification with all optional fields populated
export function generateUser(overrides?: Partial<User>): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.number.int({ min: 1, max: 999999 }),
    username: faker.internet.username({ firstName, lastName }),
    firstName: firstName,
    lastName: lastName,
    email: faker.internet.email({ firstName, lastName }),
    password: faker.internet.password({ length: 12 }),
    phone: faker.phone.number(),
    userStatus: faker.number.int({ min: 0, max: 5 }),
    ...overrides,
  };
}

//  Generates multiple randomized Pets

export function generatePets(count: number): Pet[] {
  return Array.from({ length: count }, () => generatePet());
}

//  Generates multiple randomized Orders

export function generateOrders(count: number): Order[] {
  return Array.from({ length: count }, () => generateOrder());
}

// Generates multiple randomized Users
export function generateUsers(count: number): User[] {
  return Array.from({ length: count }, () => generateUser());
}

// Seed Faker for reproducible test data

export function seedFaker(seed: number): void {
  faker.seed(seed);
}
