/**
 * Home Page - AKBID Lab System
 * Security: Public access, secure information display
 * Status: Template ready
 */
import { MainLayout } from '../../components/layout/MainLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const HomePage = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-akbid-600 to-akbid-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              AKBID Lab System
            </h1>
            <p className="text-xl mb-8">
              Sistem Manajemen Laboratorium AKBID
            </p>
            <div className="space-x-4">
              <Button variant="secondary" size="lg">
                Login
              </Button>
              <Button variant="outline" size="lg">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">í´¬</div>
            <h3 className="text-xl font-semibold mb-2">9 Laboratorium</h3>
            <p className="text-gray-600">
              Fasilitas laboratorium lengkap untuk praktikum kebidanan
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">í±¥</div>
            <h3 className="text-xl font-semibold mb-2">4 Role Pengguna</h3>
            <p className="text-gray-600">
              Admin, Dosen, Laboran, dan Mahasiswa dengan akses sesuai peran
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">í³±</div>
            <h3 className="text-xl font-semibold mb-2">PWA Ready</h3>
            <p className="text-gray-600">
              Dapat diinstall sebagai aplikasi mobile
            </p>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
