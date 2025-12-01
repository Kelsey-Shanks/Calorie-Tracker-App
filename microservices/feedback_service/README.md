## A connected program can utilize GET all and POST one operations: 

      GET all feedback data from database (reads data), 

      POST one program feedback data into database (creates data), 

## How to programmatically REQUEST data from the microservice: 

  Formatting for a request all: 
  
      await fetch('/name_of_import') 
      
                  // name_of_import is the controller's imported name for the model being accessed
              
  Examples of requests from connected programs to microservices for GET all: 
                
    const response = await fetch('/feedback_service');    
    
                // this is the calorie tracker application's call for feedback data
    
## How to programmatically RECEIVE data from the microservice: 

  Formatting for receiving the data:
  
      const data = await response.json();     
      
                  // used for GET operation shown above. PUT, POST, and DELETE just use response.status to track status of the operation.
                                              
                  // data will be an array of objects that meet the GET all request
      
                                             
  Examples of receiving data from the microservice for GET option:
  
    const badges = await response.json();                
    
                // this is what the calorie tracker application uses to read a GET of feedback entries

                
## UML sequence diagram:


<img width="755" height="435" alt="image" src="https://github.com/user-attachments/assets/d068bd73-58c7-42fb-a9b4-0f7d4b59b6d1" />
