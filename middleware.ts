export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/billing",
    // "/topics/:slug",
    "/subscription/initiate",
    "/subscription/success",
  ],
};
