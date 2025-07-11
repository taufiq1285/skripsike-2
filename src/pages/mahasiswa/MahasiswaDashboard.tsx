/**
 * Mahasiswa Dashboard - AKBID Lab System
 * Security: Mahasiswa role required, student data scope
 * Status: Template ready
 */
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';

export const MahasiswaDashboard = () => {
  return (
    <DashboardLayout userRole="mahasiswa">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Mahasiswa</h1>
          <p className="text-gray-600">Portal pembelajaran praktikum</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">í³…</div>
              <div>
                <p className="text-sm text-gray-600">Jadwal Hari Ini</p>
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

          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">í³Š</div>
              <div>
                <p className="text-sm text-gray-600">Rata-rata Nilai</p>
                <p className="text-2xl font-bold">---</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-mahasiswa-50 border border-mahasiswa-200 rounded-lg p-4">
          <p className="text-mahasiswa-800">
            íº§ Mahasiswa Dashboard features need implementation
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};
