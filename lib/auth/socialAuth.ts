import { redirect } from "next/navigation";

class SocialAuth {
    async getKakaoToken(
        code: string
    ): Promise<{ access_token?: string; error?: string }> {
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 반환 타입 변경
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

        const tokenData = await tokenResponse.json(); // 응답 객체를 JSON으로 파싱

        if (tokenData.error) {
            console.error("Error getting Kakao token:", tokenData.error);
            return { error: tokenData.error }; // 에러가 있으면 에러 객체 반환
        }

        return { access_token: tokenData.access_token }; // access_token 반환
    }

    async getNaverToken(
        code: string,
        state: string
    ): Promise<{ access_token?: string; error?: string }> {
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 반환 타입 변경
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

        const tokenData = await tokenResponse.json(); // 응답 객체를 JSON으로 파싱

        if (tokenData.error) {
            console.error("Error getting Naver token:", tokenData.error);
            return { error: tokenData.error }; // 에러가 있으면 에러 객체 반환
        }

        return { access_token: tokenData.access_token }; // access_token 반환
    }
}

const socialAuth = new SocialAuth();

export default socialAuth;
