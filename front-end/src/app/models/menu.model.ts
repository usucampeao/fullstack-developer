export interface MenuRoute {
    path: string;
    title: string;
    icon?: string;
    submenu?: MenuRoute[];
}

export const MENU_ROUTES_TOOLBAR: MenuRoute[] = [
    {
        path: 'home',
        title: 'Home',
        icon: 'home'
    },
    {
        path: '/cadastrar/imovel',
        title: 'Cadastrar',
        icon: 'table_chart',
    },    
    {
        path: '/consulta/imoveis',
        title: 'Consultar',
        icon: 'table_chart',
    }
];

export const MENU_ROUTES: MenuRoute[] = [
    {
        path: 'home',
        title: 'Home',
        icon: 'home'
    },
    {
        path: 'consulta',
        title: 'Imóveis',
        icon: 'table_chart',
        submenu: [
            {
                path: '/cadastrar/imovel',
                title: 'Cadastrar'
            },
            {
                path: '/consulta/imoveis',
                title: 'Consultar'
            }
        ]
    },
];