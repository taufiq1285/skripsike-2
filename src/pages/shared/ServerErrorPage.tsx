/**
 * ServerErrorPage - AKBID Lab System
 * Security: Safe error handling, no sensitive info exposure
 * Status: Ready
 */
import { MainLayout } from '../../components/layout/MainLayout';
import { Button } from '../../components/ui/Button';

export const ServerErrorPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">500</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Server Error</h1>
          <p className="text-gray-600 mb-6">Terjadi kesalahan pada server. Silakan coba lagi nanti.</p>
          <Button onClick={() => window.history.back()}>
            Kembali
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};
