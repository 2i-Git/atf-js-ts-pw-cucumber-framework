@defra
Feature: Get Capabilities from AIR Sensor Observation Service

  Scenario: Request capabilities and verify the response
    Given I have the AIR SOS service endpoint
    When I request the GetCapabilities data
    Then I should receive a 200 status code
    And I should see a list of capabilities

  Scenario: Incorrectly request capabilities and receive a 404 response
    Given I have an incorrect AIR SOS service endpoint
    When I request the GetCapabilities data
    Then I should receive a 404 status code
    And I should see the message "The requested resource is not available"
