import { MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
// import { Input } from "../../components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../components/ui/select";
import { Card } from "../../components/ui/card";
import { useJob } from "../../hooks/useJob";
//import { Button } from "../../components/ui/button";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "../../components/ui/pagination";
import Loader from "../../components/loader/Loader";
import Abovethefold2 from "./abovethefold2/Abovethefold2";

export default function JoinUs2() {
  const { jobQueries } = useJob();
  const { data, isLoading } = jobQueries;
  if (isLoading) {
    return <Loader />;
  }
  const jobListings = data?.results.map((x) => ({
    id: x.id,
    title: x.title,
    location: x.location,
    company: x.company.name,
    department: x.department.title,
    responsibilities: x.responsiblities,
    end_date: x.end_date,
  }));
  let len: number = 0;
  if (jobListings !== undefined) {
    len = jobListings.length;
  }
  return (
    <main>
      <Abovethefold2 results={len}></Abovethefold2>

      <div className="container mx-auto grid w-10/12 px-4 py-8">
        {/* <h1 className="mb-6 text-3xl font-bold">Job Results</h1>

        Search and filters */}
        {/* <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto]"> */}
        {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search job titles..." className="pl-10" />
          </div> */}
        {/* <div className="flex w-full items-center space-x-2">
            <Input
              className="pl-4"
              type="text"
              placeholder="Search by job titles..."
            />
            <Button className="w-[160px]" type="submit">
              Search
            </Button>
          </div> */}
        {/* <div className="flex gap-2">
            <Select defaultValue="location">
              <SelectTrigger className="w-[160px]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <SelectValue placeholder="Location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="location">Any Location</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="san-francisco">San Francisco</SelectItem>
                <SelectItem value="london">London</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </div> */}
        {/* </div> */}

        {/* Results count */}
        {/* <div className="mb-6 flex items-center justify-between"> */}
        {/* <p className="text-muted-foreground">
            Showing {jobListings?.length} jobs
          </p> */}
        {/* <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Sort by: Relevance</SelectItem>
              <SelectItem value="recent">Sort by: Most Recent</SelectItem>
              <SelectItem value="salary-high">
                Sort by: Salary (High to Low)
              </SelectItem>
              <SelectItem value="salary-low">
                Sort by: Salary (Low to High)
              </SelectItem>
            </SelectContent>
          </Select> */}
        {/* </div> */}

        {/* Job listings */}
        <div className="mb-8 grid gap-2 space-y-4">
          {jobListings?.map((job) => (
            <Link key={job.id} to={`/about-job/${job.id}`}>
              <Card className="overflow-hidden border-l-4 border-l-primary transition-shadow hover:shadow-md">
                <div className="p-6">
                  <div className="mb-4">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <div className="whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                        Ends: {new Date(job.end_date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-y-2 text-sm md:grid-cols-3">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700">
                          {job.department}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 border-t pt-4">
                      <h4 className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                        Responsibilities:
                      </h4>
                      <p className="text-sm">{job.responsibilities}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {/* <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
      </div>
    </main>
  );
}

// Sample job data
