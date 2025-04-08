import Footer from "@/components/footer";
import Header from "@/components/header";
import Toast from "@/components/toast";
import AuthProvider from "@/context/auth";
import "./globals.css";
import ToastProvider from "@/context/toast";
import LoaderProvider from "@/context/loader";
import Loader from "@/components/loader";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ToastProvider>
          <LoaderProvider>
            <AuthProvider>
              <div className="min-h-screen relative">
                <Header />
                <div className="p-4 flex flex-col items-center">{children}</div>
                <div className="absolute bottom-0 w-full">
                  <Footer />
                </div>
              </div>
              <Toast />
              <Loader />
            </AuthProvider>
          </LoaderProvider>
        </ToastProvider>
      </body>
    </html>
  );
};

export default RootLayout;
