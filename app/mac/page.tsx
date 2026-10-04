import type { Metadata } from "next";
import MacDesktop from "@/components/mac/mac-desktop";

export const metadata: Metadata = {
  title: "Dharmendra | macOS Desktop Portfolio",
  description:
    "The portfolio reimagined as a macOS desktop — draggable windows, a magnifying dock, Spotlight search, a working terminal and Quick Look.",
};

const MacPage = () => {
  return <MacDesktop />;
};

export default MacPage;
