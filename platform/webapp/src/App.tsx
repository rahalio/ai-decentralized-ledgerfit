import { Navigate, Route, Routes } from 'react-router-dom';
import { isAuthed } from './lib/api';
import { AppShell } from './app/AppShell';
import { LoginPage } from './app/LoginPage';
import { HomePage } from './app/HomePage';
import { FreezePage } from './app/FreezePage';
import { LedgersView } from './features/ledgers/views/LedgersView';
import { TrainingView } from './features/training/views/TrainingView';
import { ModelsView } from './features/models/views/ModelsView';
import { TriggersView } from './features/triggers/views/TriggersView';
import { InvestigationView } from './features/investigation/views/InvestigationView';
import { ProvenanceView } from './features/provenance/views/ProvenanceView';
import { GovernanceView } from './features/governance/views/GovernanceView';

function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!isAuthed()) return <Navigate to="/login" replace />;
  return children;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="ledgers" element={<LedgersView />} />
        <Route path="training" element={<TrainingView />} />
        <Route path="models" element={<ModelsView />} />
        <Route path="triggers" element={<TriggersView />} />
        <Route path="investigation" element={<InvestigationView />} />
        <Route path="provenance" element={<ProvenanceView />} />
        <Route path="freeze" element={<FreezePage />} />
        <Route path="governance" element={<GovernanceView />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
