@login
Feature: User login

  Scenario: Successful login
    Given I am on the login page
    When I attempt to log in with valid login credentials
    Then I should be redirected to the dashboard

    Scenario: Unsuccessful login with incorrect credentials
    Given I am on the login page
    When I attempt to log in with invalid login credentials
    Then I should see an error message on the login page