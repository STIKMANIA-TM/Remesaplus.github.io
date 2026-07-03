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
// CONFIGURACIÓN DE SUPABASE
// ============================================
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
// LAYOUT PERSONALIZADO
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
// PÁGINAS BÁSICAS (Placeholder)
// ============================================
const HomePage = () => (
  <div style={{ padding: 24 }}>
    <h1 style={{ color: "#00FF00" }}>Bienvenido a Remesa+</h1>
    <p>Comparador y trazador de remesas para Cuba</p>
    <p style={{ marginTop: 16, color: "#006600" }}>
      Usa el menú lateral para navegar entre Canales, Tasas y Remesas.
    </p>
  </div>
);

const CanalesList = () => (
  <div style={{ padding: 24 }}>
    <h2 style={{ color: "#00FF00" }}>Canales de Remesa</h2>
    <p>Aquí irá la tabla comparativa de canales (Western Union, EnZona, etc.)</p>
  </div>
);

const TasasList = () => (
  <div style={{ padding: 24 }}>
    <h2 style={{ color: "#00FF00" }}>Histórico de Tasas</h2>
    <p>Aquí irá el comparador de tasas USD/CUP en tiempo real.</p>
  </div>
);

const RemesasList = () => (
  <div style={{ padding: 24 }}>
    <h2 style={{ color: "#00FF00" }}>Mis Remesas</h2>
    <p>Aquí irá el trazador de remesas con estados en tiempo real.</p>
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
                  <Authenticated fallback={<NavigateToResource resource="canales" />}>
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route path="/canales" element={<CanalesList />} />
                <Route path="/tasas" element={<TasasList />} />
                <Route path="/remesas" element={<RemesasList />} />
              </Route>
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