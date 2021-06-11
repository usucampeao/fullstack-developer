import { Menu } from './menu.model';

export const horizontalMenuItems = [ 
    new Menu (1, 'NAV.HOME', '/', null, null, false, 0),
    new Menu (44, 'REGISTER', '/register', null, null, false, 40), 
    new Menu (50, '404 Page', '/404', null, null, false, 40),  
    new Menu (70, 'NAV.ABOUT_US', '/about', null, null, false, 0),   
    new Menu (43, 'LOGIN', '/login', null, null, false, 0), 

]
