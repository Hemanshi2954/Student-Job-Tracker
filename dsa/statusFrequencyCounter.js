function countJobStatuses(jobs) {
    return jobs.reduce((acc, job) => {
      const status = job.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }

// Example usage:
const jobApplications = [
  { company: "Google", role: "SDE", status: "Applied" },
  { company: "Amazon", role: "SDE", status: "Interview" },
  { company: "Meta", role: "SDE", status: "Applied" },
  { company: "Netflix", role: "SDE", status: "Offer" },
  { company: "Microsoft", role: "SDE", status: "Rejected" },
  { company: "Google", role: "SDE", status: "Applied" },
  { company: "Apple", role: "SDE", status: "Interview" },
  { company: "Google", role: "SDE", status: "Rejected" },
];

console.log(countJobStatuses(jobApplications));

//module.exports = countJobStatuses;
  