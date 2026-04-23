import React, { useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import MqttPage from './pages/MqttPage';
import { ROUTES } from './constants/routes';

type Route = typeof ROUTES[keyof typeof ROUTES];

function App() {
  const [active, setActive] = useState<Route>(ROUTES.DASHBOARD);

  const renderPage = () => {
    switch (active) {
      case ROUTES.MQTT: return <MqttPage />;
      default:          return <DashboardPage />;
    }
  };

  return (
    <MainLayout active={active} onNavigate={setActive}>
      {renderPage()}
    </MainLayout>
  );
}

export default App;
