import { useToastStore } from '../store/toastStore';

const icons = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  warning: '⚠️',
};

export function ToastContainer() {
  const { toasts } = useToastStore();

  return (
    <div id="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span className="tico">{icons[t.type]}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
