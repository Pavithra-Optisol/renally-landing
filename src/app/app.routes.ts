import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './pages/home/home';

const sections = ['talk', 'mentor', 'handbook', 'faq', 'resources', 'privacy', 'terms'];
const regions = ['PT', 'CH', 'SG'];

const sectionRoutes = (prefix: string): Routes => [
  { path: prefix, pathMatch: 'full', component: Home },
  ...sections.map((section) => ({ path: prefix ? `${prefix}/${section}` : section, children: [] })),
];

// One MainLayout instance for every page so the header persists and the nav pill can animate between links.
export const routes: Routes = [
  { path: 'auth', component: AuthLayout },
  {
    path: '',
    component: MainLayout,
    children: [...sectionRoutes(''), ...regions.flatMap(sectionRoutes)],
  },
];
