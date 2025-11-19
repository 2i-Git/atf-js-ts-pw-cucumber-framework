@applications @create
Feature: Create a new application successfully
  The Application API should allow creating a valid application.

  Background:
    Given I have access to the Application API

  Scenario: Successfully creating a valid application
    When I submit a valid application
    Then the response status code should be 201
    And the application exists
