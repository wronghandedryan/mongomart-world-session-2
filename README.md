# Create Highly Interactive Apps Using Stitch Triggers
*Author*: [Robbert Kauffman](mailto:robbert.kauffman@mongodb.com)

## Introduction

Respond to database changes & events in real-time using Stitch Rules. Allowing you to create 
highly interactive applications and easily integrate MongoDB with other systems.

## Step 1 — Creating a Stitch App

In [Atlas](https://cloud.mongodb.com):
1. Navigate to *Stitch* using the left hand navigation
2. Click *Create New Application*
![Stitch Application](images/step1a.png "Atlas interface — Stitch")
3. In the dialog window, name the app, select one of your Atlas clusters to link it, and hit 
*Create*.
![Stitch Application](images/step1b.png "Atlas interface — Create Stitch App")

## Step 2 — Setting up Stitch App

- Open your app by selecting it from the Stitch Applications list if it doesn’t automatically 
  open after a few minutes
- On the Getting Started screen: Turn on Anonymous Authentication 
![Stitch Application](images/step2a.png "Stitch — Anonymous Authentication toggle")
- Copy your Stitch App ID in top-left corner
![Stitch Application](images/step2b.png "Stitch — Stitch App ID")

## Step 3 — Setting up MongoMart front-end

- Go to <https://stackblitz.com/edit/mongomart-world-session-2/>
  - StackBlitz is an online IDE and app server for easily editing code and running apps online

## StackBlitz

![Stitch Application](images/stackblitz.png "StackBlitz interface")

## Step 4 — Setting up MongoMart front-end

- Edit *config.js*: change value of Stitch App ID on line 2 to your Stitch App ID
  - Change value of *authToken* on line 6 with auth token from table down below
  - Change value of *userId* on line 7 with your first name
- Reload Live App (on the right) if you get following error: default app can only be set once; currently set to 'XXX’
- Your screen should look like this:
![Stitch Application](images/step4b.png "MongoMart — Stitch Rules errors")

| User ID | Auth Token |
| ------- | ---------- |
| robbert | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rpb24iOiIqIiwiZmVlZF9pZCI6Im5vdGlmaWNhdGlvbnJvYmJlcnQiLCJyZXNvdXJjZSI6ImZlZWQifQ.t-QyCjMWZmctow6UQrUipwEdcYWhN2358Pwt_ZqTO0A |

## Step 5 — Importing Data

- Go to your Stitch app
- Go to *Rules*
- Create a new rule by clicking the *Add Collection* button
![Stitch Application](images/step5a.png "Stitch — Add Database/Collection")
  - Enter `mongomart` as database name, and press return or click *Create*
  - Enter `item` as collection name, and press return or click *Create*
  ![Stitch Application](images/step5b.png "Stitch — Create collection")
  - Select *No template* as template
  - Click the green *Add collection* button at the bottom
  - Check the *Read and Write* checkboxes
  ![Stitch Application](images/step5c.png "Stitch — Enable read & write permissions")
  - Don’t forget to click the *Save* button on the top right
- Go back to the Live App and reload
  - Click the *Import Items* link in the footer
  - Reload
  - Products should now be visible!
  ![Stitch Application](images/step5d.png "MongoMart — Products visible")

# Step 6 - Add rule for Cart

- Go back to *Rules* in your Stitch App
- Create a new rule by clicking on … and *Add Database/Collection*
![Stitch Application](images/step6.png "MongoMart — Add Database/Collection")
  - Enter `mongomart` as database name
  - Enter `users` as collection name, and press return or click *Create*
  - Select *Users can only read and write their own data* as template
  - Enter `_id` for field name for User ID
  - Click the green *Add collection* button at the bottom

# Exercise 1 — Adding a trigger

- Go to Stitch, go to *Triggers*, and click the *Add New Trigger* button
![Stitch Application](images/exercise1a.png "Stitch — Add New Trigger")
- Optional: name the trigger
- Select your linked Atlas cluster from the *Select Linked Cluster* dropdown
- Select *mongomart* from the *Database Name* dropdown
- Select *item* from the *Collection Name* dropdown
![Stitch Application](images/exercise1b.png "Stitch — Add New Trigger")
- Check the *Update* checkbox under *Operation Type*
- Toggle *Full Document* on
- Select a New Function from the Function dropdown:
  - Optional: name the function
  - Select all sample code and replace with code from *stitch/sendNotification.js* in StackBlitz
  - Replace *userId* and *authToken* on line 2 and 3 with your *userId* and *authToken* from step 4
![Stitch Application](images/exercise1c.png "Stitch — Function Editor")
- Click the *Save* button
- Go to your Live App in StackBlitz
- On the homepage, click on the *Coffee Mug* product:
- Click on the *Update Stock* button on the bottom
- After a slight delay you should see a notification that’s added on the top right:
![Stitch Application](images/exercise1d.png "Stitch — Notifications")
  - Hover over the notifications icon and select the product from the notifications list to add it to cart
  - Navigate to the *Cart* to double check if the product has been added
