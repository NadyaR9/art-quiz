import './scss/style.scss';

import { Router } from './utils/router';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { Settings } from './pages/Settings';
import { Artists } from './pages/Artists';
import { Pictures } from './pages/Pictures';
import { Score } from './pages/Score/Score';
import { Error404 } from './pages/Error404';

const homeInstance = new Home();
const settingsSettings = new Settings();
const categoriesInstance = new Categories();
const artistsInstance = new Artists();
const picturesInstance = new Pictures();
const scoreInstance = new Score();
const error404Instance = new Error404();
const footerInstance = new Footer();

const routes = {
  '/': homeInstance,
  '/settings': settingsSettings,
  '/categories': categoriesInstance,
  '/questionsbypicture': picturesInstance,
  '/questionsbyartist': artistsInstance,
  '/score': scoreInstance,
};

export const router = async () => {
  const content = null || document.getElementById('page_container');
  const footer = null || document.getElementById('footer_container');
  footer.innerHTML = footerInstance.render();
  footerInstance.after_render();
  const request = Router.parseRequestURL();
  const parsedURL = (request.resource ? `/${request.resource}` : '/')
    + (request.id ? '/:id' : '')
    + (request.verb ? `/${request.verb}` : '');
  const page = routes[parsedURL] ? routes[parsedURL] : error404Instance;
  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
