"use client";

import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo, type PropsWithChildren } from "react";

export function Header({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const params = useMemo(() => {
    const splitted = pathname.split("/").filter(Boolean);

    return splitted.map((p) => {
      const index = pathname.indexOf(p);
      const sliceValue = index + p.length;
      const paramLink = pathname.slice(0, sliceValue);

      return {
        label: captalize(p),
        link: paramLink,
      };
    });
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {/* <Sheet> */}
      {/*   <SheetTrigger asChild> */}
      {/*     <Button size="icon" variant="outline" className="sm:hidden"> */}
      {/*       <PanelLeft className="h-5 w-5" /> */}
      {/*       <span className="sr-only">Toggle Menu</span> */}
      {/*     </Button> */}
      {/*   </SheetTrigger> */}
      {/*   <SheetContent side="left" className="sm:max-w-xs"> */}
      {/*     <nav className="grid gap-6 text-lg font-medium"> */}
      {/*       {params.map((p) => ( */}
      {/*         <Link */}
      {/*           key={p.link} */}
      {/*           href={p.link} */}
      {/*           className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" */}
      {/*         > */}
      {/*           {p.label} */}
      {/*         </Link> */}
      {/*       ))} */}
      {/*     </nav> */}
      {/*   </SheetContent> */}
      {/* </Sheet> */}
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {params.map((p, idx) => (
            <Fragment key={p.link}>
              {idx < params.length - 1 ? (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={p.link}>{p.label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>{p.label}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
              {idx < params.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      {children}
    </header>
  );
}

function captalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
