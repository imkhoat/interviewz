import { Resume } from "@shared/types/resume";

let resumes: Resume[] = [
  {
    id: 1,
    profile: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, City, Country",
      website: "https://johndoe.com",
      objective: "Seeking a Frontend Developer position",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe"
    },
    experiences: [
      {
        order: 1,
        company: "Tech Corp",
        jobTitle: "Frontend Developer",
        startDate: "2020-01-01",
        endDate: "2023-01-01",
        description: "Developed UI components and optimized performance",
        isCurrent: false
      }
    ],
    educations: [
      {
        order: 1,
        school: "Tech University",
        degree: "BSc in Computer Science",
        gpa: 3.8,
        startDate: "2016-09-01",
        endDate: "2020-06-01",
        description: "Studied software development and web technologies"
      }
    ],
    projects: [
      {
        order: 1,
        projectName: "Personal Portfolio",
        startDate: "2021-05-01",
        endDate: "2021-08-01",
        description: "Developed a personal portfolio website to showcase projects",
        references: ["https://johndoe.com"]
      }
    ],
    featuredSkills: [
      {
        order: 1,
        name: "React.js",
        level: 5
      }
    ],
    skill: ["JavaScript", "TypeScript", "CSS"]
  }
];
export async function GET(): Promise<Response> {
  return Response.json(resumes);
}

export async function POST(req: Request): Promise<Response> {
  const newResume: Resume = await req.json();
  newResume.id = resumes.length + 1; // Fake ID
  resumes.push(newResume);
  return Response.json(newResume, { status: 201 });
}

export async function PUT(req: Request): Promise<Response> {
  const updatedResume: Resume = await req.json();
  resumes = resumes.map((r) => (r.id === updatedResume.id ? updatedResume : r));
  return Response.json(updatedResume);
}

export async function DELETE(req: Request): Promise<Response> {
  const { id }: { id: number } = await req.json();
  resumes = resumes.filter((r) => r.id !== id);
  return Response.json({ message: "Resume deleted successfully" });
}