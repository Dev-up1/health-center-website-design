import { Route, Switch, Redirect } from "wouter";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ChatWidget } from "./components/ChatWidget";
import { ScrollToTop } from "./components/ScrollToTop";
import { BookingModal } from "./components/BookingModal";
import { BookingProvider } from "./contexts/BookingContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // استدعاء المزود الجديد

// Pages
import { Home } from "./pages/Home";
import { Doctors } from "./pages/Doctors";
import { Scans } from "./pages/Scans";
import { Clinics } from "./pages/Clinics";
import { Laboratory } from "./pages/Laboratory";
import { AboutUs } from "./pages/AboutUs";
import { Specialty } from "./pages/Specialty";
import { Search } from "./pages/Search";
import { DoctorDetail } from "./pages/DoctorDetail";
import { ScanDetail } from "./pages/ScanDetail";
import { ClinicDetail } from "./pages/ClinicDetail";
import { EquipmentDetail } from "./pages/EquipmentDetail";
import { Profile } from "./pages/Profile"; // استدعاء صفحة البروفايل

// مكون خاص لحماية المسار
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>جاري التحميل...</div>;
  
  // إذا لم يكن مسجل دخول، أعد توجيهه للرئيسية
  return user ? <Component /> : <Redirect to="/" />;
}

export default function App() {
  return (
    <AuthProvider> {/* تغليف التطبيق بنظام الدخول */}
      <BookingProvider>
        <div className="min-h-screen flex flex-col font-sans">
          <ScrollToTop />
          <Header />
          <main className="flex-1">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about-us" component={AboutUs} />
              <Route path="/doctors" component={Doctors} />
              <Route path="/scans" component={Scans} />
              <Route path="/clinics" component={Clinics} />
              <Route path="/laboratory" component={Laboratory} />
              <Route path="/specialty/:id" component={Specialty} />
              <Route path="/search" component={Search} />
              <Route path="/doctor/:id" component={DoctorDetail} />
              <Route path="/scan/:id" component={ScanDetail} />
              <Route path="/clinic/:id" component={ClinicDetail} />
              <Route path="/equipment/:id" component={EquipmentDetail} />
              
              {/* المسار المحمي */}
              <Route path="/profile">
                <ProtectedRoute component={Profile} />
              </Route>

              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </main>
          <Footer />
          <ChatWidget />
          <BookingModal />
        </div>
      </BookingProvider>
    </AuthProvider>
  );
}
