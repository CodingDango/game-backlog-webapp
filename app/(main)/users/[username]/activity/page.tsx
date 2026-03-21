'use client'

import { useParams } from "next/navigation";

export default function ActivityPage() {
  const { username } = useParams<{ username: string }>();  

  return (
    <div>{username}&apos;s activity page</div>
  )
}
