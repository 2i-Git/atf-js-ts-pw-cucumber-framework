@applications @create
Feature: Create a new 2iGov API application successfully
  The Application API should allow creating a valid application.

  Background:
    Given I have access to the Application API

  Scenario: 2iGovAPI_Successfully creating a valid application
    When I submit a valid application
    Then the application exists
  @delete
  Scenario: 2iGovAPI_Successfully deleting an application
    Given an application exists
    When I delete the application
    Then the application should no longer exist
  @retrieve
  Scenario: 2iGovAPI_Successfully retrieving an application by ID
    Given an application exists
    When I request the application by its ID
    Then I should receive the application details


  @retrieve
  Scenario: 2iGovAPI_Successfully retrieving all applications
    Given multiple applications exist
    When I request all applications
    Then I should receive a list of all applications

 