import React, { useState } from 'react';
import { Users, Mail, Settings, Activity, ArrowLeft,Plus, Search, Filter, Upload, Download, Play, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import * as XLSX from 'xlsx';
//import { saveAs } from 'file-saver';
import DLProfileMapper from "./components/DLProfileMapper";
const mockDistributionLists = [
  { id: 1, name: 'North-Engineering-Developers', email: 'north-eng-dev@company.com', members: 45, region: 'North', department: 'Engineering', jobProfile: 'Developer', admins: ['admin1@company.com'], lastSync: '2 hours ago' },
  { id: 2, name: 'North-Engineering-Managers', email: 'north-eng-mgr@company.com', members: 8, region: 'North', department: 'Engineering', jobProfile: 'Manager', admins: ['admin1@company.com'], lastSync: '1 hour ago' },
  { id: 3, name: 'South-Engineering-Developers', email: 'south-eng-dev@company.com', members: 32, region: 'South', department: 'Engineering', jobProfile: 'Developer', admins: ['admin2@company.com'], lastSync: '30 mins ago' },
  { id: 4, name: 'North-Sales-Representatives', email: 'north-sales-rep@company.com', members: 28, region: 'North', department: 'Sales', jobProfile: 'Sales Rep', admins: ['admin3@company.com'], lastSync: '3 hours ago' },
  { id: 5, name: 'East-Marketing-Specialists', email: 'east-mkt-spec@company.com', members: 15, region: 'East', department: 'Marketing', jobProfile: 'Specialist', admins: ['admin1@company.com'], lastSync: '1 hour ago' },
  { id: 6, name: 'West-HR-Coordinators', email: 'west-hr-coord@company.com', members: 12, region: 'West', department: 'HR', jobProfile: 'Coordinator', admins: ['admin4@company.com'], lastSync: '2 hours ago' },
];

const mockDistributionLists1 = [
  { DLName: "Hospice-North", JobProfile: "Nurse", SHSETTING: "HOS_001", OwnerEmail: "alice@company.com" },
  { DLName: "Hospice-South", JobProfile: "Doctor", SHSETTING: "HOS_002", OwnerEmail: "bob@company.com" },
];

const mockAutomationRules = [
  { id: 1, name: 'Auto-add Engineering', type: 'Department', condition: 'Department = Engineering', target: 'Engineering DL', enabled: true, lastRun: '2 hours ago' },
  { id: 2, name: 'New Hire Onboarding', type: 'New User', condition: 'User Created', target: 'All Company DL', enabled: true, lastRun: '1 day ago' },
  { id: 3, name: 'Manager Group Sync', type: 'Job Title', condition: 'Title contains Manager', target: 'Managers DL', enabled: false, lastRun: '3 days ago' },
];

const mockRecentActivity = [
  { id: 1, action: 'Added 3 users to Engineering DL', user: 'admin@company.com', time: '5 mins ago', status: 'success' },
  { id: 2, action: 'Automated sync completed', user: 'System', time: '30 mins ago', status: 'success' },
  { id: 3, action: 'Removed user from Marketing DL', user: 'admin@company.com', time: '1 hour ago', status: 'success' },
  { id: 4, action: 'Created new DL: Product Team', user: 'admin@company.com', time: '2 hours ago', status: 'success' },
];

const mockErrors = [
  { id: 1, action: 'Failed to add user to Engineering DL', user: 'admin@company.com', time: '5 mins ago', status: 'Error' },
  { id: 2, action: 'DL sync failed', user: 'System', time: '15 mins ago', status: 'Error' },
  { id: 3, action: 'Failed to remove user from Marketing DL', user: 'admin@company.com', time: '30 mins ago', status: 'Error' },
  { id: 4, action: 'Unable to create new DL: Product Team', user: 'admin@company.com', time: '1 hour ago', status: 'Error' },
  { id: 5, action: 'Permission denied for modifying HR DL', user: 'Bob@company.com', time: '2 hours ago', status: 'Error' },
  { id: 6, action: 'Automated sync partially failed', user: 'System', time: '3 hours ago', status: 'Error' },
];



// Analytics data for charts
const dlCreationByYear = [
  { year: '2020', count: 45 },
  { year: '2021', count: 68 },
  { year: '2022', count: 82 },
  { year: '2023', count: 103 },
  { year: '2024', count: 127 },
  { year: '2025', count: 35 },
];

const dlCreationByMonth = [
  { month: 'Jan', count: 18 },
  { month: 'Feb', count: 22 },
  { month: 'Mar', count: 25 },
  { month: 'Apr', count: 20 },
  { month: 'May', count: 28 },
  { month: 'Jun', count: 24 },
  { month: 'Jul', count: 30 },
  { month: 'Aug', count: 26 },
  { month: 'Sep', count: 32 },
  { month: 'Oct', count: 15 },
];

const dlByDepartment = [
  { name: 'Engineering', value: 85, color: '#3B82F6' },
  { name: 'Sales', value: 62, color: '#10B981' },
  { name: 'Marketing', value: 48, color: '#F59E0B' },
  { name: 'HR', value: 28, color: '#8B5CF6' },
  { name: 'Finance', value: 27, color: '#EF4444' },
];

const dlByRegion = [
  { region: 'North', count: 75 },
  { region: 'South', count: 68 },
  { region: 'East', count: 55 },
  { region: 'West', count: 52 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDL, setSelectedDL] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const filteredDLs = mockDistributionLists.filter(dl =>
    dl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dl.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
const [activeActivityTab, setActiveActivityTab] = useState('activity');
const dataToShow = activeActivityTab === 'activity' ? mockRecentActivity : mockErrors;
  const [showMapper, setShowMapper] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  //const [uploadedFile, setUploadedFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [showMappingScreen, setShowMappingScreen] = useState(false);
  const [excelHeaders, setExcelHeaders] = useState([]);
  const [mapping, setMapping] = useState({
  name: "",
  email: "",
  department: "",
  jobProfile: "",
  admins: "",
  lastSync: "",
});
  

  const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  //setUploadedFile(file);

  const reader = new FileReader();
  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet);
    setExcelData(json);
    
    // Extract headers from the first row
    if (json.length > 0) {
      setExcelHeaders(Object.keys(json[0]));
    }
  };
  reader.readAsArrayBuffer(file);
};

