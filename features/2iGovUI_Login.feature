@login
Feature: 2iGovUI User login

  Scenario Outline: 2iGovUI_Successful login with credentials from CSV
    Given I am on the login page
    When I log in with valid credentials <row>
    Then I should be redirected to the dashboard

    Examples:
      | row |
      | 0   |
      | 1   |
