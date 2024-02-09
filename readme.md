## API Reference

#### 
## Project Routes
http
  GET /project/searchProjects/:name


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|   Name  | Object |  Fetching the projects by name|

#### 

http
  GET /project/getProjects


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| projectId      | string | Fetching projects by id |



http
  GET /project/getAllProjects





http
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


http
  POST /project/addSkills 

| Parameter | Type     |                   
| :-------- | :------- | 
| id      | `ObjectId of the project ` |  
| skills      | [skills] |  


http
  POST /project/addUrls

| Parameter | Type     |                   
| :-------- | :------- | 
| id      | `ObjectId of the project ` |  
| Urls      | [Urls] |  

http
  POST /project/addAdmin

| Parameter | Type     |    
| :-------- | :------- | 
| projectId      | `ObjectId of the project ` |  

http
  POST /project/addStarBy

| Parameter | Type     |    
| :-------- | :------- | 
| projectId      | `ObjectId of the project ` |  


http
  POST /project/addDocs

| Parameter | Type     |    
| :-------- | :------- | 
| projectId      | `ObjectId of the project ` | 

## User Routes

http
  GET /user/searchUser/:name

| Parameter | Type     |    
| :-------- | :------- | 
| Name      | `String ` |  

http
  GET /user/userById

| Parameter | Type     |    
| :-------- | :------- | 
| id      | `ObjectId of the User ` | 

http
  POST /user/addStarBy

| Parameter | Type     |    
| :-------- | :------- | 
| userId      | `ObjectId of the user ` |  

http
  POST /user/addProfile

| Parameter | Type     |    
| :-------- | :------- | 
| skills      | `Array of String` | 
| courses     | `Array of String` | 
|Image        |        `photo` |

http
  POST /user/changeDp
| Parameter | Type     |    
| :-------- | :------- | 
| Image      | `photo` | 

http
  POST /user/addSkills
| Parameter | Type     |    
| :-------- | :------- | 
| skills      | `Array of String` | 

http
  POST /user/addProject
| Parameter | Type     |    
| :-------- | :------- | 
| projectId | `ObjectId of the project ` | 

http
  POST /user/addCourses
| Parameter | Type     |    
| :-------- | :------- | 
| courseId | `ObjectId of the course ` | 

## courseReview Routes

http
  GET /courseReview/searchCourse/:name
| Parameter | Type     |    
| :-------- | :------- | 
| Name      | `String` | 

http
  GET /courseReview/getCourse
| Parameter | Type     |    
| :-------- | :------- | 
| id      | `ObjectId of the courseReviewModel` | 

http
  GET /courseReview/getAllCourses

http
  POST /courseReview/create
| Parameter | Type     |    
| :-------- | :------- | 
| courseCode      | `String` | 
| courseName      | `String` | 
| professor      | `String` | 
| description      | `String` | 
| rating      | `Number` | 


http
  POST /courseReview/addComments
| Parameter | Type     |    
| :-------- | :------- | 
|Id| `id of the course Model` | 
| comment      | `String` | 

## Synergy Routes
http
  GET /synergy/searchSynergy/:name
| Parameter | Type     |    
| :-------- | :------- | 
| Name      | `String` | 

http
  GET /synergy/getById
| Parameter | Type     |    
| :-------- | :------- | 
| Id : `synergy id` | 

http
  GET /synergy/getAllSynergy

http
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
 