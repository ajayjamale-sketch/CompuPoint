import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      const id = hash.replace("#", "");
      // Special check since categories can be set via state
      if (id === "certifications" || id === "services" || id === "career" || id === "education") {
        return; // Features page handles its own hash tabs scrolling
      }
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);
}
