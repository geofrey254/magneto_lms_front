export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/billing", "/topics/:path+", "/subscription/success"],
};
