import {
  AudioWaveform,
  Bot,
  Command,
  FileText,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react";

export const useSidebarItems = () => {
  const navMain = [
    {
      title: "Interview",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: SquareTerminal,
          isActive: true,
          items: [
            {
              title: "Overview",
              url: "/dashboard",
            },
            {
              title: "Analytics",
              url: "/dashboard/analytics",
            },
            {
              title: "Reports",
              url: "/dashboard/reports",
            },
          ],
        },
        {
          title: "Candidates",
          url: "/candidates",
          icon: Users,
          items: [
            {
              title: "All Candidates",
              url: "/candidates",
            },
            {
              title: "Add Candidate",
              url: "/candidates/add",
            },
            {
              title: "Interview Schedule",
              url: "/candidates/schedule",
            },
          ],
        },
      ],
    },
    {
      title: "Tools",
      items: [
        {
          title: "Resume Builder",
          url: "/resume",
          icon: FileText,
          items: [
            {
              title: "My Resumes",
              url: "/resume",
            },
            {
              title: "Create New",
              url: "/resume/create",
            },
            {
              title: "Templates",
              url: "/resume/templates",
            },
          ],
        },
        {
          title: "AI Assistant",
          url: "/ai-assistant",
          icon: Bot,
          items: [
            {
              title: "Chat",
              url: "/ai-assistant/chat",
            },
            {
              title: "Interview Prep",
              url: "/ai-assistant/interview-prep",
            },
            {
              title: "Feedback",
              url: "/ai-assistant/feedback",
            },
          ],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Account",
          url: "/settings",
          icon: Settings2,
          items: [
            {
              title: "Profile",
              url: "/settings/profile",
            },
            {
              title: "Account",
              url: "/settings/account",
            },
            {
              title: "Notifications",
              url: "/settings/notifications",
            },
            {
              title: "Security",
              url: "/settings/security",
            },
          ],
        },
      ],
    },
  ];

  const projects = [
    {
      name: "Design Engineering",
      url: "/projects/design",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "/projects/sales",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "/projects/travel",
      icon: Map,
    },
  ];

  const teams = [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ];

  return {
    navMain,
    projects,
    teams,
  };
}; 