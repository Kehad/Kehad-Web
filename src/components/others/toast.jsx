import { useEffect, useState } from "react";

const Toast = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 1000); // Auto-close after 1 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-2 right-5 bg-[#DFFEE2] dark:bg-primary/50 text-black dark:text-white px-4 py-2 rounded-lg shadow-lg">
      <span>{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          onClose();
        }}
        className="ml-4 bg-white px-2 py-1 rounded text-primary"
      >
        ✖
      </button>
    </div>
  );
};

export default Toast;
