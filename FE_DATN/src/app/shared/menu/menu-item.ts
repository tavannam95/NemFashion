interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const MenuItem: RouteInfo[] = [
    {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
    {path: '/user-profile', title: 'User Profile', icon: 'person', class: ''},
    {path: '/table-list', title: 'Table List', icon: 'content_paste', class: ''},
    {path: '/typography', title: 'Typography', icon: 'library_books', class: ''},
    {path: '/icons', title: 'Icons', icon: 'bubble_chart', class: ''},
    {path: '/notifications', title: 'Notifications', icon: 'notifications', class: ''},
    {path: '/customer', title: 'Customer', icon: 'persons', class: ''},
]