const handleExportClick = () => {
  const ws = XLSX.utils.json_to_sheet(mockDistributionLists1);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'DistributionLists');
  XLSX.writeFile(wb, 'DistributionLists.xlsx');
};

  const handleImportClick = () => {
  setShowImportModal(true);
};
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Distribution List Automation</h1>
                <p className="text-sm text-gray-500">Manage 250+ department distribution lists</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Run Sync Now</span>
              </button>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">AD</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="px-6 flex space-x-8 border-t border-gray-200">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Activity },
            { id: 'lists', label: 'Distribution Lists', icon: Mail },
            { id: 'automation', label: 'Automation Rules', icon: Settings },
            { id: 'users', label: 'Users', icon: Users },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total DLs</p>
                    <p className="text-3xl font-bold text-gray-900">250</p>
                  </div>
                  <Mail className="w-10 h-10 text-blue-600 opacity-20" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">1,245</p>
                  </div>
                  <Users className="w-10 h-10 text-green-600 opacity-20" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Rules</p>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                  </div>
                  <Settings className="w-10 h-10 text-purple-600 opacity-20" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Last Sync</p>
                    <p className="text-3xl font-bold text-gray-900">2h</p>
                  </div>
                  <Clock className="w-10 h-10 text-orange-600 opacity-20" />
                </div>
              </div>
            </div>
            {/* Dashboard Charts Section */}
