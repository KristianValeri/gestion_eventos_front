import './style.css'
import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { routes } from './utils/routes/routes';
import { Main } from './components/Main/Main';

const renderCurrentRoute = () => {
  const route = routes.find((r) => r.path === window.location.pathname)
  const page = route ? route.page : Home
  page()
}

Header();
Main();
renderCurrentRoute();

window.addEventListener('popstate', renderCurrentRoute);
