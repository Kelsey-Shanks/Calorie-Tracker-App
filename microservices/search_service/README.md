# Search Microservice README

## How to REQUEST data from the search microservice: 

    Send a fetch request to '/search_service' with the query parameters type (which program structure it expects) and search (the string to find in the array) as well as send an array of JSON objects in the body for the program to search through. 

## Formatting to send a request to the search microservice from a program:

    const response = await fetch (

        `/search_service?type=${type}&search=${search}`, {
    
        method: 'POST',
    
        headers: { 'Content-Type': 'application/json'},
    
        body: JSON.stringify(array_to_send);

                      // array_to_send is the array being sent to the service

                     // replace type in {} with "music" if Playlist App or "meal" or "exercise" if Calorie Tracker App

                     // use search in {} to indicate inputted search criteria (make lowercase to make it case-insensitive)

## How to RECEIVE data from the search microservice:

    Use response.json() to get the result of the search using the microservice.

  Formatting of receiving data from the microservice:
  
      const matches_found = await response.json();
  
              // contains the results of the microservices' search

      response.status;
  
              // tells if the search was successful

## UML sequence diagram:


<img width="781" height="488" alt="UML_Search_Service" src="https://github.com/user-attachments/assets/0a1bd705-6e1a-4767-bba4-aa706779f391" />

I created this service with GitHub User nicpiccodes.
Her profile is linked here: https://github.com/nicpiccodes 
Our shared repository is linked here: https://github.com/nicpiccodes/Search-Service-CS361 
