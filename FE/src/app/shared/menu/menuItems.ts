interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const MenuItems: RouteInfo[] = [
    {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
    {path: '/staff', title: 'Quản lý nhân viên', icon: 'persons', class: ''},
    {path: '/customer', title: 'Customer', icon: 'persons', class: ''},
]
