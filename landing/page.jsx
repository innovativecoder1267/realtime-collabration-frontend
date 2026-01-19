
// // pages/index.js ya kisi parent page me
// import dynamic from "next/dynamic";

// const Landing = dynamic(() => import('../components/landingpage'), { ssr: false });
import Landing from "../components/landingpage";
export default function Page() {
  return <Landing />;
}