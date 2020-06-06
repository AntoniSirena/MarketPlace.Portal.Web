import { INavData } from '@coreui/angular';

var roleParent = JSON.parse(localStorage.getItem('roleParent'));
var currentMenuTemplate = localStorage.getItem('currentMenuTemplate');

var menu = JSON.parse(currentMenuTemplate);
console.log(menu);

export const navItems: any = menu;