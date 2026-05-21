// 부드럽고 천천히 이동하는 커스텀 스크롤 애니메이션 함수
export const smoothScrollTo = (targetId: string, duration: number = 2500) => {
  const targetElement = targetId === 'top' ? document.body : document.getElementById(targetId);
  if (!targetElement) return;

  const targetPosition = targetId === 'top' ? 0 : targetElement.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  // Easing function (easeInOutCubic)
  // 천천히 출발해서 중간에 빨라졌다가 다시 천천히 멈춤
  const ease = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  };

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    
    window.scrollTo(0, run);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition); // 오차 보정
    }
  };

  requestAnimationFrame(animation);
};
