
import Dashboard from "@/app/(main)/dashboard/dashboard";

import { cookies } from "next/headers";
async function Page() {
  const cookieStore = await cookies()
  let token = cookieStore.get("token")
  return <><Dashboard token={token}/></>
}

export default Page;
