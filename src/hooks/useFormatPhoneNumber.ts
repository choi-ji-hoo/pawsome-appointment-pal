
import { useCallback } from "react";

export function useFormatPhoneNumber() {
  // 숫자만 남긴 후 한국 휴대폰 포맷 자동 적용
  const formatPhoneNumber = useCallback((input: string) => {
    const digits = input.replace(/\D/g, "");
    if (digits.length < 4) return digits;
    if (digits.length < 8)
      return digits.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    if (digits.length <= 11)
      return digits
        .replace(/(\d{3})(\d{3,4})(\d{1,4})/, "$1-$2-$3")
        .slice(0, 13);
    return digits
      .slice(0, 11)
      .replace(/(\d{3})(\d{3,4})(\d{1,4})/, "$1-$2-$3");
  }, []);
  return formatPhoneNumber;
}
