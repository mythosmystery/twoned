import { CreateProfileForm } from "@/components/forms/create-profile";
import { HorizontalCenterLayout } from "@/layouts/horizontal-center";
import { auth } from "@clerk/nextjs";
import { getSpotifyToken } from "@/utils/auth";
import Image from "next/image";

const ProfileCreatePage = async () => {
  const { userId } = auth();
  const token = await getSpotifyToken(userId!);

  const res = await fetch("https://api.spotify.com/v1/me/tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 10,
    },
  });
  const { items } = (await res.json()) as { items: any[] };

  const albumImages = items.map((item: any) => item.track.album.images[1].url);

  return (
    <HorizontalCenterLayout>
      <CreateProfileForm albumImages={albumImages} />
    </HorizontalCenterLayout>
  );
};

export default ProfileCreatePage;
