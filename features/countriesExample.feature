@countries
Feature: Countries by region

  Scenario Outline: Count number of countries in a region
    When I fetch the region "<region>"
    Then I should get a list of countries

    Examples:
      | region     |
      | africa     |
      | americas   |
      | asia       |
      | europe     |
      | oceania    |
      | antarctic  |
