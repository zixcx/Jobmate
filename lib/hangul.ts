function isIncludeChosungStr(word: string): boolean {
    // 초성을 나타내는 한글 자음 배열
    const hangul: string[] = [
        "ㄱ",
        "ㄲ",
        "ㄴ",
        "ㄷ",
        "ㄸ",
        "ㄹ",
        "ㅁ",
        "ㅂ",
        "ㅃ",
        "ㅅ",
        "ㅆ",
        "ㅇ",
        "ㅈ",
        "ㅉ",
        "ㅊ",
        "ㅋ",
        "ㅌ",
        "ㅍ",
        "ㅎ",
    ];

    // 문자열에서 초성이 하나라도 포함되어 있는지 확인하기
    for (const char of word) {
        if (hangul.includes(char)) {
            return true; // 초성이 발견되면 true 반환
        }
    }

    return false; // 초성이 없으면 false 반환
}
