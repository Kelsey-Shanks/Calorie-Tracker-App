# User Profile Settings Microservice

For a program to use this microservice, they must have a defined schema in a model.mjs for that program and they must have defined CRUD operations in the controller that accesses that model.

## A connected program can utilize all CRUD operations:

    POST one user's data into database (creates a user),
    
    GET one user by ID from database (reads user data),
    
    PUT one user by ID from database (edits user data),
    
    DELETE one user by ID from database (deletes user data),
    

## How to programmatically REQUEST data from the microservice:


Formatting for a request user by ID:

    await fetch(`/name_of_import/${id}`) name_of_import is the controller's imported name for the model being accessed, a slash, and the id of the entry
        
               // you may need to refer to the object property to get the id, so if people was the object, (`/name_of_import/${people.id}`)
             

Example of a request to a microservice for a GET by ID:

    const response = await fetch(`/user_profiles/${id}`);
  

## How to programmatically RECEIVE data from the microservice:

Formatting for receiving the data:

    const user_data = await response.json();     
    
                // used for GET operation shown above. PUT, POST, and DELETE just use response.status to track status of the operation.
                                            
                // data will be a singular object that was requested by ID from a GET one request.


Example of receiving data from the microservice for a GET by ID request:

    const user_data = await response.json();

## UML Diagram:

<img width="755" height="435" alt="image" src="https://github.com/user-attachments/assets/d068bd73-58c7-42fb-a9b4-0f7d4b59b6d1" />


## Credits:
I created this microservice on my own. 
