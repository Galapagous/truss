import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Homepage from "./page/home/Homepage";
import Product from "./page/product";
import Listing from "./page/listing";
import AddProduct from "./page/listing/new";
import Order from "./page/order";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/product/:productId",
        element: <Product />,
      },
      {
        path: "/listing",
        element: <Listing />,
      },
      {
        path: "/add-listing",
        element: <AddProduct />,
      },
      {
        path: "/order",
        element: <Order />,
      },
    ],
  },
]);

export default routes;
