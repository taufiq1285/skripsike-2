/**
 * Admin Dashboard - AKBID Lab System
 * Security: Admin role required, data access controls
 * Status: Template ready
 */
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';

export const AdminDashboard = () => {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Kelola sistem laboratorium AKBID</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">í±¥</div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">---</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">í´¬</div>
              <div>
                <p className="text-sm text-gray-600">Lab Rooms</p>
                <p className="text-2xl font-bold">10</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">í³š</div>
              <div>
                <p className="text-sm text-gray-600">Mata Kuliah</p>
                <p className="text-2xl font-bold">---</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">í³Š</div>
              <div>
                <p className="text-sm text-gray-600">Active Sessions</p>
                <p className="text-2xl font-bold">---</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            íº§ Admin Dashboard features need implementation:
          </p>
          <ul className="mt-2 list-disc list-inside text-yellow-700 text-sm">
            <li>User management overview</li>
            <li>System statistics</li>
            <li>Recent activities</li>
            <li>System health monitoring</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};
