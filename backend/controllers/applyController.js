const Contributor = require('../models/Contributor');
const Mentor = require('../models/Mentor');
const ProjectProposal = require('../models/ProjectProposal');
const sendEmail = require('../utils/sendEmail');
const emailTemplate = require('../utils/emailTemplate');

// In-memory store for OTPs
const otpStore = new Map();

// @desc    Send OTP for email verification
// @route   POST /api/apply/send-otp
// @access  Public
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.endsWith('@cumail.in')) {
      return res.status(400).json({ message: 'Valid @cumail.in email is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // 10 minutes

    const emailHtml = emailTemplate(`
      <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#1a1a2e;">Email Verification 🔐</h2>
      <p style="margin:0 0 24px;font-size:14px;color:#868e96;border-bottom:1px solid #e9ecef;padding-bottom:20px;">Faculty Mentor Registration</p>

      <p style="margin:0 0 16px;font-size:15px;color:#343a40;line-height:1.7;">We received a request to verify your email address for the CUSoC Faculty Mentor Registration. Use the OTP below to complete your verification.</p>

      <!-- OTP Box -->
      <div style="background:linear-gradient(135deg,#1a1a2e,#0f3460);border-radius:12px;padding:28px;text-align:center;margin:24px 0;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:rgba(255,255,255,0.6);letter-spacing:2px;text-transform:uppercase;">Your One-Time Password</p>
        <div style="font-size:42px;font-weight:900;color:#ffffff;letter-spacing:10px;line-height:1;">${otp}</div>
        <p style="margin:12px 0 0;font-size:12px;color:rgba(255,255,255,0.5);">Valid for <strong style="color:#E63946;">10 minutes</strong> only</p>
      </div>

      <p style="margin:0;font-size:13px;color:#868e96;line-height:1.6;">If you did not request this OTP, you can safely ignore this email.</p>
    `);
    await sendEmail({ email, subject: 'CUSoC — Email Verification OTP', html: emailHtml });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// @desc    Verify OTP
// @route   POST /api/apply/verify-otp
// @access  Public
const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const storedData = otpStore.get(email);

  if (!storedData) {
    return res.status(400).json({ message: 'OTP not found or expired. Please request a new one.' });
  }

  if (Date.now() > storedData.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
  }

  if (storedData.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP.' });
  }

  otpStore.delete(email);
  res.status(200).json({ message: 'Email verified successfully.' });
};

// @desc    Submit a contributor application
// @route   POST /api/apply/contributor (multipart/form-data with resume)
// @access  Public
const submitContributor = async (req, res) => {
  try {
    const {
      fullName, email, contactNumber, university, degreeProgram, currentYear,
      linkedIn, gitHub, areasOfInterest, technicalSkills, comfortableWith,
      technicalConfidence, bestProject, projectLinks, openSourceContributions,
      workedInTeams, whyCUSoC, whatAchieve, whySelected, selfLearnedSkill,
      weeklyAvailability, commitToPilot, otherCommitments, preferredDomains,
      preferredRole, collabMode, participatedIn
    } = req.body;

    const resumeUrl = req.file ? (req.file.path || req.file.secure_url || req.file.url) : null;

    if (!resumeUrl) {
      return res.status(400).json({ message: 'Resume is required' });
    }

    const newContributor = new Contributor({
      fullName, email, contactNumber, university, degreeProgram, currentYear,
      linkedIn, gitHub,
      areasOfInterest: JSON.parse(areasOfInterest || '[]'),
      technicalSkills,
      comfortableWith: JSON.parse(comfortableWith || '[]'),
      technicalConfidence,
      bestProject, projectLinks, openSourceContributions,
      workedInTeams: workedInTeams === 'Yes' || workedInTeams === true,
      whyCUSoC, whatAchieve, whySelected, selfLearnedSkill,
      participatedIn: JSON.parse(participatedIn || '[]'),
      weeklyAvailability,
      commitToPilot: commitToPilot === 'true' || commitToPilot === true,
      otherCommitments,
      preferredDomains: JSON.parse(preferredDomains || '[]'),
      preferredRole: JSON.parse(preferredRole || '[]'),
      collabMode,
      resumeUrl
    });

    await newContributor.save();

    const emailHtml = emailTemplate(`
      <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#1a1a2e;">Application Received! 🎉</h2>
      <p style="margin:0 0 24px;font-size:14px;color:#868e96;border-bottom:1px solid #e9ecef;padding-bottom:20px;">Contributor Application — CUSoC 2025</p>

      <p style="margin:0 0 16px;font-size:15px;color:#343a40;line-height:1.7;">Hi <strong>${fullName}</strong>,</p>
      <p style="margin:0 0 24px;font-size:15px;color:#343a40;line-height:1.7;">Thank you for applying to be a <strong style="color:#E63946;">Contributor</strong> for the Chandigarh University Summer of Code (CUSoC) pilot program. We're excited to have you on board!</p>

      <!-- Status badge -->
      <div style="background:#f8f9fa;border-left:4px solid #E63946;border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 24px;">
        <p style="margin:0;font-size:13px;font-weight:700;color:#1a1a2e;text-transform:uppercase;letter-spacing:0.5px;">Application Status</p>
        <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#E63946;">✅ Received &amp; Under Review</p>
      </div>

      <p style="margin:0 0 16px;font-size:15px;color:#343a40;line-height:1.7;">Our team will carefully review your details and get back to you soon with the next steps. Keep an eye on your inbox!</p>

      <p style="margin:0;font-size:14px;color:#495057;line-height:1.7;">Best of luck,<br/><strong style="color:#1a1a2e;">The CUSoC Team</strong></p>
    `);
    await sendEmail({ email, subject: 'CUSoC — Contributor Application Received ✅', html: emailHtml });

    res.status(201).json({ message: 'Contributor application submitted successfully' });
  } catch (error) {
    console.error('Error submitting contributor:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Submit a mentor application
// @route   POST /api/apply/mentor (multipart/form-data with resume)
// @access  Public
const submitMentor = async (req, res) => {
  try {
    const {
      mentorType, fullName, email, contactNumber, linkedIn, gitHub,
      areasOfExpertise, mentoringExperience, whyMentor, mentorshipGoals,
      mentorshipApproach, availableHours, collabMode, maxMentees, canProvide,
      // Industry mentor specific
      currentCompany, designation, yearsOfExperience, industriesFocus,
      // Faculty mentor specific
      department, employeeId, officialEmail, researchAreas,
      // Student mentor specific
      rollNumber, cuEmail, currentYear, skillAreas,
      // mentorshipStyle is an alias for mentorshipApproach
      mentorshipStyle
    } = req.body;

    const resumeUrl = req.file ? (req.file.path || req.file.secure_url || req.file.url) : null;

    if (mentorType === 'Industry' && !resumeUrl) {
      return res.status(400).json({ message: 'Resume is required for Industry mentors.' });
    }

    const newMentor = new Mentor({
      mentorType, fullName, email, contactNumber, linkedIn, gitHub,
      areasOfExpertise: JSON.parse(areasOfExpertise || '[]'),
      mentoringExperience,
      whyMentor,
      mentorshipGoals,
      mentorshipApproach: mentorshipApproach || mentorshipStyle,
      availableHours,
      collabMode,
      maxMentees: maxMentees ? Number(maxMentees) : undefined,
      canProvide: JSON.parse(canProvide || '[]'),
      resumeUrl,

      // Industry
      currentCompany, designation, yearsOfExperience,
      industriesFocus: JSON.parse(industriesFocus || '[]'),

      // Faculty
      department, employeeId, officialEmail,
      researchAreas: JSON.parse(researchAreas || '[]'),

      // Student
      rollNumber, cuEmail, currentYear,
      skillAreas: JSON.parse(skillAreas || '[]')
    });

    await newMentor.save();

    const emailHtml = emailTemplate(`
      <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#1a1a2e;">Mentor Application Received! 🙌</h2>
      <p style="margin:0 0 24px;font-size:14px;color:#868e96;border-bottom:1px solid #e9ecef;padding-bottom:20px;">${mentorType} Mentor Application — CUSoC 2025</p>

      <p style="margin:0 0 16px;font-size:15px;color:#343a40;line-height:1.7;">Hi <strong>${fullName}</strong>,</p>
      <p style="margin:0 0 24px;font-size:15px;color:#343a40;line-height:1.7;">Thank you for applying as a <strong style="color:#E63946;">${mentorType} Mentor</strong> for CUSoC! We're thrilled by your interest in guiding our student developers.</p>

      <!-- Status badge -->
      <div style="background:#f8f9fa;border-left:4px solid #E63946;border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 24px;">
        <p style="margin:0;font-size:13px;font-weight:700;color:#1a1a2e;text-transform:uppercase;letter-spacing:0.5px;">Application Status</p>
        <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#E63946;">✅ Received &amp; Under Review</p>
      </div>

      <p style="margin:0 0 16px;font-size:15px;color:#343a40;line-height:1.7;">Our organizing team will carefully review your profile and reach out to you shortly. We appreciate your commitment to open-source mentorship!</p>

      <p style="margin:0;font-size:14px;color:#495057;line-height:1.7;">Best regards,<br/><strong style="color:#1a1a2e;">The CUSoC Team</strong></p>
    `);
    await sendEmail({ email, subject: 'CUSoC — Mentor Application Received ✅', html: emailHtml });

    res.status(201).json({ message: 'Mentor application submitted successfully' });
  } catch (error) {
    console.error('Error submitting mentor:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Submit a project proposal (Institutional or Industry)
// @route   POST /api/apply/project (application/json)
// @access  Public
const submitProject = async (req, res) => {
  try {
    const {
      // Section 1 — Contact Info
      proposerName, email, contactNumber, linkedIn,
      affiliation,
      // Faculty-specific
      designation, department, employeeId,
      // Industry-specific
      companyName, companyWebsite, companySize,

      // Section 2 — Project Overview
      projectTitle, projectDomain, projectType, difficultyLevel, projectAbstract,

      // Section 3 — Problem Statement & Scope
      problemStatement, proposedSolution, expectedDeliverables,
      currentStatus, estimatedDuration,

      // Section 4 — Technical Requirements
      requiredSkills, techStack, preferredLevel, preferredRoles,

      // Section 5 — Mentorship & Support
      mentorAvailability, collaborationMode, resourcesAvailable,
      repoLink, gitHub, willingToMentor,

      // Section 6 — Outcomes & Impact
      expectedOutcomes, learningOutcomes, successEvaluation,

      // Section 7 — Compliance (Institutional)
      sensitiveData
    } = req.body;

    const newProject = new ProjectProposal({
      // Contact
      proposerName, email, contactNumber, linkedIn,
      affiliation,
      designation, department, employeeId,
      companyName, companyWebsite, companySize,

      // Project Overview
      projectTitle,
      projectDomain: Array.isArray(projectDomain) ? projectDomain : [],
      projectType,
      difficultyLevel,
      projectAbstract,

      // Scope
      problemStatement, proposedSolution, expectedDeliverables,
      currentStatus, estimatedDuration: estimatedDuration || '8 weeks',

      // Technical
      requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [],
      techStack,
      preferredLevel: Array.isArray(preferredLevel) ? preferredLevel : [],
      preferredRoles: Array.isArray(preferredRoles) ? preferredRoles : [],

      // Mentorship
      mentorAvailability, collaborationMode,
      resourcesAvailable: Array.isArray(resourcesAvailable) ? resourcesAvailable : [],
      repoLink: repoLink || gitHub,
      gitHub: gitHub || repoLink,
      willingToMentor: willingToMentor !== false,

      // Outcomes
      expectedOutcomes: Array.isArray(expectedOutcomes) ? expectedOutcomes : [],
      learningOutcomes, successEvaluation,

      // Compliance
      sensitiveData: sensitiveData || 'No'
    });

    await newProject.save();

    const emailHtml = emailTemplate(`
      <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#1a1a2e;">Project Proposal Received! 🚀</h2>
      <p style="margin:0 0 24px;font-size:14px;color:#868e96;border-bottom:1px solid #e9ecef;padding-bottom:20px;">Project Proposal — CUSoC 2025</p>

      <p style="margin:0 0 16px;font-size:15px;color:#343a40;line-height:1.7;">Hi <strong>${proposerName}</strong>,</p>
      <p style="margin:0 0 24px;font-size:15px;color:#343a40;line-height:1.7;">Thank you for submitting your project proposal to CUSoC! We're excited to review what you've put together.</p>

      <!-- Project detail box -->
      <div style="background:#f8f9fa;border:1px solid #e9ecef;border-radius:10px;padding:20px 24px;margin:0 0 24px;">
        <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#868e96;text-transform:uppercase;letter-spacing:0.5px;">Project Title</p>
        <p style="margin:0;font-size:17px;font-weight:700;color:#1a1a2e;">&ldquo;${projectTitle}&rdquo;</p>
      </div>

      <!-- Status badge -->
      <div style="background:#f8f9fa;border-left:4px solid #E63946;border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 24px;">
        <p style="margin:0;font-size:13px;font-weight:700;color:#1a1a2e;text-transform:uppercase;letter-spacing:0.5px;">Proposal Status</p>
        <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#E63946;">✅ Received &amp; Pending Review</p>
      </div>

      <p style="margin:0 0 16px;font-size:15px;color:#343a40;line-height:1.7;">Our program administrators will review your proposal to ensure it aligns with our cohort goals. We will notify you once it has been approved.</p>

      <p style="margin:0;font-size:14px;color:#495057;line-height:1.7;">Best regards,<br/><strong style="color:#1a1a2e;">The CUSoC Team</strong></p>
    `);
    await sendEmail({ email, subject: 'CUSoC — Project Proposal Received ✅', html: emailHtml });

    res.status(201).json({ message: 'Project proposal submitted successfully' });
  } catch (error) {
    console.error('Error submitting project proposal:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  submitContributor,
  submitMentor,
  submitProject
};
