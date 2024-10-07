# Stock Management

This is the stock management project, which is the assignment as the part of the recruitment process. 


## Prerequisites

- MongoDB installed, up and running.
- `npm` or `nx` installed.
- Node.js version 20.18.0


## First time project setup

After cloning this project, please make sure you have installed `npm` on your machine and all the prerequisites. This documentation will not cover instruction to install MongoDB, `npm`, and Node.js.

Also, please make sure you have the correct MongoDB connection string, as well as the `nx` that has been installed on your machine by using this command:

```sh
npm install -g  nx
```

### Setup steps
1. Use command prompt or your preferred terminal to navigate to the path where you clone this repository.
2. go to the `/apps/stock-api` directory from the root and copy/rename file `.env.sample` to `.env` within the `stock-api` directory.
3. Replace `MONGODB_CONNECTION_URI` with your MongoDB connection string that installed on your machine.

Optional: if you have your own API key from [financialmodelingprep.com](https://site.financialmodelingprep.com/ "Financial data for every need"), you can use it by navigating to `/apps/stock-frontend` from the root and modify `VITE_STOCK_API_KEY` inside `.env` file to your preferred API key.

Please feel free to use the provided API key. However, it is a API key from a free subscription plan, which limits to 250 calls/day and can retrieve the stock quote information for the stock in the US market only.

If you reach the API limits, please register on the free subscription plan and set your API key on the corresponding file as described above.

4. Navigate to the root and run this command below to install all required components.

```sh
npm install --force
```


## Run the project

You need 2 terminals to run the project. Go to the root on both terminals.

1. First terminal run this command below to demonstrate the API.

```sh
nx serve stock-api
```

2. Second terminal run this command below to demonstrate the UI.

```sh
nx serve stock-frontend
```

3. Open your preferred web browser (Chrome is recommended) and visit this site `http://localhost:4200` to start using the application.



## Run unit test

To run the unit test, please use your preferred terminal and navigate to the root of the project, then run this command

```sh
nx test stock-api
```


## Features

- Search the stock by its symbol, and click to add it to the portfolio.
- You can view each stock on your portfolio, as well as delete it.
- Everytime you access the portfolio page, it will refresh the latest stock quote on all your stocks within your portfolio. If there are changes on the price and volume, it will record to the database.