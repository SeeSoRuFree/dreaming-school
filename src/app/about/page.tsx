export default function AboutPage() {
  const coreValues = [
    { title: '양선', description: '우리는 모든 교육과정, 내부운영과정을 선한 양심으로 운영하겠습니다.' },
    { title: '공정', description: '우리는 참여하고 공정과 과정을 중요시하며 항상 수준의 전문성을 유지하겠습니다.' },
    { title: '전문성', description: '우리는 지속적인 역량을 통해 높은 수준의 전문성을 유지하겠습니다.' },
    { title: '혁신', description: '우리는 지속적인 혁신을 통해 교육적인 교육서비스품을 제공하겠습니다.' },
    { title: '상생', description: '우리는 함께하는 구성원 모두가 다 같이 잘 살 수 있는 영어가정을 만들겠습니다.' }
  ]

  const departments = [
    {
      name: '강의계발팀',
      items: [
        '교과 업계 이론강의와 개발',
        '인성강의와 개발',
        '새로운 체험학습 발견 개발',
        '학생들의 학습 분석 제공'
      ]
    },
    {
      name: '체험운영팀',
      items: [
        '체험학습 구성 설계',
        '안전한 체험학습 밝아 수립',
        '학생급 지개/장비 제공',
        '체험학습 형사, 준공식 설계'
      ]
    }
  ]

  const operationStatus = {
    years: [
      { year: '2022년', 교용원: '1명', 조합원: '9명' },
      { year: '2023년', 교용원: '1명', 조합원: '8명' },
      { year: '2024년', 교용원: '3명', 조합원: '8명' },
      { year: '2025년', 교용원: '2명(1명 7월추가 예정)', 조합원: '7명' }
    ]
  }

  const members = [
    {
      name: '구관원',
      role: '경상대학원 석사<br/>KAI 교육개발 10년<br/>집쟁기강사 5년<br/>교육서시 2년 밝견<br/>사회공헌 5년 경력'
    },
    {
      name: '구자경',
      role: '경북대 검졸과 학사<br/>청소년학원 석사<br/>캠프/설계업무<br/>전산분야 운 업무/업무<br/>건축회사 2년 경력'
    },
    {
      name: '김영철',
      role: '건축강사 2년 이상<br/>기계/기구수리 5년<br/>기업경영 10년 경력<br/>제품구현 업무<br/>프리모델 개발경력'
    },
    {
      name: '박학주',
      role: '품질관리업무 25년<br/>태기업 정보처리<br/>건축강사 2년 이상<br/>제품구현 업무<br/>음악교육 경력 10년'
    },
    {
      name: '송정숙',
      role: '경상대학원 석사<br/>청련원에 10년 경력<br/>청소년검사 자격<br/>논타나무협층조합<br/>공예교육 10년 경력'
    },
    {
      name: '조미애',
      role: '고등학교교사 10년<br/>청소년상담 25년<br/>교육 커리큘럼 개발<br/>교육 마케팅 업무<br/>상담사 자격수'
    },
    {
      name: '이진무',
      role: '경상대학원 석사<br/>사회단체 10년 경력<br/>체육커리큘럼/행정문<br/>전축강사 3년 이상<br/>해설학원 상담 역임'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container-main py-16">
          <h1 className="heading-1 text-center">꿈을짓는 학교는?</h1>
          <p className="body-text text-center mt-6 max-w-3xl mx-auto text-gray-600">
            배움의 행복을 전하고 삶의 가치를 나누는 사회적협동조합
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="container-main section-padding">
        <div className="card-featured max-w-5xl mx-auto">
          <p className="body-text leading-relaxed">
            꿈을짓는학교는 교육서비스 제공을 주업으로 성적중심 교육환경 속에서 OECD 국가 청소년 행복지수가 최하위인 청소년들에게 집단성취감을 통한 바른 품성과 자긍심 회복, 그리고 로컬리티 활성화를 목적으로 설립된 사회적협동조합입니다.
          </p>
          <p className="body-text leading-relaxed mt-4">
            특히 도서 지역 청소년들의 열악한 교육환경 개선 및 교육기회 불평등을 해소하고, 인구소멸 위기지수가 높은 지역을 중심으로 주거역량강화 사업을 통해 활동화하는데 집중하고 있습니다.
          </p>
          <p className="body-text leading-relaxed mt-4">
            꿈을 짓는학교의 모든 교육은 품성교육+이론+실기가 복합된 키자니아식 방식으로 자라나는 세대들의 전인적인 성장을 목표로 모든 교육 프로그램을 제공합니다. 이를 위해 다수의 전문조합원과 교육봉사크루 운영, 지역업체의 CSR활동 연계 등 폐교위기의 작은학교 살리기 운동을 적극적으로 추진하고 있습니다.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50">
        <div className="container-main section-padding">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="card bg-blue-50 border-blue-200">
              <div className="bg-blue-700 text-white px-4 py-2 rounded-t-lg text-center font-semibold">
                소셜 미션
              </div>
              <div className="p-6 text-center">
                <p className="text-lg font-medium text-gray-800">배움의 행복을 전하고 삶의 가치를 나눈다</p>
              </div>
            </div>
            
            <div className="card bg-blue-50 border-blue-200">
              <div className="bg-blue-700 text-white px-4 py-2 rounded-t-lg text-center font-semibold">
                비전
              </div>
              <div className="p-6 text-center">
                <p className="text-lg font-medium text-gray-800">배움이 행복한 교육을 전하는 행복한 사회교육 전문협체</p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <h2 className="heading-2 text-center mb-8">핵심가치</h2>
          <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {coreValues.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">{value.title}</span>
                </div>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="container-main section-padding">
        <h2 className="heading-2 text-center mb-12">꿈을짓는학교 사회적협동조합</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {departments.map((dept, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">{dept.name}</h3>
                <ul className="space-y-2">
                  {dept.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-6 rounded-xl shadow-lg mb-8">
            <p className="text-xl font-medium leading-relaxed px-6">
              &ldquo;모든 체험학습의 주인공은 가르치는 사람이 아니라<br/>
              언제나 배우러는 아이들이어야 한다는 것이 저희의 신념입니다.&rdquo;
            </p>
          </div>
        </div>
      </section>


      {/* Operation Status */}
      <section className="bg-gray-50">
        <div className="container-main section-padding">
          <h2 className="heading-2 text-center mb-8">운영 현황</h2>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <th className="py-4 px-6 text-left">구분</th>
                    {operationStatus.years.map((year) => (
                      <th key={year.year} className="py-4 px-6 text-center">{year.year}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-700">교용원</td>
                    {operationStatus.years.map((year) => (
                      <td key={year.year} className="py-4 px-6 text-center">{year.교용원}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-700">조합원</td>
                    {operationStatus.years.map((year) => (
                      <td key={year.year} className="py-4 px-6 text-center">{year.조합원}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl px-8 py-4">
              <p className="text-lg font-medium text-blue-700">
                재무/행정/설계/개발/제작/상담/운영 등 각 분야별 기능과 역량 보유
              </p>
            </div>
          </div>

          {/* Members */}
          <h3 className="heading-3 text-center mb-8">전문 조합원 소개</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <div key={index} className="card hover-lift">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-2xl">
                      {member.name.substring(0, 1)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-700">{member.name}</h3>
                </div>
                <div className="text-sm text-gray-600 space-y-1 text-center" dangerouslySetInnerHTML={{ __html: member.role }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container-main py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">함께 만들어가는 교육의 미래</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            꿈을 짓는 학교와 함께 더 나은 교육 환경을 만들어가실 조합원을 모집합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/signup" className="btn-secondary">
              조합원 가입하기
            </a>
            <a href="/contact" className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200">
              문의하기
            </a>
          </div>
        </div>
      </section>
    </>
  )
}