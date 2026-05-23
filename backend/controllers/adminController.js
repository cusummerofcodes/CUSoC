const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Contributor = require('../models/Contributor');
const Mentor = require('../models/Mentor');
const ProjectProposal = require('../models/ProjectProposal');
const sendEmail = require('../utils/sendEmail');
const emailTemplate = require('../utils/emailTemplate');

// @desc    Admin login
// @route   POST /api/admin/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cusoc.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign({ id: 'admin' }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' });
      return res.json({ token, email });
    }

    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all submissions
// @route   GET /api/admin/submissions
// @access  Private (Needs middleware)
const getSubmissions = async (req, res) => {
  try {
    const contributors = await Contributor.find().sort({ createdAt: -1 });
    const mentors = await Mentor.find().sort({ createdAt: -1 });
    const projects = await ProjectProposal.find().sort({ createdAt: -1 });
    
    res.json({ contributors, mentors, projects });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update submission status
// @route   PUT /api/admin/submissions/:type/:id
const updateStatus = async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status } = req.body; // 'Approved' or 'Rejected'

    let result;
    if (type === 'contributor') {
      result = await Contributor.findByIdAndUpdate(id, { status }, { new: true });
    } else if (type === 'mentor') {
      result = await Mentor.findByIdAndUpdate(id, { status }, { new: true });
    } else if (type === 'project') {
      result = await ProjectProposal.findByIdAndUpdate(id, { status }, { new: true });
    } else {
      return res.status(400).json({ message: 'Invalid type' });
    }

    if (!result) return res.status(404).json({ message: 'Not found' });

    // Send Status Update Email
    const emailTo = result.email || (result.proposerEmail ? result.proposerEmail : null); // Adjust if model uses different email key
    if (emailTo && (status === 'Approved' || status === 'Rejected')) {
      const isApproved = status === 'Approved';
      const applicantName = result.fullName || result.proposerName || 'Applicant';
      const statusColor = isApproved ? '#2ecc71' : '#E63946';
      const statusIcon = isApproved ? '🎉' : '📋';

      const emailHtml = emailTemplate(`
        <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#1a1a2e;">Application ${status} ${statusIcon}</h2>
        <p style="margin:0 0 24px;font-size:14px;color:#868e96;border-bottom:1px solid #e9ecef;padding-bottom:20px;">CUSoC 2025 &mdash; Status Update</p>

        <p style="margin:0 0 16px;font-size:15px;color:#343a40;line-height:1.7;">Hi <strong>${applicantName}</strong>,</p>
        <p style="margin:0 0 24px;font-size:15px;color:#343a40;line-height:1.7;">We have reviewed your <strong style="color:#1a1a2e;">${type}</strong> application for CUSoC and we have an update for you.</p>

        <!-- Status banner -->
        <div style="background:${isApproved ? 'linear-gradient(135deg,#1a1a2e,#0f3460)' : '#f8f9fa'};border-radius:12px;padding:24px;text-align:center;margin:0 0 24px;border:${isApproved ? 'none' : '1px solid #e9ecef'};">
          <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:${isApproved ? 'rgba(255,255,255,0.6)' : '#868e96'};letter-spacing:1px;text-transform:uppercase;">Application Status</p>
          <div style="display:inline-block;background:${statusColor};color:#fff;font-size:16px;font-weight:800;padding:8px 28px;border-radius:50px;letter-spacing:0.5px;">${status}</div>
        </div>

        ${isApproved
          ? `<div style="background:#f0fdf4;border-left:4px solid #2ecc71;border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 24px;">
              <p style="margin:0;font-size:15px;color:#166534;line-height:1.7;">🎊 <strong>Congratulations!</strong> You are officially part of the CUSoC program. Our team will be in touch very soon with the next steps. Get ready for an exciting journey!</p>
            </div>`
          : `<div style="background:#fff5f5;border-left:4px solid #E63946;border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 24px;">
              <p style="margin:0;font-size:15px;color:#7f1d1d;line-height:1.7;">Thank you for your time and effort in applying. Unfortunately, we are unable to proceed with your application at this time. We encourage you to keep building and apply again in the future!</p>
            </div>`
        }

        <p style="margin:0;font-size:14px;color:#495057;line-height:1.7;">Best regards,<br/><strong style="color:#1a1a2e;">The CUSoC Team</strong></p>
      `);
      await sendEmail({ email: emailTo, subject: `CUSoC — Your Application has been ${status}`, html: emailHtml });
    }

    res.json({ message: 'Status updated', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login, getSubmissions, updateStatus };
