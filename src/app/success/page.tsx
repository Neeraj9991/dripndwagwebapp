// app/success/page.tsx
import dynamic from "next/dynamic";

const SuccessPageClient = dynamic(() => import("./SuccessPageClient"), {
  ssr: false,
});

export default function SuccessPage() {
  return <SuccessPageClient />;
}
