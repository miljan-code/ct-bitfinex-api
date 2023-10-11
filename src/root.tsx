import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ContextProvider } from './context/context-provider';
import { Header } from './components/header';
import styles from './styles/background.module.css';

const queryClient = new QueryClient();

export function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <div className="flex min-h-screen flex-col justify-between">
          <div className={styles.main}>
            <div className={styles.content}>
              <Header />
              <Outlet />
            </div>
          </div>
        </div>
      </ContextProvider>
    </QueryClientProvider>
  );
}
