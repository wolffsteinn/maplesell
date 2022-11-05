# MapleSell

## To start the app

Run `npm i` for both backend and frontend files

Note:
if you do not have `nodemon` globally installed, please install it (`npm i nodemon`) after running `npm i`

Backend Dialect: Postgres. If you are using other dialects, please amend accordingly

## Things to note:

The UI for this app would fit most laptop screen sizes. Any other screen sizes might result in your UI looking out of place.
To amend, go to the frontend CSS files and edit if you wish to.

## Interface:

Combining the idea of Carousell (a Singapore-based C2C/B2C marketplace for buying and selling new and secondhand goods) and Maplestory, MapleSell allows users to buy/sell items from any of the 9 shops available.
<br />

### Login: Auth0

<img src="https://user-images.githubusercontent.com/86793931/199423117-3bc0e3c9-18d9-4416-868e-1607e3495a9c.png" width="800" height="500">
<img src="https://user-images.githubusercontent.com/86793931/199423253-684988d1-51f1-4317-a28d-26156b046592.png" width="800" height="500">

### Homepage

![image](https://user-images.githubusercontent.com/86793931/199426423-ae898b67-6f6a-403b-9603-d1fe5470b80e.png)
Logged in username is reflected at the top left corner.
<br />
User can access the inventory or logout through clicking on "My Inventory" or "Log Out" buttons.

### Shop

![image](https://user-images.githubusercontent.com/86793931/199428177-cc42ebb9-623d-40c3-b36a-6efb84bdad3e.png)
<br />
Item description will be displayed `onMouseOver` and item will be highlighted when clicked.
<br />
Upon clicking buy, item will be shown in the user's inventory via the homepage or in any shop.
![image](https://user-images.githubusercontent.com/86793931/199429030-e09e46c4-0a30-41c8-8e07-83f36341fae8.png)

### Selling

Selling can be done after entering any shop and clicking on the "SELL ITEM" button.
![image](https://user-images.githubusercontent.com/86793931/199430395-902db974-9e2e-45db-9bb8-965518a7f245.png)
![image](https://user-images.githubusercontent.com/86793931/199430520-162fa62b-17ed-470b-91af-7b7124757ccc.png)
