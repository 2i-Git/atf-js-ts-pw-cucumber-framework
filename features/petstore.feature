@petstore
Feature: Petstore API Testing

  Background:
    Given Pet endpoint

  Scenario: Create a new pet
    When I add a new pet named "Patch"
    Then the pet exists
