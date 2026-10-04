import type { Metadata } from "next";
import IPhoneShell from "@/components/iphone/iphone-shell";

export const metadata: Metadata = {
  title: "Dharmendra | iOS Portfolio",
  description:
    "The portfolio as an iPhone — home screen widgets, app icons, swipeable pages and iOS navigation. Built for mobile.",
};

const IPhonePage = () => {
  return <IPhoneShell />;
};

export default IPhonePage;
