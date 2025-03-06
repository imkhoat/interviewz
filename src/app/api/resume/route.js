let resumes = [
  { id: 1, name: "John Doe", position: "Frontend Developer", experience: 3 },
  { id: 2, name: "Jane Smith", position: "Backend Developer", experience: 5 }
];

export async function GET() {
  return Response.json(resumes);
}

export async function POST(req) {
  const newResume = await req.json();
  newResume.id = resumes.length + 1; // Fake ID
  resumes.push(newResume);
  return Response.json(newResume, { status: 201 });
}

export async function PUT(req) {
  const updatedResume = await req.json();
  resumes = resumes.map((r) => (r.id === updatedResume.id ? updatedResume : r));
  return Response.json(updatedResume);
}

export async function DELETE(req) {
  const { id } = await req.json();
  resumes = resumes.filter((r) => r.id !== id);
  return Response.json({ message: "Resume deleted successfully" });
}