<div className="grid grid-cols-2 gap-6">
  {/* DL Creation by Year (Line Chart) */}
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <h3 className="text-md font-semibold text-gray-900 mb-4">DL Creation by Year</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={dlCreationByYear}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* DL Creation by Month (Bar Chart) */}
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <h3 className="text-md font-semibold text-gray-900 mb-4">DL Creation by Month</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={dlCreationByMonth}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#10B981" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* DLs by Department (Pie Chart) */}
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <h3 className="text-md font-semibold text-gray-900 mb-4">DLs by Department</h3>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={dlByDepartment}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {dlByDepartment.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* DLs by Region (Bar Chart) */}
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <h3 className="text-md font-semibold text-gray-900 mb-4">DLs by Region</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={dlByRegion}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="region" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#F59E0B" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
            <div className="bg-white rounded-lg border border-gray-200 w-full w-full">
      {/* Buttons */}
      <div className="flex border-b border-gray-200">
        <button
  className={`flex-1 px-4 py-2 text-sm font-medium ${
    activeActivityTab === 'activity'
      ? 'bg-gray-100 text-gray-900'
      : 'text-gray-500 hover:bg-gray-50'
  }`}
  onClick={() => setActiveActivityTab('activity')}
>
  Recent Activity
</button>

<button
  className={`flex-1 px-4 py-2 text-sm font-medium ${
    activeActivityTab === 'errors'
      ? 'bg-gray-100 text-gray-900'
      : 'text-gray-500 hover:bg-gray-50'
  }`}
  onClick={() => setActiveActivityTab('errors')}
>
  Errors
