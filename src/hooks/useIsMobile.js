import { useState, useEffect } from "react";

export function useIsMobile(MOBILE_BREAKPOINT = 768) {
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(mql.matches);
    };

    // set initial value
    onChange();

    // listen for changes
    mql.addEventListener("change", onChange);

    // cleanup
    return () => mql.removeEventListener("change", onChange);
  }, [MOBILE_BREAKPOINT]);

  return !!isMobile;
}
