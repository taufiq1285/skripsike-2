/**
 * Laboran Dashboard - AKBID Lab System
 * Security: Laboran role required, inventory access controls
 * Status: Template ready
 */
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';

export const LaboranDashboard = () => {
  return (
    <DashboardLayout userRole="laboran">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Laboran</h1>
          <p className="text-gray-600">Kelola inventaris dan peminjaman alat</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">Ì≥¶</div>
              <div>
                <p className="text-sm text-gray-600">Total Inventaris</p>
                <p className="text-2xl font-bold">---</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">Ì¥Ñ</div>
              <div>
                <p className="text-sm text-gray-600">Peminjaman Aktif</p>
                <p className="text-2xl font-bold">---</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">‚ö†Ô∏è</div>
              <div>
                <p className="text-sm text-gray-600">Perlu Maintenance</p>
                <p className="text-2xl font-bold">---</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">Ì≥ä</div>
              <div>
                <p className="text-sm text-gray-600">Stock Menipis</p>
                <p className="text-2xl font-bold">---</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-laboran-50 border border-laboran-200 rounded-lg p-4">
          <p className="text-laboran-800">
            Ì∫ß Laboran Dashboard features need implementation
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};
