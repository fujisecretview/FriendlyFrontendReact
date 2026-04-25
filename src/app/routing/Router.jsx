import { useEffect, useState } from 'react';
import { BASE_URL } from '@/shared/constants';

const getCurrentPath = () => {
  const pathname = window.location.pathname;
  return pathname.startsWith(BASE_URL)
    ? pathname.slice(BASE_URL.length - 1) || '/'
    : pathname;
};

// path = полный путь URL
// route = шаблон routes из обьекта Routes в App.jsx

const matchPath = (path, routes) => {
  const pathParts = path.split('/');
  const routesPaths = routes.split('/');

  // если шаблоны не совпадают, возвращаем null
  if (pathParts.length !== routesPaths.length) return null;

  const params = {};

  for (let i = 0; i < routesPaths.length; i++) {
    if (routesPaths[i].startsWith(':')) {
      const paramName = routesPaths[i].slice(1);

      params[paramName] = pathParts[i];
    } else if (routesPaths[i] !== pathParts[i]) {
      return null;
    }
  }
  return params;
};

export const useRoute = () => {
  const [path, setPath] = useState(getCurrentPath());

  // Вешаем обработчик при событии popstate который сеттером обновляет path.

  useEffect(() => {
    const onLocationChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return path;
};

const Router = (props) => {
  const { routes } = props;
  const path = useRoute();

  for (const route in routes) {
    const params = matchPath(path, route);
    if (params) {
      const Page = routes[route];
      return <Page params={params} />;
    }
  }

  const NotFound = routes['*'];

  return <NotFound />;
};

export default Router;
