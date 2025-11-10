@wikisearch
Feature: Wikipedia search
  Scenario Outline: Search article and check required words
    Given I am on the Wikipedia home page
    When I search for "<topic>"
    Then the article should contain:
      | <word1> |
      | <word2> |
      | <word3> |

    Examples:
      | topic                 | word1     | word2    | word3      |
      | Playwright (software) | Microsoft | testing  | automation |
      | London                | capital   | Thames   | borough    |
      | Unit testing          | code      | assertion| framework  |
      | Automation testing    | software  | QA       | manual     |
