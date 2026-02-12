// App.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { mainRoutes, notFoundRoute, privateRoutes, publicRoutes } from './routes/routes';

export default function App() {

  return (
    <>
      <Routes>
        {/* Головна сторінка */}
        {mainRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<MainLayout>{element}</MainLayout>}
          />
        ))}


        {/* Публічні роути - доступні всім */}
        {publicRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<MainLayout>{element}</MainLayout>}
          />
        ))}

        {/* Приватні роути - тільки для залогінених */}
        {privateRoutes.map(({ path, element}) => (
            <Route
              key={path}
              path={path}
              element={<MainLayout>{element}</MainLayout>}
            >
            
            </Route>
        ))}

        {/* 404 сторінка - має бути в кінці */}
        <Route
          path={notFoundRoute.path}
          element={notFoundRoute.element}
        />
      </Routes>
    </>
  );
}