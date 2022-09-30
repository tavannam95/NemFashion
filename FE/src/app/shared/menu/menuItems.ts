interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const MenuItems: RouteInfo[] = [
    {path: '/dashboard', title: 'Dashboard', icon: 'fas fa-yin-yang', class: ''},
    {path: '/staff', title: 'Quản lý nhân viên', icon: 'fa-solid fa-circle-user', class: ''},
    {path: '/customer', title: 'Customer', icon: 'fas fa-yin-yang', class: ''},
    {path: '/order', title: 'Order nha', icon: 'fas fa-yin-yang', class: ''},
]
