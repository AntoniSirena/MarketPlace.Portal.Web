import { INavData } from '@coreui/angular';

var currentMenuTemplate = localStorage.getItem('currentMenuTemplate');

var menu = JSON.parse(currentMenuTemplate);

export const navItems: any = menu;