import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import NProgress from 'nprogress';
import { MainLayout } from './components/layout';
import {
  OverviewPage,
  MarketPage,
  CanadaPage,
  CountriesPage,
  CountryDetailPage,
  NewsPage,
  DisclaimerPage,
  YieldsPage,
} from './routes';

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  easing: 'ease',
  speed: 400,
});

// Initialize Google Tag Manager
const GTM_ID = import.meta.env.VITE_GTM_CONTAINER_ID;
if (GTM_ID) {
  TagManager.initialize({
    gtmId: GTM_ID,
  });
}

// Component to track page views and show loading bar
function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    NProgress.start();

    if (GTM_ID) {
      TagManager.dataLayer({
        dataLayer: {
          event: 'pageview',
          page: location.pathname + location.search,
        },
      });
    }

    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location]);

  return null;
}

/**
 * The regulation tracker used to live at /countries/:code. Those URLs now belong to
 * the Countries section, so any code the new section does not yet claim is sent on to
 * its regulation page. Explicit /countries/<slug> routes are declared above this one
 * and win, so each country page added later takes over its own path.
 */
function LegacyRegulationRedirect() {
  const { code } = useParams();
  return <Navigate to={`/regulation/${code}`} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <Routes>
        {/* Existing light site */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/stats" element={<MarketPage />} />

          {/* Regulation tracker — moved off /countries to match its nav label */}
          <Route path="/regulation" element={<CountriesPage />} />
          <Route path="/regulation/:code" element={<CountryDetailPage />} />

          {/* Countries section — issuer and market deep-dives, one page per country */}
          <Route path="/countries" element={<Navigate to="/countries/canada" replace />} />
          <Route path="/countries/canada" element={<CanadaPage />} />
          <Route path="/countries/:code" element={<LegacyRegulationRedirect />} />

          {/* Legacy */}
          <Route path="/canada" element={<Navigate to="/countries/canada" replace />} />

          <Route path="/news" element={<NewsPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/yields" element={<YieldsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
