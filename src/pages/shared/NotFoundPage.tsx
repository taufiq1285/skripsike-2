/**
 * NotFoundPage - AKBID Lab System
 * Security: Safe error handling, no sensitive info exposure
 * Status: Ready
 */
import { MainLayout } from '../../components/layout/MainLayout';
import { Button } from '../../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">Halaman yang Anda cari tidak ditemukan.</p>
          <Button onClick={() => window.history.back()}>
            Kembali
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};
