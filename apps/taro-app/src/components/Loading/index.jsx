// components/Loading/index.jsx
import styles from './index.module.scss';
export default function Loading() {
  return (
    <div className={styles['loading-wrap']}>
      <div className={styles.spinner} />
      <p>加载中...</p>
    </div>
  );
}
