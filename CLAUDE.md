# CLAUDE.md

## 프로젝트 개요
꿈을 짓는 학교 사회적협동조합의 소개 웹사이트를 Next.js로 개발합니다.

## 사이트 구조
1. **ABOUT** - 꿈을짓는학교는?
2. **교육프로그램** - 제공하는 교육과정 및 프로그램 소개
3. **연혁** - 조합의 설립 과정 및 주요 이력
4. **소식 및 공지** - 최신 소식과 공지사항
5. **오시는길** - 위치 정보 및 교통편 안내
6. **문의** - 일반 문의 및 후원 문의
7. **회원가입** - 조합원 가입 신청

## 기술 스택
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **상태관리**: React useState/useEffect + localStorage
- **데이터**: Mock data (localStorage 활용)
- **배포**: Vercel (추후)

## 개발 방식
- Backend 개발 없이 frontend 우선 구현
- localStorage를 활용한 mock data 관리
- 반응형 웹 디자인 적용
- 접근성 및 SEO 최적화

## 주요 기능
- 교육프로그램 조회 및 신청
- 소식/공지사항 관리 (CRUD)
- 회원가입 폼 (localStorage 저장)
- 문의 폼 (localStorage 저장)
- 반응형 네비게이션
- 다크모드 지원 (선택사항)

## 프로젝트 구조
```
src/
├── app/
│   ├── about/
│   ├── programs/
│   ├── history/
│   ├── news/
│   ├── location/
│   ├── contact/
│   └── signup/
├── components/
│   ├── ui/ (shadcn/ui)
│   ├── layout/
│   └── shared/
├── lib/
│   ├── utils.ts
│   └── mock-data.ts
└── types/
    └── index.ts
```

## 데이터 관리
- Mock data는 `lib/mock-data.ts`에서 관리
- localStorage를 통한 사용자 입력 데이터 저장
- TypeScript 인터페이스로 데이터 타입 정의

## 개발 우선순위
1. 기본 레이아웃 및 네비게이션
2. 정적 페이지 (ABOUT, 연혁, 오시는길)
3. 동적 페이지 (교육프로그램, 소식/공지)
4. 폼 페이지 (문의, 회원가입)
5. 반응형 최적화 및 스타일링

## 디자인 시스템

### 컬러 팔레트
꿈을 짓는 학교의 가치와 교육기관의 신뢰성을 표현하는 블루 계열 컬러 시스템:

#### Primary Colors (메인 컬러)
- **Logo Blue**: `bg-blue-700` `#1d4ed8` - 로고 메인 컬러, 신뢰와 전문성
- **Deep Navy**: `bg-blue-900` `#1e3a8a` - 헤더, 푸터, 강조 요소
- **Light Sky**: `bg-blue-100` `#dbeafe` - 배경, 카드 섹션

#### Secondary Colors (보조 컬러)
- **Warm Gold**: `bg-amber-400` `#fbbf24` - 꿈과 희망을 상징하는 포인트 컬러
- **Soft Green**: `bg-emerald-500` `#10b981` - 성장과 발전을 나타내는 액센트
- **Coral Pink**: `bg-rose-400` `#fb7185` - 따뜻함과 친근함을 표현

#### Neutral Colors (중성 컬러)
- **Pure White**: `bg-white` `#ffffff`
- **Light Gray**: `bg-gray-50` `#f9fafb`
- **Medium Gray**: `bg-gray-200` `#e5e7eb`
- **Dark Gray**: `bg-gray-700` `#374151`
- **Charcoal**: `bg-gray-900` `#111827`

### 타이포그래피

#### 헤딩 스타일
```css
/* H1 - 페이지 메인 타이틀 */
.heading-1 {
  @apply text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6;
}

/* H2 - 섹션 헤딩 */
.heading-2 {
  @apply text-3xl md:text-4xl font-semibold text-blue-800 leading-snug mb-4;
}

/* H3 - 서브섹션 헤딩 */
.heading-3 {
  @apply text-2xl md:text-3xl font-medium text-blue-700 leading-normal mb-3;
}

/* H4 - 카드/컴포넌트 제목 */
.heading-4 {
  @apply text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-2;
}
```

