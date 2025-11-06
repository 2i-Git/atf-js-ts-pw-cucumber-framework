@govsearch @smoke
Feature: gov.uk Search
  
  @visa
  Scenario: Searching for visa
    Given the user is on the gov.uk homepage
    When the user searches gov.uk for "visa"
    Then the results should include "visa"

  Scenario: Searching for passport
    Given the user is on the gov.uk homepage
    When the user searches gov.uk for "passport"
    Then the results should include "passport"

  Scenario: Searching for driving license
    Given the user is on the gov.uk homepage
    When the user searches gov.uk for "driving license"
    Then the results should include "driving"

