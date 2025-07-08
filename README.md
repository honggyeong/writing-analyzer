# 📝 나만의 글쓰기 분석기

고등학생을 위한 AI 기반 글쓰기 분석 도구입니다. 자신이 쓴 글의 수준을 객관적으로 평가하고 개선 방향을 제시합니다.

## ✨ 주요 기능

### 📊 종합 분석
- **어휘 다양성**: 다양한 단어 사용도 측정
- **문장 길이**: 적절한 문장 길이 평가 (8-15단어 권장)
- **표현력**: 감정 표현과 비유적 표현 분석
- **논리성**: 논리적 연결어 사용도 측정
- **창의성**: 독창적 표현과 질문 사용도 평가

### 🎯 맞춤 조언
- 분석 결과에 따른 개인화된 개선 제안
- 실용적인 글쓰기 팁 제공
- 등급별 평가 (A+, A, B+, B, C, D)

### 📈 시각화
- 막대 차트를 통한 직관적인 점수 표시
- 실시간 단어/문장 수 카운터
- 반응형 디자인으로 모바일 지원

## 🚀 시작하기

### 필수 요구사항
- Node.js (버전 14 이상)
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/[your-username]/writing-analyzer.git
cd writing-analyzer

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 앱을 확인하세요.

### 빌드

```bash
npm run build
```

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **차트**: Recharts
- **아이콘**: Lucide React
- **스타일링**: Tailwind CSS
- **개발 도구**: Create React App

## 📁 프로젝트 구조

```
writing-analyzer/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── WritingAnalyzer.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 분석 기준

### 어휘 다양성
- 고유 단어 수 / 전체 단어 수 비율 계산
- 다양한 어휘 사용을 권장

### 문장 길이
- 평균 8-15단어: 최고 점수
- 평균 5-20단어: 보통 점수
- 그 외: 낮은 점수

### 표현력
- 감정 표현 단어 감지
- 비유적 표현 (같다, 마치, 처럼 등)
- 강조 표현 (정말, 매우, 아주 등)

### 논리성
- 논리적 접속사 사용도
- 문장 간 연결성 평가

### 창의성
- 창의적 표현 단어
- 의문문/감탄문 사용
- 독창적 표현

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.

---

**개발자**: [Your Name]  
**버전**: 1.0.0  
**최종 업데이트**: 2024년 