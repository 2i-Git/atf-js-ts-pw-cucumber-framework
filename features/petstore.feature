Feature: PetStore - Add and find pet by ID
  The PetStore API should allow me to add a pet and retrieve it by ID.

  Background:
    Given I have access to the PetStore API

  Scenario: Add a new pet successfully
    When I add a new pet with the following details:
      | name     | Patch                         |
      | photoUrl | http://example.com/Patch.jpg |
      | status   | available                     |
    Then the pet should be created successfully
    And the response should contain the pet details

  Scenario: Get an existing pet by ID
    Given a pet exists with ID 1
    When I request the pet by ID 1
    Then the response status code should be 200
    And the response body should contain a pet object
