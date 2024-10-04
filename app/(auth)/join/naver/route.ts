import { redirect } from "next/navigation";
import crypto from "crypto";

export function GET() {
    const baseURL = "https://nid.naver.com/oauth2.0/authorize";
    const state = crypto.randomBytes(8).toString("hex");
    const params = {
        response_type: "code",
        client_id: process.env.NAVER_CLIENT_ID!,
        redirect_uri: process.env.NAVER_REDIRECT_URI!,
        state,
    };
    const formattedParams = new URLSearchParams(params).toString();
    const finalUrl = `${baseURL}?${formattedParams}`;
    return redirect(finalUrl);
}
