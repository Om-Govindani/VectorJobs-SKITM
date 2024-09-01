require("dotenv").config();
const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const client = require("../models/client");
const freelancer = require("../models/freelancer");
const Jobs = require("../models/jobs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../utilities");
const jobs = require("../models/jobs");
router.use(express.json());
const sendEmail = require('../services/mailer'); // Adjust path as necessary


router.get("/getJobs", authenticateToken, async (req, res) => {
  try {
    const { user } = req.user;

    const jobs = await Jobs.find({ userId: user._id });

    res.json({
      error: false,
      jobs,
      message: "All jobs retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

router.post("/create", authenticateToken, async (req, res) => {
  try {
    console.log("Post request recieved");
    let { Project_Title, Deadline, Rewards, Tags, Description } =
      req.body.formData;
    let { user } = req.user;
    console.log("____________________");
    // console.log(req);
    console.log("____________________");
    // console.log(user);

    let Deadline2 = Deadline.toString().split("").slice(0, 10).join("");
    console.log(user);
    let demoJob = new Jobs({
      userId: user._id,
      jobTitle: Project_Title,
      deadline: Deadline2,
      reward: Rewards,
      tags: Tags,
      jobDescription: Description,
    });

    demoJob
      .save()
      .then(() => {
        console.log(`Job Created Sucessfully`);
        return res.json({ error: false, demoJob, message: "okay" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { jobDescription } = req.body.editedData;
    console.log(jobDescription);
    let job = await jobs.findById(id);
    console.log(job);
    job.jobDescription = jobDescription;
    job
      .save()
      .then(() => {
        res.json({ messsage: "Job updates successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: true,
      message: err,
    });
  }
});


// Route to get all jobs
router.get("/allJobs", async (req, res) => {
  try {
    const Jobs = await jobs.find({});
    res.status(200).json(Jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


router.post('/apply/:jobId', authenticateToken , async (req, res) => {
  try {
  //const user = req.user.user._id;
  //console.log(user);
    const jobId = req.params.jobId;
    console.log(jobId);
    const userId = req.user.user._id?.toString(); 
    const username = req.user.user.username;
    const tags = req.user.user.tags;
    const { note, bid } = req.body; 

    const job = await jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    const applicantAlreadyExists = job.applicants.some(applicant => applicant._id === userId);
    if (applicantAlreadyExists) {
      return res.status(400).json({ msg: 'You have already applied for this job' });
    }

    job.applicants.push({ _id: userId, note, bid,username,tags});
    await job.save();

    res.status(200).json({ msg: 'Applied successfully' });

    const freelancerUser = await freelancer.findById(userId);
if (!freelancerUser) {
  return res.status(404).json({ msg: 'Freelancer not found' });
}

if (!freelancerUser.applied.includes(jobId)) {
  freelancerUser.applied.push(jobId);
  await freelancerUser.save();
}

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.get('/jobs/:jobId', async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await jobs.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
      const job = await jobs.findByIdAndDelete(req.params.id);
      if (!job) {
          return res.status(404).json({ message: 'Job not found' });
      }
      res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.patch("/hire/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const  applicantId  = req.body.applicantId;
    console.log(applicantId)
    const job = await jobs.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const hiredApplicant = job.applicants.find(
      (applicant) => applicant._id === applicantId
    );

    if (!hiredApplicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    job.hired = true;
//     console.log(`EMAIL_USER: ${process.env.EMAIL_USER}`);
// console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS}`);


//     const emailSubject = `Congratulations, You Are Hired!`;
//     const emailText = `Dear ${freelancer.name},\n\nCongratulations! You have been hired for the job titled '${job.title}'.\n\nBest regards,\nTeam vectorjobs`;

//     // Send email to freelancer
//     await sendEmail(freelancer.email, emailSubject, emailText);

    job.applicants = [hiredApplicant];

    await job.save();

    res.status(200).json({ message: "Applicant hired successfully", hiredApplicant });
  } catch (error) {
    res.status(500).json({ message: "Error hiring applicant", error });
    console.log(error);
  }
});

module.exports = router;
