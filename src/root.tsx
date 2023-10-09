import { Outlet } from 'react-router-dom';

import styles from './styles/background.module.css';

export function Root() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
