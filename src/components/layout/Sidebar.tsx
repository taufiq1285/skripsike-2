/**
 * Sidebar Navigation - AKBID Lab System
 * Security: Role-based menu items, route validation
 * Status: Template ready
 */
interface SidebarProps {
  userRole?: string;
}

export const Sidebar = ({ userRole }: SidebarProps) => {
  const getMenuItems = () => {
    // TODO: Implement role-based menu items
    const baseItems = [
      { label: 'Dashboard', href: '/dashboard', icon: 'í³Š' },
    ];

    switch (userRole) {
      case 'admin':
        return [...baseItems, 
          { label: 'User Management', href: '/admin/users', icon: 'í±¥' },
          { label: 'Lab Management', href: '/admin/labs', icon: 'í´¬' },
        ];
      case 'dosen':
        return [...baseItems,
          { label: 'Mata Kuliah', href: '/dosen/mata-kuliah', icon: 'í³š' },
          { label: 'Jadwal', href: '/dosen/jadwal', icon: 'í³…' },
        ];
      case 'laboran':
        return [...baseItems,
          { label: 'Inventaris', href: '/laboran/inventaris', icon: 'í³¦' },
          { label: 'Peminjaman', href: '/laboran/peminjaman', icon: 'í´„' },
        ];
      case 'mahasiswa':
        return [...baseItems,
          { label: 'Jadwal Saya', href: '/mahasiswa/jadwal', icon: 'í³…' },
          { label: 'Laporan', href: '/mahasiswa/laporan', icon: 'í³„' },
        ];
      default:
        return baseItems;
    }
  };

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-6">
        <nav className="space-y-2">
          {getMenuItems().map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};
