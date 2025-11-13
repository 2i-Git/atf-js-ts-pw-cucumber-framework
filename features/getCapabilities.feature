@defra
Feature: Get Capabilities from AIR Sensor Observation Service

  Scenario: Request capabilities and verify the response
    Given I have the AIR SOS service endpoint
    When I request the GetCapabilities data
    Then I should receive a 200 status code
    And I should see a list of capabilities
