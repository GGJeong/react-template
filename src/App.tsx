import React, { useState } from 'react';
import MainLayout from './shared/components/layout/MainLayout';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import MqttPage from './features/mqtt/pages/MqttPage';
import LoginPage from './features/auth/pages/LoginPage';
import { ROUTES } from './shared/constants/routes';

type Route = (typeof ROUTES)[keyof typeof ROUTES];

function App() {
  const [active, setActive] = useState<Route>(ROUTES.DASHBOARD);

  if (active === ROUTES.LOGIN) {
    return <LoginPage onLoginSuccess={() => setActive(ROUTES.DASHBOARD)} />;
  }

  const renderPage = () => {
    switch (active) {
      case ROUTES.MQTT:
        return <MqttPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <MainLayout active={active} onNavigate={setActive}>
      {renderPage()}
    </MainLayout>
  );
}

export default App;
