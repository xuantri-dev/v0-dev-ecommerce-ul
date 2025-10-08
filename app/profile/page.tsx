import type { Metadata } from "next"
import { ProfileContent } from "@/components/profile-content"

export const metadata: Metadata = {
  title: "Profile | ATELIER",
  description: "Manage your account and view your order history",
}

export default function ProfilePage() {
  return <ProfileContent />
}
