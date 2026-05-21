# Visionary - Premium Projector Landing Page

하이엔드 프리미엄 프로젝터 **"Visionary"**의 브랜드 가치와 압도적인 기술력을 보여주기 위해 제작된 인터랙티브 랜딩 페이지입니다.

## 🚀 프로젝트 특징

- **시네마틱 인터랙션**: Framer Motion을 적극 활용한 핀 스크롤(Pinned Scroll)과 스크롤 진행도에 맞춘 패럴랙스 애니메이션으로 제품의 몰입감을 극대화했습니다.
- **다이나믹 3D 시각 효과**: Three.js/WebGL 기반의 하이퍼스피드(Hyperspeed) 효과 및 반응형 네온 글로우 배경을 통해 미래지향적이고 고급스러운 비주얼을 제공합니다.
- **반응형(Responsive) UX 최적화**: 
  - 데스크탑에서는 압도적인 핀 스크롤 애니메이션을 제공합니다.
  - 모바일 기기(1024px 이하)에서는 과도한 스크롤 애니메이션으로 인한 사용자 피로도를 줄이고, 핵심 콘텐츠를 즉시 확인할 수 있도록 모든 컴포넌트가 최적화된 정적 레이아웃으로 렌더링됩니다.
- **커스텀 디테일**: 영화관의 감성을 담은 커스텀 커서, 필름 노이즈 텍스처(Film Grain), 블러 비네팅 등을 통해 프리미엄 웹 경험을 완성했습니다.

## 🛠 기술 스택

- **Core**: React 18, TypeScript, Vite
- **Styling**: Vanilla CSS (CSS Modules), CSS Variables
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (`gh-pages`)

## 📁 주요 기능 및 컴포넌트

- **Hero (`Hero.tsx`)**: 마우스 위치에 반응하여 입체적으로 움직이는 3D 타이포그래피와 하이퍼스피드 배경이 결합된 강렬한 도입부
- **Problem (`Problem.tsx`)**: 기존 프로젝터 세팅의 번거로움을 표현하기 위해, 스크롤을 내릴수록 화면이 심하게 찌그러지는(Skew & Rotate) 인터랙션
- **Feature Keystone (`FeatureKeystone.tsx`)**: 단 2초 만에 비뚤어진 화면이 자동 보정되는 '오토 키스톤' 기술을 시뮬레이터 형태로 구현
- **Feature Color (`FeatureColor.tsx`)**: 벽면 색상에 맞춰 화이트 밸런스를 자동으로 조절하는 비포/애프터 스크롤 스와이프 비교 기능
- **Feature IoT (`FeatureIot.tsx`)**: IoT 연동으로 주변 조명과 스마트 기기들이 일제히 시네마 모드로 전환되는 과정을 단계별로 시각화
- **TechSpecs (`TechSpecs.tsx`)**: 주요 스펙 정보를 제공하며, 마우스 움직임에 따라 카드를 비추는 조명(Spotlight) 효과 적용

## 💻 로컬 실행 방법

```bash
# 1. 패키지 설치
npm install

# 2. 로컬 개발 서버 실행 (localhost:5173)
npm run dev
```

## 🌐 배포 (Deploy)

현재 이 프로젝트는 GitHub Pages를 통해 배포되도록 세팅되어 있습니다.
```bash
npm run deploy
```

## 📝 주요 트러블슈팅 및 개발 노트

- **모바일 가로 스크롤 이슈 해결**: 모바일에서 화면 밖으로 삐져나가는 요소들을 가리기 위해 최상위에 `overflow-x: hidden`을 주면 데스크탑에서 `position: sticky`가 고장 나는 브라우저 버그가 있습니다. 이를 `overflow-x: clip`으로 대체하여 스크롤 핀과 가로 여백을 동시에 완벽하게 해결했습니다.
- **Framer Motion 리사이즈 크래시 해결**: 창 크기를 조절하여 데스크탑과 모바일 모드를 오갈 때, 동적인 `MotionValue`와 정적인 고정값이 충돌하여 화면이 하얗게 뻗는 현상을 방지하기 위해 상위 트리(`App.tsx`)에서 뷰포트 변경 시 컴포넌트를 강제 리마운트(Remount) 하도록 설계되었습니다. 이를 통해 애니메이션 스크롤 값 오류를 완벽하게 초기화합니다.
