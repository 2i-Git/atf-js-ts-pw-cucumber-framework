@countries
Feature: Countries in Europe

  Scenario: Count number of countries in Europe
    When I fetch the region "europe"
    Then I should get a list of countries
