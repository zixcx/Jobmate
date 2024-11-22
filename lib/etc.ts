export function calculateAge(birthYear: number): number {
    if (isNaN(birthYear) || birthYear <= 0) {
        return -1; // 기본값 반환
    }
    const currentYear = new Date().getFullYear(); // 현재 연도 가져오기
    return currentYear - birthYear + 1; // 나이 계산
}
