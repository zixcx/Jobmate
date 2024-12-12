// ./app/owner/profile/loading.tsx
import {
    PhoneIcon,
    UserGroupIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function LoadingOwnerProfile() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border">
                <div className="md:flex">
                    <div className="md:flex-shrink-0 bg-neutral-800 text-white p-8 flex flex-col items-center justify-center">
                        <div className="relative">
                            <div className="w-40 h-40 rounded-full bg-neutral-600 animate-pulse" />
                        </div>
                        <div className="flex justify-center items-center mt-6 relative">
                            <div className="h-9 w-48 md:w-28 bg-neutral-600 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div className="p-8 md:flex-grow">
                        <div className="flex justify-between mb-6">
                            <div className="h-8 w-16 bg-neutral-200 rounded animate-pulse"></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center text-neutral-600 gap-4">
                                    <UserGroupIcon className="size-5 text-neutral-400" />
                                    <div>
                                        <div className="h-4 w-20 bg-neutral-200 rounded mb-2 animate-pulse"></div>
                                        <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="flex items-center text-neutral-600 gap-4">
                                    <PhoneIcon className="size-5 text-neutral-400" />
                                    <div>
                                        <div className="h-4 w-20 bg-neutral-200 rounded mb-2 animate-pulse"></div>
                                        <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-center w-full px-4 py-2 bg-neutral-200 text-neutral-400 rounded-lg animate-pulse">
                            <ArrowRightOnRectangleIcon className="size-5 mr-2 text-neutral-400" />
                            로그아웃
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
