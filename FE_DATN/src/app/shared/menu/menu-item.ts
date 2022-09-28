interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const MenuItem: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'fas fa-bars', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'fas fa-user', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'fas fa-th-list', class: '' },
    { path: '/typography', title: 'Typography',  icon:'fab fa-typo3', class: '' },
    { path: '/icons', title: 'Icons',  icon:'fas fa-icons', class: '' },
    { path: '/maps', title: 'Maps',  icon:'fas fa-map-marker', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'fas fa-bell', class: '' },
    { path: '/product', title: 'Hàng hóa',  icon:'fas fa-box', class: '' },
]
