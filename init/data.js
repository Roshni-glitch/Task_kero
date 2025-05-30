const mongoose = require("mongoose");
require("../config/db");
const Task=require('../models/task');
const tasks = [
  {
    title: "Complete Project Report",
    description: "Finalize and submit the report",
    status: "In Progress",
    priority: "High",
    dueDate: new Date("2025-03-15"),
  },
  {
    title: "Fix Backend API Bug",
    description: "Resolve authentication issue",
    status: "Pending",
    priority: "Critical",
    dueDate: new Date("2025-03-10"),
  },
  {
    title: "Design Landing Page",
    description: "Create a new UI for the homepage",
    status: "Completed",
    priority: "Medium",
    dueDate: new Date("2025-03-05"),
  },
  {
    title: "Deploy New Features",
    description: "Push updates to the live server",
    status: "Pending",
    priority: "High",
    dueDate: new Date("2025-03-18"),
  },
  {
    title: "Optimize Database Queries",
    description: "Improve MongoDB query performance",
    status: "In Progress",
    priority: "Critical",
    dueDate: new Date("2025-03-12"),
  },
  {
    title: "Write Blog Post",
    description: "Publish an article on task management",
    status: "Pending",
    priority: "Low",
    dueDate: new Date("2025-03-22"),
  },
  {
    title: "Refactor Frontend Code",
    description: "Clean up React components",
    status: "In Progress",
    priority: "Medium",
    dueDate: new Date("2025-03-14"),
  },
  {
    title: "Set Up CI/CD Pipeline",
    description: "Automate deployment process",
    status: "Completed",
    priority: "High",
    dueDate: new Date("2025-03-07"),
  },
  {
    title: "Research AI Models",
    description: "Explore ML solutions for chatbot",
    status: "Pending",
    priority: "Medium",
    dueDate: new Date("2025-03-20"),
  },
  {
    title: "Update API Documentation",
    description: "Ensure API docs are up to date",
    status: "Completed",
    priority: "Low",
    dueDate: new Date("2025-03-08"),
  },
  {
    title: "Review PRs",
    description: "Check and merge pull requests",
    status: "In Progress",
    priority: "Medium",
    dueDate: new Date("2025-03-13"),
  },
  {
    title: "Schedule Team Meeting",
    description: "Discuss project milestones",
    status: "Pending",
    priority: "High",
    dueDate: new Date("2025-03-09"),
  },
  {
    title: "Fix UI Bugs",
    description: "Resolve layout issues on mobile",
    status: "Pending",
    priority: "Critical",
    dueDate: new Date("2025-03-16"),
  },
  {
    title: "Plan Marketing Strategy",
    description: "Outline campaign for new product",
    status: "Completed",
    priority: "Medium",
    dueDate: new Date("2025-03-11"),
  },
  {
    title: "Setup Webhook Integrations",
    description: "Connect API with third-party services",
    status: "In Progress",
    priority: "High",
    dueDate: new Date("2025-03-17"),
  },
  {
    title: "Conduct User Testing",
    description: "Gather feedback from beta users",
    status: "Pending",
    priority: "Medium",
    dueDate: new Date("2025-03-19"),
  },
  {
    title: "Write Unit Tests",
    description: "Increase code coverage",
    status: "In Progress",
    priority: "Critical",
    dueDate: new Date("2025-03-21"),
  },
  {
    title: "Create Dashboard UI",
    description: "Design an analytics dashboard",
    status: "Completed",
    priority: "High",
    dueDate: new Date("2025-03-06"),
  },
  {
    title: "Migrate Database",
    description: "Move to a new cloud provider",
    status: "Pending",
    priority: "Critical",
    dueDate: new Date("2025-03-23"),
  },
  {
    title: "Develop Mobile App",
    description: "Build a companion app for Android",
    status: "In Progress",
    priority: "High",
    dueDate: new Date("2025-03-25"),
  },
];

Task.insertMany(tasks)
  .then(() => {
    console.log("Data inserted successfully");
  })
  .catch((error) => {
    console.error(error);
  });
