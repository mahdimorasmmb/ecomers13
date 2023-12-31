import "./globals.css";
import localFont from "next/font/local";
import Provider from "@/components/auth/Provider";
import Headers from "@/components/layout/headers";

const yekanFont = localFont({
  src: "./font/Yekan.woff2",
  display: "swap",
});

export const metadata = {
  title: "فروشگاه لوازم دیجیتال",
  description: "فروشگاه لوازم دیجیتال",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html   lang="en">
      <body className={`${yekanFont.className} bg-[#f5f8fb]`}>
        <Provider>
          <Headers />
          {children}
        </Provider>
      </body>
    </html>
  );
}
