let jobs = [
  {
    id: 1,
    company: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    desc: "Build cross-platform apps using React Native.",
    status: "none",
  },
  {
    id: 2,
    company: "WebFlow Agency",
    position: "Web Designer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    desc: "Create modern UI/UX layouts.",
    status: "none",
  },
  {
    id: 3,
    company: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    desc: "Transform data into visual insights.",
    status: "none",
  },
  {
    id: 4,
    company: "CloudOps Inc",
    position: "DevOps Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$140,000 - $180,000",
    desc: "Maintain CI/CD pipelines.",
    status: "none",
  },
  {
    id: 5,
    company: "AI Labs",
    position: "ML Engineer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$150,000 - $200,000",
    desc: "Build and deploy ML models.",
    status: "none",
  },
  {
    id: 6,
    company: "TechVerse",
    position: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    desc: "Work with React and UI frameworks.",
    status: "none",
  },
  {
    id: 7,
    company: "CyberSecure",
    position: "Security Analyst",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$90,000 - $140,000",
    desc: "Monitor system vulnerabilities.",
    status: "none",
  },
  {
    id: 8,
    company: "MediaPoint",
    position: "UI/UX Designer",
    location: "Chicago, IL",
    type: "Hybrid",
    salary: "$85,000 - $120,000",
    desc: "Design user experience flows.",
    status: "none",
  },
];

const jobList = document.getElementById("jobList");
const tabs = document.querySelectorAll(".tab");

function updateDashboard() {
  document.getElementById("totalCount").textContent = jobs.length;
  document.getElementById("interviewCount").textContent = jobs.filter(
    (j) => j.status === "interview",
  ).length;
  document.getElementById("rejectedCount").textContent = jobs.filter(
    (j) => j.status === "rejected",
  ).length;
  document.getElementById("jobCount").textContent = `${jobs.length} jobs`;
}

function renderJobs(filter = "all") {
  jobList.innerHTML = "";

  const filteredJobs = jobs.filter(
    (job) => filter === "all" || job.status === filter,
  );

  const emptyState = document.getElementById("emptyState");
  emptyState.classList.toggle("hidden", filteredJobs.length > 0);

  if (filteredJobs.length === 0) return;

  filteredJobs.forEach((job) => {
    const card = document.createElement("div");

    // Base styles
    card.classList.add("job-card");

    // Add border color class depending on status
    if (job.status === "interview") card.classList.add("interview");
    if (job.status === "rejected") card.classList.add("rejected");

    card.innerHTML = `
            <h3>${job.company}</h3>
            <p class="job-meta">${job.position}</p>
            <p class="job-meta">${job.location} • ${job.type} • ${job.salary}</p>

            ${job.status !== "none" ? `<span class="badge ${job.status}">${job.status}</span>` : ""}

            <p class="desc">${job.desc}</p>

            <div class="actions">
                <button class="btn interview-btn" data-id="${job.id}">Interview</button>
                <button class="btn reject-btn" data-id="${job.id}">Rejected</button>
            </div>

            <span class="delete-btn" data-id="${job.id}">
                <img src="./delete.png" alt="Delete Icon" />
            </span>
        `;

    jobList.appendChild(card);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    renderJobs(tab.dataset.tab);
  });
});

jobList.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains("interview-btn")) {
    jobs.find((j) => j.id == id).status = "interview";
  }

  if (e.target.classList.contains("reject-btn")) {
    jobs.find((j) => j.id == id).status = "rejected";
  }

  if (e.target.classList.contains("delete-btn")) {
    jobs = jobs.filter((j) => j.id != id);
  }

  updateDashboard();
  renderJobs(document.querySelector(".tab.active").dataset.tab);
});

updateDashboard();
renderJobs("all");
