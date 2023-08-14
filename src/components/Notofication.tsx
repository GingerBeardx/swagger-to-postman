import { useEffect, useState } from "react";

interface NotifcationProps {
  children: any;
  type: "error" | "success";
}

const Notification: React.FC<NotifcationProps> = ({ children, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // 10000 milliseconds = 10 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return isVisible ? (
    <div
      className={`${
        type === "error" ? "text-amber-400" : "text-green-200"
      } p-2 rounded-md text-center`}
    >
      {children}
    </div>
  ) : null;
};

export default Notification;
