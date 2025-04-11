// src/pages/features/CommunityPage.jsx
import { useState } from "react";

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  const [discussionFilter, setDiscussionFilter] = useState("popular");

  // Sample discussion data
  const discussions = [
    {
      id: 1,
      title: "Best practices for state management in React",
      author: "reactfan42",
      posted: "2 days ago",
      replies: 23,
      likes: 47,
      tags: ["React", "JavaScript", "State Management"],
    },
    {
      id: 2,
      title: "How to implement authentication in NextJS applications",
      author: "securityguru",
      posted: "1 week ago",
      replies: 18,
      likes: 36,
      tags: ["NextJS", "Authentication", "Security"],
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox - When to use which?",
      author: "cssmaster",
      posted: "3 days ago",
      replies: 31,
      likes: 52,
      tags: ["CSS", "Layout", "Frontend"],
    },
    {
      id: 4,
      title: "Getting started with TypeScript for React development",
      author: "typescripter",
      posted: "5 days ago",
      replies: 15,
      likes: 28,
      tags: ["TypeScript", "React", "JavaScript"],
    },
  ];

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "CodeShare - Collaborative Code Editor",
      description: "Real-time code sharing and collaboration platform",
      author: "devteam123",
      stars: 154,
      forks: 34,
      tags: ["React", "Socket.io", "Collaboration"],
    },
    {
      id: 2,
      title: "DevBlog - Developer Blog Platform",
      description: "Minimalist blogging platform designed for developers",
      author: "blogdev",
      stars: 89,
      forks: 12,
      tags: ["NextJS", "Markdown", "Blog"],
    },
    {
      id: 3,
      title: "TaskFlow - Kanban Board for Developers",
      description: "Task management system with code integration",
      author: "productivityninja",
      stars: 212,
      forks: 46,
      tags: ["Vue", "DnD", "Project Management"],
    },
  ];

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Introduction to React Hooks Workshop",
      date: "May 15, 2023",
      time: "2:00 PM - 4:00 PM EST",
      host: "ReactMasters",
      attendees: 128,
      type: "Workshop",
      virtual: true,
    },
    {
      id: 2,
      title: "Web Development Hackathon",
      date: "June 3-5, 2023",
      time: "All day",
      host: "CodeCommunity",
      attendees: 342,
      type: "Hackathon",
      virtual: false,
    },
    {
      id: 3,
      title: "Frontend Performance Optimization Talk",
      date: "May 22, 2023",
      time: "1:00 PM - 2:30 PM EST",
      host: "PerformanceGurus",
      attendees: 95,
      type: "Talk",
      virtual: true,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Developer Community</h1>

      <div className="flex border-b mb-6">
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === "discussions"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("discussions")}
        >
          Discussions
        </button>
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === "projects"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === "events"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>
      </div>

      {activeTab === "discussions" && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-md ${
                  discussionFilter === "popular"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setDiscussionFilter("popular")}
              >
                Popular
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  discussionFilter === "recent"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setDiscussionFilter("recent")}
              >
                Recent
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  discussionFilter === "unanswered"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setDiscussionFilter("unanswered")}
              >
                Unanswered
              </button>
            </div>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              New Discussion
            </button>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="border rounded-md p-4 hover:bg-gray-50"
              >
                <h3 className="text-lg font-medium mb-2">{discussion.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {discussion.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    Posted by{" "}
                    <span className="font-medium">{discussion.author}</span> •{" "}
                    {discussion.posted}
                  </div>
                  <div className="flex space-x-4">
                    <span>{discussion.replies} replies</span>
                    <span>{discussion.likes} likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "projects" && (
        <>
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search projects..."
              className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Share Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-md p-4 hover:bg-gray-50"
              >
                <h3 className="text-lg font-medium mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    By <span className="font-medium">{project.author}</span>
                  </div>
                  <div className="flex space-x-4">
                    <span>⭐ {project.stars}</span>
                    <span>🍴 {project.forks}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "events" && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>All Events</option>
                <option>Workshops</option>
                <option>Hackathons</option>
                <option>Talks</option>
                <option>Meetups</option>
              </select>
            </div>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Create Event
            </button>
          </div>

          <div className="space-y-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="border rounded-md p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium mb-1">{event.title}</h3>
                    <p className="text-gray-600">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-gray-600">Hosted by: {event.host}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {event.type}
                    </span>
                    <span className="mt-2 text-sm text-gray-500">
                      {event.attendees} attending
                    </span>
                    <span className="mt-1 text-sm text-gray-500">
                      {event.virtual ? "Virtual Event" : "In-person Event"}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Community Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Engage in technical discussions with fellow developers</li>
          <li>Share and collaborate on open-source projects</li>
          <li>Attend virtual and in-person coding events</li>
          <li>
            Access exclusive content and networking opportunities (premium
            feature)
          </li>
          <li>Participate in community challenges and hackathons</li>
        </ul>
      </div>
    </div>
  );
};

export default CommunityPage;
