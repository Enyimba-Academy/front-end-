import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Create portal root if it doesn't exist
    let portalRoot = document.getElementById("portal");
    if (!portalRoot) {
      portalRoot = document.createElement("div");
      portalRoot.setAttribute("id", "portal");
      document.body.appendChild(portalRoot);
    }

    setMounted(true);

    return () => {
      setMounted(false);
      // Don't remove the portal root as it might be used by other components
    };
  }, []);

  return mounted
    ? createPortal(children, document.getElementById("portal"))
    : null;
};

export default Portal;
