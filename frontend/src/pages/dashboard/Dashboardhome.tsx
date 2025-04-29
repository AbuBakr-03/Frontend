// Create a new file: src/pages/dashboard/home/DashboardHome.tsx

//import React, { useEffect } from "react";
import useCompany from "../../hooks/useCompany";
import { useJob } from "../../hooks/useJob";
import { useApplication } from "../../hooks/useApplication";
import { useInterview } from "../../hooks/useInterview";
import { useAuth } from "../../contexts/AuthProvider";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ArrowUpCircle,
  Calendar,
  //Users,
  Briefcase,
  Building,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const DashboardHome: React.FC = () => {
  const { companyQueries } = useCompany();
  const { jobQueries } = useJob();
  const { applicationQueries } = useApplication();
  const { interviewQueries } = useInterview();
  const { isAdmin, isRecruiter } = useAuth();

  // Check if any queries are still loading
  const isLoading =
    companyQueries.isLoading ||
    jobQueries.isLoading ||
    applicationQueries.isLoading ||
    interviewQueries.isLoading;

  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Count upcoming interviews (in next 7 days)
  const upcomingInterviews =
    interviewQueries.data?.results.filter((interview) => {
      if (!interview.date) return false;
      const interviewDate = new Date(interview.date);
      const sevenDaysLater = new Date(today);
      sevenDaysLater.setDate(today.getDate() + 7);
      return interviewDate > today && interviewDate <= sevenDaysLater;
    }) || [];

  // Count active jobs (not expired)
  const activeJobs =
    jobQueries.data?.results.filter((job) => {
      const endDate = new Date(job.end_date);
      return endDate >= today;
    }) || [];

  // Count applications with "Pending" status (status id 1)
  const pendingApplications =
    applicationQueries.data?.results.filter((app) => app.status.id === 1) || [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="mb-1 text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">{formattedDate}</p>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Companies
            </CardTitle>
            <Building className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {companyQueries.data?.count || 0}
            </div>
            <p className="text-xs text-gray-500">Registered companies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs.length}</div>
            <p className="text-xs text-gray-500">Open positions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applicationQueries.data?.count || 0}
            </div>
            <p className="text-xs text-gray-500">
              {pendingApplications.length} pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Interviews
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {upcomingInterviews.length}
            </div>
            <p className="text-xs text-gray-500">In the next 7 days</p>
          </CardContent>
        </Card>
      </div>

      {upcomingInterviews.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-semibold">Upcoming Interviews</h2>
          <div className="space-y-3">
            {upcomingInterviews.slice(0, 3).map((interview) => (
              <Card key={interview.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">
                        {interview.application.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {interview.application.job.title} at{" "}
                        {interview.application.job.company.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {interview.date
                          ? new Date(interview.date).toLocaleString()
                          : "Not scheduled"}
                      </p>
                      {interview.external_meeting_link && (
                        <a
                          href={interview.external_meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Join Meeting
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {upcomingInterviews.length > 3 && (
              <div className="text-center">
                <Link
                  to="/dashboard/all-interview-sessions"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View all {upcomingInterviews.length} upcoming interviews
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {pendingApplications.length > 0 && isRecruiter && (
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-semibold">
            Applications Needing Review
          </h2>
          <div className="space-y-3">
            {pendingApplications.slice(0, 3).map((application) => (
              <Card key={application.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{application.name}</h3>
                      <p className="text-sm text-gray-500">
                        {application.job.title} at{" "}
                        {application.job.company.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {application.match_score !== null && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-sm">
                          {Math.round(application.match_score)}% match
                        </span>
                      )}
                      <Link
                        to={`/dashboard/application/${application.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {pendingApplications.length > 3 && (
              <div className="text-center">
                <Link
                  to="/dashboard/all-applications"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View all {pendingApplications.length} pending applications
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {isAdmin && (
        <div className="mb-6">
          <Alert>
            <ArrowUpCircle className="h-4 w-4" />
            <AlertTitle>Admin Quick Actions</AlertTitle>
            <AlertDescription>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link
                  to="/dashboard/company"
                  className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
                >
                  Add Company
                </Link>
                <Link
                  to="/dashboard/department"
                  className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
                >
                  Add Department
                </Link>
                <Link
                  to="/dashboard/job"
                  className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
                >
                  Create Job
                </Link>
                <Link
                  to="/dashboard/all-recruit-requests"
                  className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
                >
                  View Recruiter Requests
                </Link>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
