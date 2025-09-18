// import App from './App'

// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);


import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RestaurantsContextProvider } from "./context/RestaurantContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RestaurantsContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RestaurantsContextProvider>
);
