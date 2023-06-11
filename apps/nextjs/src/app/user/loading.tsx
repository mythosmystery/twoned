import { RingLoader } from "react-spinners";
import { CenterLayout } from "@/layouts/center";

const Loading = () => {
  return (
    <CenterLayout>
      <h1 className="text-4xl font-thin">Loading...</h1>
      <RingLoader size={100} className="my-32" />
    </CenterLayout>
  );
};

export default Loading;
