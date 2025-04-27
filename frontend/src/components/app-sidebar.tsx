import * as React from "react";
import {
  Globe,
  Home,
  Users,
  //ScrollText,
  MonitorDot,
  BriefcaseBusiness,
  ClipboardPenLine,
  ClipboardList,
  Building2,
  Landmark,
  FileText,
  Mail,
  // BookOpen,
  // Bot,
  //Command,
  // Frame,
  // LifeBuoy,
  // Map,
  // PieChart,
  // Send,
  // Settings2,
  // SquareTerminal,
} from "lucide-react";

// import { NavMain } from "../components/nav-main";
import { NavProjects } from "../components/nav-projects";
// import { NavSecondary } from "../components/nav-secondary";
import { NavUser } from "../components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar";
import { useAuth } from "../contexts/AuthProvider";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  // navMain: [
  //   {
  //     title: "Playground",
  //     url: "#",
  //     icon: SquareTerminal,
  //     isActive: true,
  //     items: [
  //       {
  //         title: "History",
  //         url: "#",
  //       },
  //       {
  //         title: "Starred",
  //         url: "#",
  //       },
  //       {
  //         title: "Settings",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Models",
  //     url: "#",
  //     icon: Bot,
  //     items: [
  //       {
  //         title: "Genesis",
  //         url: "#",
  //       },
  //       {
  //         title: "Explorer",
  //         url: "#",
  //       },
  //       {
  //         title: "Quantum",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Documentation",
  //     url: "#",
  //     icon: BookOpen,
  //     items: [
  //       {
  //         title: "Introduction",
  //         url: "#",
  //       },
  //       {
  //         title: "Get Started",
  //         url: "#",
  //       },
  //       {
  //         title: "Tutorials",
  //         url: "#",
  //       },
  //       {
  //         title: "Changelog",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: Settings2,
  //     items: [
  //       {
  //         title: "General",
  //         url: "#",
  //       },
  //       {
  //         title: "Team",
  //         url: "#",
  //       },
  //       {
  //         title: "Billing",
  //         url: "#",
  //       },
  //       {
  //         title: "Limits",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  // navSecondary: [
  //   {
  //     title: "Support",
  //     url: "#",
  //     icon: LifeBuoy,
  //   },
  //   {
  //     title: "Feedback",
  //     url: "#",
  //     icon: Send,
  //   },
  // ],
  website: [
    {
      name: "Home",
      url: "/",
      icon: Globe,
    },
    {
      name: "Why Us?",
      url: "/why-us",
      icon: Globe,
    },
    {
      name: "Perks",
      url: "/perks",
      icon: Globe,
    },
    {
      name: "Join Us",
      url: "/join-us",
      icon: Globe,
    },
  ],
  tables: [
    {
      name: "All Companies",
      url: "/dashboard/all-companies",
      icon: Building2,
    },
    {
      name: "All Departments",
      url: "/dashboard/all-departments",
      icon: Landmark,
    },
    {
      name: "All Job Openings",
      url: "/dashboard/all-jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "All Applications",
      url: "/dashboard/all-applications",
      icon: FileText,
    },
    {
      name: "All Interview Sessions",
      url: "/dashboard/all-interview-sessions",
      icon: MonitorDot,
    },

    {
      name: "All Predicted Candidates",
      url: "/dashboard/all-predicted-candidates",
      icon: Users,
    },
    {
      name: "All Recruit Requests",
      url: "/dashboard/all-recruit-requests",
      icon: Mail,
    },
  ],
  tables2: [
    {
      name: "All Job Openings",
      url: "/dashboard/all-jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "All Applications",
      url: "/dashboard/all-applications",
      icon: FileText,
    },
    {
      name: "All Interview Sessions",
      url: "/dashboard/all-interview-sessions",
      icon: MonitorDot,
    },

    {
      name: "All Predicted Candidates",
      url: "/dashboard/all-predicted-candidates",
      icon: Users,
    },
  ],
  tables3: [
    {
      name: "All Applications",
      url: "/dashboard/all-applications",
      icon: BriefcaseBusiness,
    },
    {
      name: "All Interview Sessions",
      url: "/dashboard/all-interview-sessions",
      icon: MonitorDot,
    },
  ],
  forms: [
    {
      name: "Home",
      url: "/dashboard/",
      icon: Home,
    },
    {
      name: "Personal Information",
      url: "/dashboard/personal-information",
      icon: ClipboardList,
    },
    {
      name: "Add Company",
      url: "/dashboard/company",
      icon: Building2,
    },
    {
      name: "Add Department",
      url: "/dashboard/department",
      icon: Landmark,
    },
    {
      name: "Add Job Opening",
      url: "/dashboard/job",
      icon: ClipboardPenLine,
    },
  ],
  forms2: [
    {
      name: "Home",
      url: "/dashboard/",
      icon: Home,
    },
    {
      name: "Personal Information",
      url: "/dashboard/personal-information",
      icon: ClipboardList,
    },
    {
      name: "Add Job Opening",
      url: "/dashboard/job",
      icon: ClipboardPenLine,
    },
  ],
  forms3: [
    {
      name: "Home",
      url: "/dashboard/",
      icon: Home,
    },
    {
      name: "Personal Information",
      url: "/dashboard/personal-information",
      icon: ClipboardList,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { auth } = useAuth();
  let user: string = "Error@email.com";

  if (auth.user?.email) {
    user = auth.user.email;
  }
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div> */}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-lg font-semibold">
                    Smart HR
                  </span>
                  <span className="truncate text-sm">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects title="Website" projects={data.website} />
        {auth.user?.is_superuser ? (
          <>
            <NavProjects title="Tables" projects={data.tables} />
            <NavProjects title="Forms" projects={data.forms} />
          </>
        ) : auth.user?.is_recruiter ? (
          <>
            <NavProjects title="Tables" projects={data.tables2} />
            <NavProjects title="Forms" projects={data.forms2} />
          </>
        ) : auth.user?.id ? (
          <>
            <NavProjects title="Tables" projects={data.tables3} />
            <NavProjects title="Forms" projects={data.forms3} />
          </>
        ) : null}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ email: user }} />
      </SidebarFooter>
    </Sidebar>
  );
}
