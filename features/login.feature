@login
Feature: User login

  Scenario Outline: Successful login with credentials from CSV
    Given I am on the login page
    When I attempt to log in using CSV row <row>
    Then I should be redirected to the dashboard

    Examples:
      | row |
      | 0   |
      | 1   |
