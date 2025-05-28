
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AnalyticsDashboard: React.FC = () => {
  const skillsData = [
    { skill: 'React', count: 45 },
    { skill: 'Python', count: 38 },
    { skill: 'TypeScript', count: 32 },
    { skill: 'Node.js', count: 28 },
    { skill: 'AWS', count: 25 },
    { skill: 'Docker', count: 22 }
  ];

  const matchScoreData = [
    { range: '90-100%', count: 12, color: '#10b981' },
    { range: '80-89%', count: 25, color: '#3b82f6' },
    { range: '70-79%', count: 35, color: '#f59e0b' },
    { range: '60-69%', count: 28, color: '#ef4444' },
    { range: '0-59%', count: 15, color: '#6b7280' }
  ];

  const timelineData = [
    { month: 'Jan', applications: 45, qualified: 28 },
    { month: 'Feb', applications: 52, qualified: 31 },
    { month: 'Mar', applications: 48, qualified: 29 },
    { month: 'Apr', applications: 61, qualified: 38 },
    { month: 'May', applications: 55, qualified: 33 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Analytics</h2>
        <p className="text-resume-gray">Insights and trends from your recruitment data</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Skills in Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Match Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={matchScoreData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ range, count }) => `${range}: ${count}`}
                >
                  {matchScoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#3b82f6" name="Total Applications" />
              <Bar dataKey="qualified" fill="#10b981" name="Qualified Candidates" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Match Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-resume-blue">76.5%</div>
            <p className="text-sm text-resume-gray">+4.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Qualification Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-resume-success">62%</div>
            <p className="text-sm text-resume-gray">+8.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Avg. Time to Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-resume-warning">2.4 days</div>
            <p className="text-sm text-resume-gray">-0.3 days from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
