const jobs = [];// this would talk to the redis database

// Get current user
function getCurrentJob(id) {
  return jobs.find(job => job.id === id);
}

//Get all Vendors active Jobs
function getAllJobs(user_id) {
    return jobs.filter( job => job.user_id = user_id);
}

// Get product influence
function getInfluencerInfo(influencer_id) {
  return projects.filter( project => project.influencer_id === influencer_id);
}

module.exports = {
  getCurrentJob,
  getInfluencerInfo,
  getAllJobs
};
