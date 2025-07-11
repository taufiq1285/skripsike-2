/**
 * Dosen Dashboard - AKBID Lab System
 * Security: Dosen role required, data scope controls
 * Status: Template ready
 */
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';

export const DosenDashboard = () => {
  return (
    <DashboardLayout userRole="dosen">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Dosen</h1>
          <p className="text-gray-600">Kelola mata kuliah dan praktikum</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">í³š</div>
              <div>
                <p className="text-sm text-gray-600">Mata Kuliah Saya</p>
                <p className="text-2xl font-bold">---</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">í±¥</div>
              <div>
                <p className="text-sm text-gray-600">Total Mahasiswa</p>
                <p className="text-2xl font-bold">---</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">í³„</div>
              <div>
                <p className="text-sm text-gray-600">Laporan Pending</p>
                <p className="text-2xl font-bold">---</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-dosen-50 border border-dosen-200 rounded-lg p-4">
          <p className="text-dosen-800">
            íº§ Dosen Dashboard features need implementation
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};
