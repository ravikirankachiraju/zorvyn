import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TREND_DATA } from '../data/mockData';

const COLORS = ['#0d9488', '#0ea5e9', '#6366f1', '#f43f5e'];

export const DashboardCharts = () => {
  const pieData = [
    { name: 'Rent', value: 4500 },
    { name: 'Food', value: 2050 },
    { name: 'Education', value: 2000 },
    { name: 'Travel', value: 500 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div className="dashboard-card p-6 h-[350px]">
        <h3 className="font-bold mb-4">Balance Flow</h3>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={TREND_DATA}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
            <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
            <Area type="monotone" dataKey="bal" stroke="#0d9488" fill="#ccfbf1" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-card p-6 h-[350px]">
        <h3 className="font-bold mb-4">Spending Split</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {pieData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
