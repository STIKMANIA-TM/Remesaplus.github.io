import { Refine, Authenticated } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider, authProvider } from "./providers";
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ThemedLayoutV2 } from "@refinedev/mui";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AppstoreOutlined } from "@mui/icons-material";

// ============================================
// IMPORTACIÓN DE PÁGINAS REALES
// ============================================
import { CanalesList } from "./pages/canales/list";
import { CanalesCreate } from "./pages/canales/create";
import { CanalesEdit } from "./pages/canales/edit";
import { TasasList } from "./pages/tasas/list";
import { RemesasList } from "./pages/remesas/list";
import { RemesasCreate } from "./pages/remesas/create";
import { RemesasEdit } from "./pages/remesas/edit";

// ============================================
// CONFIGURACIÓN DE SUPABASE
// ============================================
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Faltan variables de Supabase en .env");
}

const supabaseClient = createClient(
  SUPABASE_URL || "",
  SUPABASE_ANON_KEY || ""
);

// ============================================
// TEMA STIKMANIA (Verde Neón + Negro)
// ============================================
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00FF00", // Verde neón
    },
    secondary: {
      main: "#006600", // Verde oscuro
    },
    background: {
      default: "#000000", // Negro puro
      paper: "#003300", // Verde muy oscuro para tarjetas
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#00FF00",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Montserrat', system-ui, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    button: { fontWeight: 600, textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 48,
          minWidth: 48,
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

// ============================================
// LAYOUT PERSONALIZADO CON IDENTIDAD STIKMANIA
// ============================================
const Layout = () => (
  <ThemedLayoutV2
    Title={({ collapsed }) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 24 }}>💸</span>
        {!collapsed && (
          <span style={{ color: "#00FF00", fontWeight: 700, fontSize: 20 }}>
            Remesa+
          </span>
        )}
      </div>
    )}
  />
);

// ============================================
// PÁGINA DE INICIO (PÚBLICA)
// ============================================
const HomePage = () => (
  <div style={{ padding: 24, textAlign: "center" }}>
    <h1 style={{ color: "#00FF00", fontSize: 32, marginBottom: 16 }}>
      💸 Remesa+
    </h1>
    <p style={{ fontSize: 18, marginBottom: 24 }}>
      Comparador y trazador de remesas para Cuba
    </p>
    <p style={{ color: "#006600", marginBottom: 32 }}>
      La primera plataforma cubana que convierte tu remesa en historial crediticio.
    </p>
    <a
      href="/canales"
      style={{
        display: "inline-block",
        backgroundColor: "#00FF00",
        color: "#000000",
        padding: "12px 32px",
        borderRadius: 8,
        fontWeight: 700,
        textDecoration: "none",
        minHeight: 48,
        lineHeight: "24px",
      }}
    >
      Ver Comparador de Tasas
    </a>
  </div>
);

// ============================================
// APP PRINCIPAL
// ============================================
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RefineKbarProvider>
          <Refine
            routerProvider={routerBindings}
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            resources={[
              {
                name: "canales",
                list: "/canales",
                create: "/canales/create",
                edit: "/canales/edit/:id",
                meta: { label: "Canales", icon: <AppstoreOutlined /> },
              },
              {
                name: "tasas_historico",
                list: "/tasas",
                meta: { label: "Tasas", icon: <AppstoreOutlined /> },
              },
              {
                name: "remesas",
                list: "/remesas",
                create: "/remesas/create",
                edit: "/remesas/edit/:id",
                meta: { label: "Remesas", icon: <AppstoreOutlined /> },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              disableTelemetry: true,
            }}
          >
            <Routes>
              {/* Ruta pública: Home */}
              <Route
                index
                element={
                  <ThemedLayoutV2>
                    <HomePage />
                  </ThemedLayoutV2>
                }
              />

              {/* Rutas protegidas: Dashboard */}
              <Route
                element={
                  <Authenticated
                    key="authenticated-inner"
                    fallback={<NavigateToResource resource="canales" />}
                  >
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                {/* Canales */}
                <Route path="/canales" element={<CanalesList />} />
                <Route path="/canales/create" element={<CanalesCreate />} />
                <Route path="/canales/edit/:id" element={<CanalesEdit />} />
                
                {/* Tasas */}
                <Route path="/tasas" element={<TasasList />} />
                
                {/* Remesas */}
                <Route path="/remesas" element={<RemesasList />} />
                <Route path="/remesas/create" element={<RemesasCreate />} />
                <Route path="/remesas/edit/:id" element={<RemesasEdit />} />
              </Route>

              {/* Catch-all: redirige al home */}
              <Route path="*" element={<NavigateToResource />} />
            </Routes>
            <UnsavedChangesNotifier />
          </Refine>
          <RefineKbar />
        </RefineKbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;