For a program to use this microservice, they must have a defined schema in a model.mjs for that program and they must have defined CRUD operations in the controller that accesses that model.

A connected program can utilize all CRUD operations: 

      GET all program data from database (reads data), 
      
      GET one program data by ID from database (reads data), 
      
      POST one program data into database (creates data), 
      
      PUT on program data by ID from database (edits data), 
      
      DELETE one data by ID from database (deletes data).
      

How to programmatically REQUEST data from the microservice: 

  Formatting for a request all: 
  
      await fetch('/name_of_import') 
      
                  // name_of_import is the controller's imported name for the model being accessed
      
  Formatting for a request one data entry by ID: 
  
      await fetch(`/name_of_import/${id}`) name_of_import is the controller's imported name for the model being accessed, a slash, and the id of the entry
          
                 // you may need to refer to the object property to get the id, so if people was the object, (`/name_of_import/${people.id}`)
              
  Examples of requests from connected programs to microservices for GET all: 
                
    const response = await fetch('/badge_service');    
    
                // this is the calorie tracker application's call for calorie entries
                
  Examples of requests from connected programs to microservices for GET one:
    
    const response = await fetch(`/badge_service/${badgeId}`);           
    
                // this is the calorie-tracker application's call

    
How to programmatically RECEIVE data from the microservice: 

  Formatting for receiving the data:
  
      const data = await response.json();     
      
                  // used for GET operation shown above. PUT, POST, and DELETE just use response.status to track status of the operation.
                                              
                  // data will be an array of objects that meet the GET all request or a singular object that was requested by ID from a GET one request.
      
                                             
  Examples of receiving data from the microservice for all GET options:
  
    const badges = await response.json();                
    
                // this is what the calorie tracker application uses to read a GET of calorie entries

                
UML sequence diagram:


<img width="755" height="435" alt="image" src="https://github.com/user-attachments/assets/d068bd73-58c7-42fb-a9b4-0f7d4b59b6d1" />
