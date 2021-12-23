# Coder's Block (Blogging Site)
#### by Kenny Nguyen

## Project Summary

This web application is a place for users to create and store blogs that they write. 

The tools I will be using are: 
1. Ruby on Rails
2. ReactJS
3. Postgres SQL

## Wireframes
### Site Layout Wireframes
![alt text](https://i.imgur.com/StuXO59.png)
### Final 
![alt text](https://i.imgur.com/e56lT5e.png)

## Models

List here any models in your app and their properties 
Models I will have in my app are:

#### Blogs
The Blogs table contains its a title, its own ID, and a user_id. 

#### Paragraphs & Images 
The paragraphs and images tables contain a heading, content, subtext, order, and a blog_id. The blog id representing the blog they are attached to.

#### User Profile
In the user profile model, there is the place for their username, password.

## Route Table

#### Blog Routes
| url | method | action |
|-----|--------|--------|
| /api/v1/blogs | get | Shows all blogs |
| /api/v1/blogs | post | Creates new blog |
| /api/v1/blogs/:id | get | Shows single blog details |
| /api/v1/blogs/:id | put | Updates single blog details |
| /api/v1/blogs/:id | delete | Deletes blog |

#### Paragraph Routes
| url | method | action |
|-----|--------|--------|
| /api/v1/paragraphs | get | Shows all paragraphs |
| /api/v1/paragraphs | post | Creates new paragraph |
| /api/v1/paragraphs/:id | get | Shows single paragraph details |
| /api/v1/paragraphs/:id | put | Updates single paragraph details |
| /api/v1/paragraphs/:id | delete | Deletes paragraph |

#### Image Routes
| url | method | action |
|-----|--------|--------|
| /api/v1/images | get | Shows all image |
| /api/v1/images | post | Creates new image |
| /api/v1/images/:id | get | Shows single image details |
| /api/v1/images/:id | put | Updates single image details |
| /api/v1/images/:id | delete | Deletes image |


#### User Routes
| url | method | action |
|-----|--------|--------|
| /signup | post | creates user |
| /login | post | checks if user exists and logs in |




## User Stories

-  I should be able to click signup and create an account.

- I should be able to login with an account I've created.

- I should be able to click create and begin making a new blog.

- I should be able to choose the order of my blog contents.

- I should be able to save and publish my blog.

- I should see my blog on the home page. 

- I should be able to click on my blog and view its details.

- I should be able to edit my blog.

- I should be able to delete my blog.

- I should be able to delete or edit specific contents of my blog.

## Challenges 

- Figuring out has_many and has_one to Ruby on Rails was slighty different than that of Masonite. I had to frequently remake or change migrations to make sure that the items had the right attributes on each of their tables. For example, I needed to make sure that the paragraphs and images would cascade on the deletion of a blog. 

- Making API out of Ruby on Rails. Ruby on Rails often isn't used to create API's for other frontend frameworks because it has views for itself. What I had to do was serialize each of the tables that I needed in the front end and have them show up under each blog. 

- Accessing information was difficult because any items that were connected to a blog would not show up in the same object as the blog. It would be in a separate "included" array that I'd need to additionally map over in the frontend. This made passing information around quite difficult in the frontend. 



