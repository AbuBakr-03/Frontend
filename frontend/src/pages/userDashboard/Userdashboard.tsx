// import { useForm, SubmitHandler } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { AppSidebar } from "../../components/app-sidebar2";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Separator } from "../../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../components/ui/sidebar";
// import colors from "../../styles/global.module.css";
// import { toast, Toaster } from "sonner";
// import Personalinformation from "./personalInformation/Personalinformation";
// import Jobopening from "./jobOpening/Jobopening";
import { Outlet } from "react-router-dom";

export default function Userdashboard() {
  // const schema = z.object({
  //   job: z.string().min(4),
  //   location: z.string().min(4),
  //   team: z.string().min(4),
  //   event: z.string().min(4),
  //   responsibilities: z.string().max(360),
  //   qualification: z.string().max(360),
  //   tohaves: z.string().max(360),
  // });
  // type fieldTypes = z.infer<typeof schema>;
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<fieldTypes>({ resolver: zodResolver(schema) });
  // const submitter: SubmitHandler<fieldTypes> = (data) => {
  //   console.log(data);
  //   toast("Success!", {
  //     description: "A new job opening has been created",
  //   });
  // };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
