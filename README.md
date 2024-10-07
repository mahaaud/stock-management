# StockManagement

This is the stock management project, which is the assignment as the part of the recruitment process. 


## Prerequisite

- MongoDB installed.
- `npm` or `nx` installed.
- Node.js version 20.18.0


# First time project setup

After cloning this project, please make sure you have installed `npm` on your machine. This documentation will not cover how to install Node.js, MongoDB, and `npm`.

Also, please make sure you have the correct MongoDB connection string, as well as the `nx` that has been installed on your machine by using this command:

```sh
npm install -g  nx
```

Then, please navigate to the path where you clone this repository by the command prompt or your preferred terminal, and go to the `stock-api` directory from the root and copy/rename file `.env.sample` to `.env` within the directory, and replace `MONGODB_CONNECTION_URI` with your MongoDB connection string that installed on your machine.

Optionally, if you have your own API key from financialmodelingprep.com, you can use it by navigating to `stock-frontend` from the root and change `VITE_STOCK_API_KEY` inside `.env` file to your preferred API key.

Please feel free to use the provided API key. However, it is a API key from a free subscription plan, which limits to 250 calls/day and can retrieve the stock quote information for the stock in the US market only.

Last but not least, navigate to the root and run this command below to install all required components.

```sh
npm install --force
```


## Run the project

You need 2 terminals to run the project. Go to the root on both terminals.

First terminal run this command below to demonstrate the API.

```sh
nx serve stock-api
```

Second terminal run this command below to demonstrate the UI.

```sh
nx serve stock-frontend
```

Then, open your web browser (Chrome is recommended) and visit this site `http://localhost:4200` to start using the application.



## Run unit test

To run the unit test, please use your preferred terminal and navigate to the root of the project, then run this command

```sh
nx test stock-api
```


## Features

- Search the stock by its symbol, and click to add it to the portfolio.
- You can view each stock on your portfolio, as well as delete it.
- Everytime you access the portfolio page, it will refresh the latest stock quote on all your stocks within your portfolio. If there are changes on the price and volume, it will record to the database.