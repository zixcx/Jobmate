// ./lib/auth/socialAuth.ts
import { redirect } from "next/navigation";

class SocialAuth {
    async getKakaoToken(code: string): Promise<string> {
        const tokenParams = new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.KAKAO_REST_API_KEY!,
            redirect_uri: process.env.KAKAO_REDIRECT_URI!,
            code,
        });

        const tokenUrl = `https://kauth.kakao.com/oauth/token`;
        const tokenResponse = await fetch(tokenUrl, {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8",
            },
            body: tokenParams.toString(),
        });

        const { error, access_token } = await tokenResponse.json();

        if (error) {
            return redirect("/");
        }
        return access_token;
    }

    async getNaverToken(code: string, state: string): Promise<string> {
        const tokenParams = new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.NAVER_CLIENT_ID!,
            client_secret: process.env.NAVER_CLIENT_SECRET!,
            code,
            state,
        });

        const tokenUrl = `https://nid.naver.com/oauth2.0/token`;
        const tokenResponse = await fetch(tokenUrl, {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8",
            },
            body: tokenParams.toString(),
        });

        const { error, access_token } = await tokenResponse.json();

        if (error) {
            return redirect("/");
        }
        return access_token;
    }
}

const socialAuth = new SocialAuth();

export default socialAuth;
