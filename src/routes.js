import React from 'react';



//my screens

const Project = React.lazy(() => import('./cards/Project/Project'));
const Department = React.lazy(() => import('./cards/Department/Department'));
const Module = React.lazy(() => import('./cards/Module/Module'));
const Tools = React.lazy(() => import('./cards/Tools/Tools'));
const ManageProject = React.lazy(() => import('./cards/Project/ManageProjects'));
const Users = React.lazy(() => import('./cards/Users/Users'));
const ModuleView = React.lazy(() => import('./cards/Project/ModlueView/ModuleView'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/projects', name: 'Projects', component: Project },
  { path: '/department', name: 'Department', component: Department, exact: true },
  { path: '/module', name: 'Module', component: Module, exact: true },
  { path: '/tools', name: 'Tools', component: Tools, exact: true },
  { path: '/project/:projectId', name: 'ManageProject', component: ManageProject, exact: true },
  { path: '/users', name: 'Users', component: Users, exact: true },
  {path:'/project/:projectId/:moduleId', name:'ModuleView', component:ModuleView, exact: true}
];

export default routes;
