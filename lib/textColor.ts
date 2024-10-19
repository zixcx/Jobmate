// colorUtils.ts
export function hexToRgb(hex: string) {
    let r = 0,
        g = 0,
        b = 0;

    // 3 자리 HEX 지원
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 자리 HEX 지원
    else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }

    return { r, g, b };
}

export function getContrastYIQ(hex: string) {
    const { r, g, b } = hexToRgb(hex);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness >= 128 ? "black" : "white"; // 밝으면 검정, 어두우면 흰색
}
