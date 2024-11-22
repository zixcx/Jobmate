// ./lib/validation.ts
export function krPhoneValidation(phone: string) {
    // 정규식 패턴: 01x 또는 지역번호 (02, 03x ~ 09x) 형식 허용
    // const pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    const pattern = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!pattern.test(phone)) return false;
    return true;
}
