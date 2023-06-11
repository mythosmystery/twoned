import { auth } from "@clerk/nextjs";
import { prisma } from "@/utils";
import { redirect } from "next/navigation";

const FeedPage = async () => {
  const { userId } = auth();
  const user = await prisma.user.findUnique({
    where: { clerkId: userId! },
    include: { profile: true },
  });
  if (!user) redirect("/user/create");
  if (!user.profile) redirect("/user/profile/create");

  return (
    <div>
      <h1>Welcome to feed!</h1>
    </div>
  );
};

export default FeedPage;
