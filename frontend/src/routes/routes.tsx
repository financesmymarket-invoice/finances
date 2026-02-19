import Product from "../components/products/Product";
import HomePage from "../pages/HomePage";
import InvoicePage from "../pages/InvoiceaPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductsPage from "../pages/ProductsPage";




export const publicRoutes = [
    { path: "/", element: <HomePage /> },
    { path: "/invoice/:id", element: <InvoicePage /> },
    { path: "/products", element: <ProductsPage /> },
    { path: "/product/:id", element: <Product /> },
];

export const mainRoutes = [
  
]

export const privateRoutes = [

];

export const notFoundRoute = {
    path: "*",
    element: <NotFoundPage />,
};
