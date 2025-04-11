// app/profile/page.tsx
import dynamic from "next/dynamic";

const ProfileClient = dynamic(() => import("./ProfilePageClient"), {
  ssr: false,
});

export default function ProfilePage() {
  return <ProfileClient />;
}
