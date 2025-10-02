# CLAUDE.md

## 프로젝트 개요
꿈을 짓는 학교 사회적협동조합의 소개 웹사이트를 Next.js로 개발한 프로젝트입니다. 교육 프로그램 관리, 회원 시스템, 크루 봉사자 커뮤니티를 제공하는 종합 플랫폼입니다.


  - 시설이용

### 🎨 UI/UX 컴포넌트

#### 레이아웃 컴포넌트
- **Header**: 반응형 네비게이션 바
- **Footer**: 사이트맵 및 연락처 정보

#### UI 컴포넌트
- **AlertModal**: 알림 메시지 표시
- **ConfirmModal**: 확인/취소 다이얼로그
- **AnimatedHeroText**: 타이핑 애니메이션 텍스트
- **ProgramImageCarousel**: 이미지 슬라이더
- **HomeImageGallery**: 홈 이미지 갤러리
- **InfiniteScrollGallery**: 무한 스크롤 갤러리
- **FloatingButtons**: 플로팅 액션 버튼
- **CustomCursor**: 커스텀 마우스 커서
- **ThemeSelector**: 테마 선택기

#### 폼 컴포넌트
- **ApplicationModal**: 프로그램 신청 모달
- **GeneralInquirySection**: 일반 문의 폼
- **DonationInquirySection**: 후원 문의 폼

## 기술 스택

### 프레임워크 및 라이브러리
- **Next.js 15.1.3**: React 기반 풀스택 프레임워크
- **React 19**: UI 라이브러리
- **TypeScript 5**: 정적 타입 지원
- **Tailwind CSS 3.4**: 유틸리티 기반 CSS
- **shadcn/ui**: 재사용 가능한 UI 컴포넌트

### 주요 패키지
- **@radix-ui**: 접근성 있는 UI 프리미티브
- **lucide-react**: 아이콘 라이브러리
- **clsx**: 조건부 클래스명 유틸리티
- **date-fns**: 날짜 포맷팅
- **embla-carousel**: 캐러셀 컴포넌트
- **framer-motion**: 애니메이션 라이브러리
- **react-intersection-observer**: 스크롤 감지

## 데이터 관리

### 데이터베이스, 스토리지
 - Supabase dreaming-school 프로젝트

### 데이터 타입 (TypeScript)
```typescript
// 주요 인터페이스
- Program: 교육프로그램
- User: 사용자 정보
- News: 소식/공지사항
- Contact: 문의 정보
- CrewApplication: 크루 신청
- CrewPost: 크루 게시글
- Member: 회원 정보
- HistoryItem: 연혁 항목
```

## 인증 시스템
- 기본적으로 관리자 외에 인증시스템 없음, 관리자 계정도 supabase 테이블로 관리할 예정
- supabase auth를 사용하려는건 아님
### 관리자 계정
- 이메일: admin@dreamschool.or.kr
- 비밀번호: admin123!

## 프로젝트 구조
```
src/
├── app/                      # Next.js App Router
│   ├── page.tsx             # 홈페이지
│   ├── about/               # ABOUT 페이지
│   ├── programs/            # 교육프로그램
│   │   └── [id]/           # 프로그램 상세
│   ├── news/                # 소식 및 공지
│   ├── contact/             # 문의하기
│   ├── crew-application/    # 크루 신청
│   └── admin/               # 관리자 페이지
│       ├── page.tsx         # 대시보드
│       ├── login/           # 관리자 로그인
│       ├── crew-management.tsx
│       ├── inquiry-management.tsx
│       ├── media-management.tsx
│       ├── members-management.tsx
│       └── news-management.tsx
├── components/              # 재사용 컴포넌트
│   ├── ui/                  # UI 컴포넌트
│   ├── layout/              # 레이아웃
│   ├── themes/              # 테마별 컴포넌트
│   ├── programs/            # 프로그램 관련
│   ├── contact/             # 문의 관련
│   └── auth/                # 인증 관련
├── contexts/                # React Context
│   └── ThemeContext.tsx    # 테마 관리
├── hooks/                   # 커스텀 훅
│   ├── useAuth.ts          # 사용자 인증
│   ├── useAdminAuth.ts     # 관리자 인증
│   ├── useAlert.ts         # 알림 시스템
│   └── useConfirm.ts       # 확인 다이얼로그
├── lib/                     # 유틸리티
│   ├── utils.ts            # 공통 유틸
│   ├── auth.ts             # 인증 로직
│   ├── mock-data.ts        # 목 데이터
│   ├── admin-mock-data.ts  # 관리자 목 데이터
│   ├── program-images.ts   # 프로그램 이미지
│   └── home-images.ts      # 홈 이미지
└── types/                   # TypeScript 타입
    └── index.ts            # 타입 정의
```

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

## Supabase MCP
- Supabase MCP 연결되어있음
- dreaming-school프로젝트가 현재 프로젝트 데이터베이스. 프로젝트
- 스토리지, 데이터베이스 전부 슈퍼베이스로 구현 할. ㅖ정

