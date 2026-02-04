import HomePage from "../pages/HomePage";
import InvoicePage from "../pages/InvoiceaPage";
import NotFoundPage from "../pages/NotFoundPage";




export const publicRoutes = [
    { path: "/", element: <HomePage /> },
    { path: "/invoice/:id", element: <InvoicePage /> },


];

export const mainRoutes = [
  
]

export const privateRoutes = [

];

export const notFoundRoute = {
    path: "*",
    element: <NotFoundPage />,
};
