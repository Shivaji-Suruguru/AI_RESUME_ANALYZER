
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Brain, LayoutDashboard, FileText, Briefcase, BarChart, Bell, Settings, HelpCircle, LogOut } from "lucide-react"

interface AppSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    key: "dashboard"
  },
  {
    title: "Resumes",
    icon: FileText,
    key: "resumes"
  },
  {
    title: "Job Description",
    icon: Briefcase,
    key: "job-description"
  },
  {
    title: "Analytics",
    icon: BarChart,
    key: "analytics"
  },
  {
    title: "Notifications",
    icon: Bell,
    key: "notifications"
  },
]

const bottomItems = [
  {
    title: "Settings",
    icon: Settings,
    key: "settings"
  },
  {
    title: "Help",
    icon: HelpCircle,
    key: "help"
  },
  {
    title: "Logout",
    icon: LogOut,
    key: "logout"
  },
]

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="bg-resume-blue p-2 rounded-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Resume AI</h2>
            <p className="text-sm text-resume-gray">Analyzer</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeSection === item.key}
                    onClick={() => onSectionChange(item.key)}
                  >
                    <button className="w-full flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton 
                asChild
                isActive={activeSection === item.key}
                onClick={() => onSectionChange(item.key)}
              >
                <button className="w-full flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
