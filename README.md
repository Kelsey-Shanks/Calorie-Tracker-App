# Calorie-Tracker Application 

This application can be used to track calories eaten and burned, daily calorie totals, track meals eaten, track exercises completed, and complete fun health achievements. 
This program is a react.js project that uses microservices for all backend activities and other helpful functionalities.
This application was developed as a portfolio project in my software engineering course.
All appliation code can be found in the calorie-tracker folder.

## Microservices Used

All microservices used in the Calorie-Tracker application can be found in the microservices folder.

Database Service

  This service is the main REST API backend support for my application.
  All calorie entry data, meal data, and exercise data is populated from this service and operated on with this service.
  More information on how my application uses this service can be found in the UML diagram in the database_service folder.

Search Service

  This service utilizes a controller.mjs to allow POST requests from the main program to check the array provided for matches with the search input. Once it finds a match, it returns an array of matches back to the main program.
  The "Find Meal" and "Find Activity" pages utilize this service to provide a search-type function to this page.
  More information on how my application uses this service can be found in the UML diagram in the search_service folder.

Badge Service

  This service uses a REST API backend to retrieve badge data from a database and send that data to the main program.
  The "Home" page and app.jsx utilizes this service to provide badges that update upon user data meeting certain requirements.
  More information on how my application uses this service can be found in the UML diagram in the achievement_badge_service folder.

Feedback Service

  This service uses a REST API backend to send feedback data to a database and allows the main program to retrieve that data (only accessible with password access).
  The "Feedback" pages utilize this service to provide an input form to submit feedback and provide previous feedback submissions to admin.
  More information on how my applicaiton uses this service can be found in the UML diagram in the feedback_service folder.

User Profile Settings Service (IN PROGRESS)

This service uses a REST API backend to set user profile settings based on the log in information of the user in relation to matching data in the database.
All pages will utilize this service to set appearances, language, and user data.
More information on how my application uses this service will be found in the UML diagram in the user_profile_settings_service holder (COMING SOON).

Sum Service

  This service is a controller provided at on online URL that takes an array of numbers and sends back the sum. (URL WILL BE REMOVED SOON, SO LOCAL FILE SAVED FOR SERVICE)
  The "Home" page, "Meal History" page, and "Exercise History" page all use this service to provide the calorie summaries.
  More information on how my application uses this service will be found in the README in the sum_service folder.
