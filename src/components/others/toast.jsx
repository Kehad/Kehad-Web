import { useEffect, useState } from "react";

const Toast = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 2000); // Auto-close after 2 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed flex items-center justify-between top-[-50px] sm:top-2 right-1 bg-[#DFFEE2]/80 w-[300px] dark:bg-primary/50 text-black dark:text-white px-4 py-2 rounded-lg shadow-lg">
      <span className="text-[14px]">{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          onClose();
        }}
        className="ml-4 bg-white px-2 py-1 h-max rounded text-primary"
      >
        ✖
      </button>
    </div>
  );
};

export default Toast;
