# PRD: 하이엔드 프로젝터 랜딩 페이지 (Project: Visionary)

## 1. 개요 (Overview)
*   **목적:** 40대 IT 애호가를 대상으로 한 하이엔드 프로젝터 홍보 랜딩 페이지.
*   **목표:** 기술적 신뢰도와 사용자 경험(UX)을 극대화한 프론트엔드 기술을 보여주기 위함.
*   **컨셉:** "세팅은 기술에게, 감동은 당신에게." (기술적 정밀함과 심미적 만족의 조화)

## 2. 기술 스택 (Tech Stack)
*   **Framework:** React (Vite 기반)
*   **Language:** TypeScript
*   **Styling:** 일반 CSS (CSS Modules 권장)
*   **Animation:** Framer Motion
*   **Deployment:** Vercel

## 3. 핵심 기능 요구사항 (Functional Requirements)
1.  **반응형 Hero 섹션:** 인터랙티브 요소가 포함된 강렬한 타이포그래피.
2.  **Auto-Keystone 시뮬레이터:** 캔버스/SVG를 활용한 실시간 화면 정렬 인터랙션.
3.  **벽면 색상 보정 비교기:** 슬라이더 기반의 전/후 비교 인터페이스.
4.  **스마트 홈 연동 모듈:** 가상 IoT 기기 제어 시나리오(조명, 커튼 등).
5.  **성능 지표 표시:** 페이지 하단 'Build Info' 메타데이터 출력.

## 4. 디자인 시스템 (Design System)
*   **Color Palette:**
    *   배경: `#0A0A0A` (Deep Obsidian)
    *   주조: `#F5F5F5` (Alabaster White)
    *   강조: `#00FF9D` (Cyber Mint)
*   **Typography:**
    *   강조용: `Inter` (Bold)
    *   본문용: `JetBrains Mono` (Monospace - 개발자 감성)

## 5. 섹션 구성 (Structure)
| 순서 | 섹션 | 핵심 요소 | 목적 |
| :--- | :--- | :--- | :--- |
| 1 | Hero | 헤드라인, CTA, 시스템 인디케이터 | 첫인상 및 정체성 정의 |
| 2 | Problem | 고통 포인트(설치 스트레스) 흑백 시각화 | 타겟 공감대 형성 |
| 3 | Feature 01 | Auto Keystone 보정 모션 | 기술력(AI 보정) 증명 |
| 4 | Feature 02 | 슬라이더 기반 색상 보정 비교 | 실용성 및 인테리어 조화 |
| 5 | Feature 03 | IoT 동기화 시나리오 대시보드 | 스마트홈 생태계 이해도 과시 |
| 6 | Tech Specs | JSON 데이터 기반 사양 카드 | 하드웨어의 정밀성 강조 |
| 7 | Footer | 연락처 및 프로젝트 정보 | 최종 상담/구매 유도 |

## 6. 모션 및 인터랙션 전략
*   **Entry:** 섹션별 `Slide-up` 인터랙션 적용.
*   **Hover:** 카드 섹션 `Lift` 효과 및 Cyber Mint 테두리 강조.
*   **Scroll:** `Sticky` 포지션을 이용한 프로젝터 본체 고정 및 파트별 하이라이트.
*   **Click:** CTA 클릭 시 블러 처리된 모달 팝업.

## 7. 모바일 대응 가이드
*   **Layout:** 데스크탑 분할 구조 → 모바일 수직 스택(Stack) 배열.
*   **UX:** 슬라이더 핸들 크기 48px 이상 확보, 버튼 하단 고정(Bottom-Fixed).
*   **Performance:** 3D 모델 대신 이미지 시퀀스 활용으로 로딩 속도 최적화.

## 8. 어필 포인트
*   **상태 관리:** React의 상태를 이용한 UI/UX 제어 과정 강조.
*   **최적화:** Lighthouse 95점 이상 달성 및 성능 최적화 근거 제시.
*   **데이터 정교함:** 스마트 홈 연동 시나리오를 데이터 기반(JSON)으로 설계하여 백엔드와의 통합 가능성 시사.