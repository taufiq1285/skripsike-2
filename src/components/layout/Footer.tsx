/**
 * Footer Component - AKBID Lab System
 * Security: Safe external links, no sensitive info
 * Status: Ready
 */
export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AKBID Lab System</h3>
            <p className="text-gray-300">
              Sistem Manajemen Laboratorium AKBID untuk mendukung pembelajaran praktikum kebidanan.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/help" className="hover:text-white">Bantuan</a></li>
              <li><a href="/contact" className="hover:text-white">Kontak</a></li>
              <li><a href="/privacy" className="hover:text-white">Privasi</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <p className="text-gray-300">
              Email: support@akbid.ac.id<br/>
              Tel: (021) 1234-5678
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-300">
          <p>&copy; 2024 AKBID Lab System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
