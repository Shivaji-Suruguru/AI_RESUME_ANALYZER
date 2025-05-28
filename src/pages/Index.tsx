
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import DashboardOverview from '@/components/DashboardOverview';
import CandidateListView from '@/components/CandidateListView';
import JobDescriptionManager from '@/components/JobDescriptionManager';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'resumes':
        return <CandidateListView />;
      case 'job-description':
        return <JobDescriptionManager />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Notifications</h2>
              <p className="text-resume-gray">Stay updated with important alerts</p>
            </div>
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-resume-gray">No new notifications</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Settings</h2>
              <p className="text-resume-gray">Configure your application preferences</p>
            </div>
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-resume-gray">Settings panel coming soon</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'help':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Help & Support</h2>
              <p className="text-resume-gray">Get assistance and documentation</p>
            </div>
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-resume-gray">Help documentation coming soon</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
          </header>
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
