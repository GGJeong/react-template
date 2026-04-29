## 📁 프로젝트 구조

```
src/
├── App.tsx                          # 페이지 라우팅 진입점
├── index.tsx                        # React 앱 마운트
│
├── api/                             # API 레이어
│   ├── generated/                   # swagger-typescript-api로 자동 생성된 API 코드
│   └── instance/
│       └── axiosInstance.ts         # Axios 공통 인스턴스 및 인터셉터 설정
│
├── features/                        # 기능(도메인)별 모듈
│   │                                # 각 기능에 필요한 모든 파일을 해당 폴더 안에서 관리
│   │
│   ├── dashboard/                   # 대시보드 기능
│   │   ├── components/              # 대시보드 UI 컴포넌트
│   │   │   └── DashboardPage.tsx    # 통계 카드 및 최근 주문 목록 페이지
│   │   ├── hooks/                   # 대시보드 전용 커스텀 훅
│   │   │   └── useDashboard.ts      # 대시보드 데이터 fetching 및 상태 관리
│   │   ├── services/                # 대시보드 API 호출 함수
│   │   │   └── dashboardService.ts  # fetchDashboardData (목업 → 실 API 교체 예정)
│   │   └── types/                   # 대시보드 전용 타입 정의
│   │       └── index.ts             # StatCard, RecentOrder, DashboardData
│   │
│   ├── mqtt/                        # MQTT 클라이언트 기능
│   │   └── components/              # MQTT UI 컴포넌트
│   │       └── MqttPage.tsx         # 브로커 연결, 구독, 발행, 메시지 로그
│   │
│   └── auth/                        # 인증 기능
│       ├── components/              # 로그인 폼 등 인증 관련 컴포넌트 (추가 예정)
│       └── store/                   # 인증 상태 관리
│           └── authStore.ts         # AuthContext, useAuth 훅
│
└── shared/                          # 기능 간 공유 모듈
    │                                # features/ 폴더끼리 직접 참조 대신 이곳을 통해 공유
    │
    ├── components/
    │   ├── ui/                      # 재사용 가능한 기본 UI 컴포넌트
    │   │   ├── Button.tsx           # variant(primary/secondary/danger), size(sm/md/lg) 지원
    │   │   └── Card.tsx             # 공통 카드 레이아웃 컨테이너
    │   └── layout/                  # 앱 전체 레이아웃 골격
    │       ├── Header.tsx           # 상단 헤더 (검색, 알림, 프로필)
    │       ├── Sidebar.tsx          # 좌측 내비게이션 메뉴
    │       └── MainLayout.tsx       # Header + Sidebar + 콘텐츠 영역 조합
    │
    ├── hooks/                       # 공통 커스텀 훅 (추가 예정)
    │
    ├── utils/                       # 공통 유틸리티 함수
    │   └── formatDate.ts            # formatDate (날짜 포맷), formatCurrency (원화 포맷)
    │
    ├── constants/                   # 앱 전역 상수
    │   └── routes.ts                # ROUTES 객체 (페이지 경로 상수 모음)
    │
    ├── types/                       # 전역 공통 타입 (추가 예정)
    │
    └── assets/                      # 정적 리소스
        ├── icons/                   # SVG 아이콘 컴포넌트 (IconBell, IconSearch 등)
        ├── images/                  # 이미지 파일 (logo.svg, placeholder.svg)
        └── fonts/                   # 폰트 CSS
```