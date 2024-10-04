import { redirect } from "next/navigation";

export function GET() {
    const baseURL = "https://kauth.kakao.com/oauth/authorize";
    const params = {
        client_id: process.env.KAKAO_REST_API_KEY!,
        redirect_uri: process.env.KAKAO_REDIRECT_URI!,
        response_type: "code",
        scope: "profile_nickname,profile_image",
    };
    const formattedParams = new URLSearchParams(params).toString();
    const finalUrl = `${baseURL}?${formattedParams}`;
    return redirect(finalUrl);
}
