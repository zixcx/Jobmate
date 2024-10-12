export function calculateAge(birthYear: number): number {
    const currentYear = new Date().getFullYear(); // 현재 연도 가져오기
    return currentYear - birthYear + 1; // 나이 계산
}
