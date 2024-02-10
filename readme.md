

# Campus Collaborate

A brief description of what this project does and who it's for

## 1.Fork this repository
OR

On GitHub.com navigate to the https://github.com/MjStar24/BackendCampusCollaborate.git

In the top-right corner of the page ,Click FORK.

## 2. Clone the forked repository

On GitHub.com , navigate to your fork of the repository.

Above the list of files click <>Code .Copy the url mentioned . Go to the location where you want the cloned directory.

In the terminal Type - git clone , and then paste URL you copied earlier . It will look like this , with your GitHub username instead of YOUR-USERNAME:

git clone https://github.com/YOUR-USERNAME/BackendCampusCollaborate.git

Press Enter. Your local clone will be created.

## Steps to Set up Backend

* Move to backend folder - cd backend
* Install the required nodes modules package - npm i
* Create a.env file as follows with the required APIs- MongoDB,Cloudinary, OpenAI

CLIENT_ID =
CLIENT_SECRET =
TENENT ID =
ACCESS_TOKEN_SECRET =
DB_URL =
PORT =
IMAGEKIT_PUBLIC_KEY =
IMAGEKIT_PRIVATE_KEY =
IMAGEKIT_URL_ENDPOINT =
CLOUD_NAME =
API_KEY =
API_SECRET =
DISCOVERY_URL=
GOOGLE_API_KEY=

## Steps to run App

* Move to app folder - cd app
* Run flutter pub get to get the dependencies
* Run flutter run



## API Reference

#### 

## Auth Routes

GET /auth/getCred

Outlook login handler



## Project Routes

  GET /project/searchProjects/:name


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|   Name  | Object |  Fetching the projects by name|




  GET /project/getProjects


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| projectId      | string | Fetching projects by id |



  GET /project/getAllProjects






  POST /project/create


| Parameter | Type     |                   
| :-------- | :------- | 
| projectName      | string |  
| Description      | string |  
| skills      | string |  
| isActive      | boolean |  
| urls      | string |  
| owner      | string |  
| duration      | string |  
| thumbnail      | string |  
| admin      | object |  



  POST /project/addSkills 

| Parameter | Type     |                   
| :-------- | :------- | 
| id      | `ObjectId of the project ` |  
| skills      | [skills] |  



  POST /project/addUrls

| Parameter | Type     |                   
| :-------- | :------- | 
| id      | `ObjectId of the project ` |  
| Urls      | [Urls] |  


  POST /project/addAdmin

| Parameter | Type     |    
| :-------- | :------- | 
| projectId      | `ObjectId of the project ` |  


  POST /project/addStarBy

| Parameter | Type     |    
| :-------- | :------- | 
| projectId      | `ObjectId of the project ` |  



  POST /project/addDocs

| Parameter | Type     |    
| :-------- | :------- | 
| projectId      | `ObjectId of the project ` | 


  POST /project/addThumbnail

| Parameter | Type     |    
| :-------- | :------- | 
| projectId      | `ObjectId of the project ` | 


## User Routes


  GET /user/searchUser/:name

| Parameter | Type     |    
| :-------- | :------- | 
| Name      | `String ` |  


  GET /user/userById

| Parameter | Type     |    
| :-------- | :------- | 
| id      | `ObjectId of the User ` | 


  POST /user/addStarBy

| Parameter | Type     |    
| :-------- | :------- | 
| userId      | `ObjectId of the user ` |  


  POST /user/addProfile

| Parameter | Type     |    
| :-------- | :------- | 
| skills      | `Array of String` | 
| courses     | `Array of String` | 
|Image        |        `photo` |


  POST /user/changeDp
| Parameter | Type     |    
| :-------- | :------- | 
| Image      | `photo` | 


  POST /user/addSkills
| Parameter | Type     |    
| :-------- | :------- | 
| skills      | `Array of String` | 


  POST /user/addProject
| Parameter | Type     |    
| :-------- | :------- | 
| projectId | `ObjectId of the project ` | 


  POST /user/addCourses
| Parameter | Type     |    
| :-------- | :------- | 
| courseId | `ObjectId of the course ` | 

## courseReview Routes


  GET /courseReview/searchCourse/:name
| Parameter | Type     |    
| :-------- | :------- | 
| Name      | `String` | 


  GET /courseReview/getCourse
| Parameter | Type     |    
| :-------- | :------- | 
| id      | `ObjectId of the courseReviewModel` | 


  GET /courseReview/getAllCourses


  POST /courseReview/create
| Parameter | Type     |    
| :-------- | :------- | 
| courseCode      | `String` | 
| courseName      | `String` | 
| professor      | `String` | 
| description      | `String` | 
| rating      | `Number` | 



  POST /courseReview/addComments
| Parameter | Type     |    
| :-------- | :------- | 
|Id| `id of the course Model` | 
| comment      | `String` | 

## Synergy Routes

  GET /synergy/searchSynergy/:name
| Parameter | Type     |    
| :-------- | :------- | 
| Name      | `String` | 


  GET /synergy/getById
| Parameter | Type     |    
| :-------- | :------- | 
| Id : `synergy id` | 


  GET /synergy/getAllSynergy


  POST /synergy/create
| Parameter | Type     |    
| :-------- | :------- | 
| title |` string` | 
| description | `string`| 
| images | `upload all the images max(5)` | 
| domains|`Array of Domains as String` | 

  POST /synergy/addComments

| Parameter | Type     |    
| :-------- | :------- | 
| id | `synergy Id`|
|comment|`string` | 

  POST /synergy/addDomains

| Parameter | Type     |    
| :-------- | :------- | 
| id | `synergy Id`|
|Domains|`Array of Domains` | 

  POST /synergy/addImages

| Parameter | Type     |    
| :-------- | :------- | 
| id | `synergy Id`|
|Images|`Array of Images` | 