</button>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-200">
        {dataToShow.map((item) => (
          <div key={item.id} className="px-6 py-4 hover:bg-gray-50 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{item.action}</p>
              <p className="text-xs text-gray-500 mt-1">
                By {item.user} • {item.time}
              </p>
            </div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded ${
                item.status === 'Success'
                  ? 'text-green-700 bg-green-100'
                  : item.status === 'Error'
                  ? 'text-red-700 bg-red-100'
                  : 'text-green-700 bg-green-100'
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lists' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search distribution lists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleImportClick}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                </button>

                <button
                  onClick={handleExportClick}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>New DL</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Members</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Sync</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDLs.map(dl => (
                    <tr key={dl.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                            <Mail className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{dl.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{dl.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{dl.department}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded">
                          {dl.members} users
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{dl.lastSync}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedDL(dl)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'automation' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Automation Rules</h2>
                <p className="text-sm text-gray-500">Configure automatic distribution list management</p>
              </div>
              <button
                onClick={() => setShowRuleModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Rule</span>
              </button>
            </div>

            <div className="grid gap-4">
              {mockAutomationRules.map(rule => (
                <div key={rule.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          rule.enabled ? 'text-green-700 bg-green-100' : 'text-gray-700 bg-gray-100'
                        }`}>
                          {rule.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600"><span className="font-medium">Type:</span> {rule.type}</p>
                        <p className="text-sm text-gray-600"><span className="font-medium">Condition:</span> {rule.condition}</p>
                        <p className="text-sm text-gray-600"><span className="font-medium">Target:</span> {rule.target}</p>
                        <p className="text-sm text-gray-500">Last run: {rule.lastRun}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">Edit</button>
                      <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded flex items-center space-x-1">
                        <Play className="w-4 h-4" />
                        <span>Run</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
            <p className="text-gray-600 mb-4">View and manage Azure AD users synced to distribution lists</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sync Users from Azure AD
            </button>
          </div>
        )}
      </main>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Distribution List</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Product Team" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., product@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Product" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows="3" placeholder="Optional description..."></textarea>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create DL</button>
            </div>
          </div>
        </div>
      )}
  {showMappingScreen && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg w-[600px] p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Map Excel Columns to DL Fields</h2>
        <button
          onClick={() => setShowMappingScreen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {Object.keys(mapping).map((field) => (
          <div key={field} className="flex justify-between items-center">
            <span className="font-medium w-1/3">{field}</span>
            <select
              className="border rounded-md px-3 py-2 w-2/3"
              value={mapping[field]}
              onChange={(e) => setMapping((prev) => ({ ...prev, [field]: e.target.value }))}
            >
              <option value="">Select column...</option>
              {excelHeaders.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Show current mappings */}
      <div className="mt-6 bg-gray-50 p-3 rounded-md text-sm">
        <h3 className="font-medium mb-2">Current Mapping:</h3>
        {Object.entries(mapping).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {value || "Not mapped"}
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6 space-x-3">
        <button
          onClick={() => {
            setShowMappingScreen(false);
            setShowImportModal(true);
          }}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 flex items-center space-x-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={() => {
            console.log("Final Mapping:", mapping);
            console.log("Excel Data:", excelData);
            alert("Mapping saved successfully! Check console for details.");
            setShowMappingScreen(false);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Confirm Mapping
        </button>
      </div>
    </div>
  </div>
)}
  {showRuleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Automation Rule</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Auto-add Sales team" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rule Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Department-based</option>
                  <option>Location-based</option>
                  <option>Job Title-based</option>
                  <option>New User</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Department = Sales" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Distribution List</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Engineering</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>HR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Daily at 2:00 AM</option>
                  <option>Every 6 hours</option>
                  <option>Weekly on Monday</option>
                  <option>Manual only</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button onClick={() => setShowRuleModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Rule</button>
            </div>
          </div>
        </div>
      )}

  {showImportModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg w-[80%] max-w-5xl p-6 relative">
      {/* Close button */}
      <button
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
        onClick={() => {
          setShowImportModal(false);
          setShowMapper(false);
          setExcelData([]);
        }}
      >
        ✕
      </button>

      {!showMapper ? (
        <>
          <h2 className="text-lg font-semibold mb-4">Upload DL Excel</h2>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="mb-4 w-full"
          />
          <button
            onClick={() => setShowMapper(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continue to Mapping
          </button>
        </>
      ) : (
        <DLProfileMapper
          excelData={excelData}
          onBack={() => setShowMapper(false)}
          onSave={(mapping) => {
            console.log("✅ Final Mapping:", mapping);
            setShowImportModal(false);
            setShowMapper(false);
          }}
        />
      )}
    </div>
  </div>
)}

      {selectedDL && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Manage {selectedDL.name}</h3>
              <button onClick={() => setSelectedDL(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add Members</label>
                  <div className="flex space-x-2">
                    <input type="text" placeholder="Search users..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Members ({selectedDL.members})</label>
                  <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 max-h-64 overflow-y-auto">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">User {i + 1}</p>
                            <p className="text-xs text-gray-500">user{i + 1}@company.com</p>
                          </div>
                        </div>
                        <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Bulk Import button clicked!');
                      setActiveSection("bulkImport");
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Bulk Import</span>
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Export button clicked!');
                      setActiveSection("export");
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Members</span>
                  </button>
                </div>

                {/* Debug indicator */}
                {activeSection && (
                  <div className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                    Active Section: {activeSection}
                  </div>
                )}

                {activeSection === "bulkImport" && (
                  <div className="mt-4 p-4 border-2 border-blue-300 bg-blue-50 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-md font-semibold text-blue-700">Bulk Import Members</h3>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Closing section');
                          setActiveSection("");
                        }}
                        className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1 hover:bg-white rounded"
                      >
                        ✕ Close
                      </button>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Upload a CSV file containing members to import into this distribution list.
                      </p>

                      <input
                        type="file"
                        accept=".csv"
                        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 bg-white"
                      />

                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Upload & Process
                      </button>
                    </div>
                  </div>
                )}

                {activeSection === "export" && (
                  <div className="mt-4 p-4 border-2 border-green-300 bg-green-50 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-md font-semibold text-green-700">Export Members</h3>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Closing section');
                          setActiveSection("");
                        }}
                        className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1 hover:bg-white rounded"
                      >
                        ✕ Close
                      </button>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                      Click the button below to download a CSV of all members in this distribution list.
                    </p>

                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Download CSV
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}