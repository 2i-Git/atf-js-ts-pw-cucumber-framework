@petstore
Feature: PetStore - Add and find pet by ID
  The PetStore API should allow me to add a pet and retrieve it by ID.

  Background:
    Given I have access to the PetStore API

  Scenario: Create a new pet
    When I add a new pet with name "Patch"
    Then the pet exists

  Scenario: Create a completely randomized pet using Faker
    When I add a completely randomized pet
    Then the pet exists

  Scenario: Create a simple pet with minimal data
    When I add a simple pet
    Then the pet exists

  Scenario: Get an existing pet by ID
    Given a valid pet ID
    When I request the pet by ID
    Then the pet exists