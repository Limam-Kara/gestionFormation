import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '/dashboard',
    title: 'Accueil',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    roles: ['ADMIN'],
    submenu: []
  },
  {
    path: '/component/Thématiques',
    title: 'Thématiques',
    icon: 'bi bi-bell',
    class: '',
    extralink: false,
    roles: ['ADMIN'],
    submenu: []
  },
  {
    path: '/component/Bénéficiaires',
    title: 'Bénéficiaires',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    roles: ['ADMIN'],
    submenu: []
  },
  {
    path: '/component/For.initiale',
    title: 'For.initiale',
    icon: 'bi bi-hdd-stack',
    class: '',
    extralink: false,
    roles: ['ADMIN'],
    submenu: []
  },
  {
    path: '/component/Affectation',
    title: 'Affectation',
    icon: 'bi bi-menu-app',
    class: '',
    extralink: false,
    roles: ['ADMIN'],
    submenu: []
  },
  {
    path: '/component/Fiche.présence',
    title: 'Fiche présence',
    icon: 'bi bi-dice-1',
    class: '',
    extralink: false,
    roles: ['ADMIN'],
    submenu: []
  },
  {
    path: '/component/Evaluation',
    title: 'Evaluation',
    icon: 'bi bi-pause-btn',
    class: '',
    extralink: false,
    roles: ['ADMIN'],
    submenu: []
  },
  {
    path: '/component/Evaluation.For',
    title: 'Evaluation For ',
    icon: 'bi bi-pause-btn',
    class: '',
    extralink: false,
    roles: ['ADMIN', 'USER'],
    submenu: []
  },{
    path: '/component/Evaluation.user',
    title: 'Evaluation pers',
    icon: 'bi bi-pause-btn',
    class: '',
    extralink: false,
    roles: ['ADMIN', 'USER'],
    submenu: []
  },
  {
    path: '/component/Bilan',
    title: 'Bilan',
    icon: 'bi bi-layout-split',
    class: '',
    extralink: false,
    roles: ['ADMIN'],
    submenu: []
  },
];
