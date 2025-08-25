// app/profile/page.tsx
/*import { cookies } from "next/headers";
import ProfilePage from "./Profile";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const refresh = cookies().get("refresh_token")?.value;

  if (!refresh) {
    return redirect("/login");
  }

  const user = 

  // Серверный компонент возвращает клиентский как обычный JSX
  return <ClientProfile user={user} />;
}
*/