#### 본문 텍스트
```css
/* 기본 본문 */
.body-text {
  @apply text-base md:text-lg text-gray-700 leading-relaxed;
}

/* 작은 텍스트 */
.text-small {
  @apply text-sm text-gray-600 leading-normal;
}

/* 강조 텍스트 */
.text-emphasis {
  @apply text-lg font-medium text-blue-700;
}
```

### 컴포넌트 스타일

#### 버튼 스타일
```css
/* 주요 액션 버튼 */
.btn-primary {
  @apply bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-lg 
         transition-colors duration-200 shadow-md hover:shadow-lg;
}

/* 보조 버튼 */
.btn-secondary {
  @apply bg-white hover:bg-gray-50 text-blue-700 font-medium px-6 py-3 rounded-lg 
         border-2 border-blue-700 transition-colors duration-200;
}

/* 부드러운 액션 버튼 */
.btn-soft {
  @apply bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-6 py-3 rounded-lg 
         transition-colors duration-200;
}
```

#### 카드 스타일
```css
/* 기본 카드 */
.card {
  @apply bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 
         border border-gray-100 p-6;
}

/* 강조 카드 */
.card-featured {
  @apply bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md 
         border border-blue-200 p-8;
}

/* 프로그램 카드 */
.card-program {
  @apply bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 
         border border-gray-100 overflow-hidden;
}
```

#### 입력 필드
```css
/* 텍스트 입력 필드 */
.input-field {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
         focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200;
}

/* 텍스트영역 */
.textarea-field {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
         focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 
         resize-vertical min-h-32;
}
```

### 레이아웃 원칙

#### 컨테이너 및 그리드
```css
/* 메인 컨테이너 */
.container-main {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* 섹션 패딩 */
.section-padding {
  @apply py-16 md:py-24;
}

/* 카드 그리드 */
.card-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8;
}
```

#### 네비게이션
```css
/* 헤더 네비게이션 */
.nav-header {
  @apply bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50;
}

/* 네비게이션 링크 */
.nav-link {
  @apply text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200 
         px-3 py-2 rounded-md hover:bg-blue-50;
}

/* 활성 네비게이션 링크 */
.nav-link-active {
  @apply text-blue-700 bg-blue-50 font-medium px-3 py-2 rounded-md;
}
```

### 상호작용 및 애니메이션

#### 호버 효과
```css
/* 카드 호버 효과 */
.hover-lift {
  @apply transition-all duration-300 hover:-translate-y-1 hover:shadow-lg;
}

/* 버튼 호버 효과 */
.hover-scale {
  @apply transition-transform duration-200 hover:scale-105;
}
```

#### 페이드 인 애니메이션
```css
.fade-in {
  @apply opacity-0 translate-y-4 transition-all duration-500;
}

.fade-in-visible {
  @apply opacity-100 translate-y-0;
}
```

### 접근성 가이드라인

#### 포커스 상태
```css
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}
```

#### 색상 대비
- 모든 텍스트는 WCAG 2.1 AA 기준 4.5:1 이상의 대비율 유지
- 중요한 정보는 색상뿐만 아니라 아이콘이나 텍스트로도 전달

#### 반응형 디자인
- 모바일 우선 접근법 (Mobile-first)
- 주요 브레이크포인트: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- 터치 대상 크기 최소 44px x 44px 유지

### 브랜드 가치 표현 요소

#### 꿈과 희망 (Visual Elements)
- 그라데이션 배경: `bg-gradient-to-r from-blue-400 to-blue-700`
- 별 아이콘과 구름 모티브 활용
- 부드러운 곡선과 라운드 코너 (`rounded-xl`, `rounded-2xl`)

#### 신뢰성과 전문성
- 깔끔한 레이아웃과 충분한 여백
- 일관된 타이포그래피 계층
- 안정적인 네비게이션 구조

#### 공동체적 가치
- 따뜻한 색상 조합 (블루 + 골드)
- 사람 중심의 이미지와 아이콘
- 원형 프로필 이미지: `rounded-full`

## 명령어
- 개발 서버: `npm run dev`
- 빌드: `npm run build`
- 린트: `npm run lint`
- 타입 체크: `npm run type-check` (추가 설정 필요)