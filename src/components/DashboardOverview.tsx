
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, CheckCircle, Clock } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const stats = [
    {
      title: "Total Resumes",
      value: "156",
      icon: FileText,
      change: "+12%",
      color: "text-resume-blue"
    },
    {
      title: "Qualified Candidates",
      value: "89",
      icon: CheckCircle,
      change: "+8%",
      color: "text-resume-success"
    },
    {
      title: "Pending Review",
      value: "23",
      icon: Clock,
      change: "-5%",
      color: "text-resume-warning"
    },
    {
      title: "Active Jobs",
      value: "7",
      icon: Users,
      change: "+2%",
      color: "text-resume-blue"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-resume-gray">Monitor your recruitment analytics and candidate pipeline</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-resume-success' : 'text-resume-danger'}>
                  {stat.change}
                </span>
                {" "}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New resume analyzed", candidate: "John Smith", time: "2 minutes ago" },
                { action: "Job description updated", job: "Senior Developer", time: "1 hour ago" },
                { action: "Candidate matched", candidate: "Sarah Wilson", time: "3 hours ago" },
                { action: "Interview scheduled", candidate: "Mike Johnson", time: "5 hours ago" }
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-resume-gray">
                      {activity.candidate || activity.job}
                    </p>
                  </div>
                  <span className="text-xs text-resume-gray">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Skills in Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { skill: "React", count: 45, percentage: 90 },
                { skill: "Python", count: 38, percentage: 76 },
                { skill: "TypeScript", count: 32, percentage: 64 },
                { skill: "Node.js", count: 28, percentage: 56 },
                { skill: "AWS", count: 25, percentage: 50 }
              ].map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{skill.skill}</span>
                    <span className="text-resume-gray">{skill.count} resumes</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill bg-resume-blue" 
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
