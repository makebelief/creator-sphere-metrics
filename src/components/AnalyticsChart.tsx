
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', instagram: 38000, youtube: 32000, twitter: 21000, linkedin: 9000 },
  { month: 'Feb', instagram: 40000, youtube: 33500, twitter: 22500, linkedin: 9800 },
  { month: 'Mar', instagram: 42000, youtube: 35000, twitter: 24000, linkedin: 10500 },
  { month: 'Apr', instagram: 43500, youtube: 36800, twitter: 25200, linkedin: 11200 },
  { month: 'May', instagram: 44800, youtube: 38200, twitter: 26800, linkedin: 12100 },
  { month: 'Jun', instagram: 45200, youtube: 38900, twitter: 28100, linkedin: 13230 },
];

export const AnalyticsChart = () => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="month" className="text-sm" />
          <YAxis className="text-sm" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="instagram" 
            stroke="#e91e63" 
            strokeWidth={3}
            name="Instagram"
            dot={{ fill: '#e91e63', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="youtube" 
            stroke="#f44336" 
            strokeWidth={3}
            name="YouTube"
            dot={{ fill: '#f44336', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="twitter" 
            stroke="#2196f3" 
            strokeWidth={3}
            name="Twitter"
            dot={{ fill: '#2196f3', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="linkedin" 
            stroke="#0d47a1" 
            strokeWidth={3}
            name="LinkedIn"
            dot={{ fill: '#0d47a1', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
