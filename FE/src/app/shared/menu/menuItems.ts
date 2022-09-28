interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const MenuItems: RouteInfo[] = [
    {path: '/dashboard', title: 'Đát boa', icon: 'fas fa-yin-yang', class: ''},
    {path: '/user-profile', title: 'Người dùng', icon: 'fas fa-user', class: ''},
    {path: '/table-list', title: 'Danh sách bảng', icon: 'fas fa-yin-yang', class: ''},
    {path: '/typography', title: 'Kiểu chữ', icon: 'fas fa-yin-yang', class: ''},
    {path: '/icons', title: 'Biểu tượng', icon: 'fas fa-yin-yang', class: ''},
    {path: '/notifications', title: 'Thông báo', icon: 'fas fa-yin-yang', class: ''},
    {path: '/customer', title: 'Khách hàng', icon: 'fas fa-yin-yang', class: ''},
    {path: '/order', title: 'Order nha', icon: 'fas fa-yin-yang', class: ''},
]
