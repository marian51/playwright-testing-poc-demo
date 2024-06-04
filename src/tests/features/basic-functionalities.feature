Feature: GUI Clickup basic functionalities tests

  @gui-clickup @clickup
  Scenario: Create space and check if space is created
    Given User can log in to the application
    When User creates new space
    Then new space is created
