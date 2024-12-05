// ./app/owner/profile/page.tsx

import OwnerInteractiveProfile from "@/components/Profile/owner/OwnerInteractiveProfile";
import { getProfileData } from "./action";

export default async function OwnerProfile() {
    // Fetch data on the server side
    const user = await getProfileData();

    // function delay(ms: number) {
    //     return new Promise((resolve) => setTimeout(resolve, ms));
    // }

    // // Usage in your server component:
    // await delay(10000);

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border">
                <div className="md:flex">
                    {/* Pass the fetched data to the client component */}
                    <OwnerInteractiveProfile user={user} />
                </div>
            </div>
        </div>
    );
}
