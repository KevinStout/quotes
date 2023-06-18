// This file contains the middle ware for clerk both the old way and new way
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/trpc/posts.getAll"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// import { withClerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export default withClerkMiddleware((req: NextRequest) => {
//   return NextResponse.next();
// });

// // Stop Middleware running on static files
// export const config = {
//   matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
// };
