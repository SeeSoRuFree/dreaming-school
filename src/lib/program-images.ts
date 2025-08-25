// 프로그램별 이미지 데이터 (중복 포함하여 개수 늘림)
export const programImages = {
  building: [
    '/images/program/1/20200910_104741.jpg',
    '/images/program/1/20200925_104354.jpg',
    '/images/program/1/20200925_115529.jpg',
    '/images/program/1/20201015_115153.jpg',
    '/images/program/1/20200910_104741.jpg',
    '/images/program/1/20200925_104354.jpg',
    '/images/program/1/20200925_115529.jpg',
    '/images/program/1/20201015_115153.jpg'
  ],
  'model-building': [
    '/images/program/1/20200910_104741.jpg',
    '/images/program/1/20200925_104354.jpg',
    '/images/program/1/20200925_115529.jpg',
    '/images/program/1/20201015_115153.jpg',
    '/images/program/1/20200910_104741.jpg',
    '/images/program/1/20200925_104354.jpg',
    '/images/program/1/20200925_115529.jpg',
    '/images/program/1/20201015_115153.jpg'
  ],
  science: [
    '/images/program/2/20200917_103051.jpg',
    '/images/program/2/20200917_114245.jpg',
    '/images/program/2/20201015_101250.jpg',
    '/images/program/2/20200917_103051.jpg',
    '/images/program/2/20200917_114245.jpg',
    '/images/program/2/20201015_101250.jpg',
    '/images/program/2/20200917_103051.jpg',
    '/images/program/2/20200917_114245.jpg'
  ],
  remodeling: [
    '/images/program/3/KakaoTalk_20211013_123434390_19.jpg',
    '/images/program/3/KakaoTalk_20211013_123532460_14.jpg',
    '/images/program/3/KakaoTalk_20220604_102553556_01.jpg',
    '/images/program/3/KakaoTalk_20220611_132307516_08.jpg',
    '/images/program/3/KakaoTalk_20211013_123434390_19.jpg',
    '/images/program/3/KakaoTalk_20211013_123532460_14.jpg',
    '/images/program/3/KakaoTalk_20220604_102553556_01.jpg',
    '/images/program/3/KakaoTalk_20220611_132307516_08.jpg'
  ],
  gardening: [
    '/images/program/4/1620363947652-3.jpg',
    '/images/program/4/IMG_8547.jpg',
    '/images/program/1/20200925_115529.jpg',
    '/images/program/4/KakaoTalk_20210605_133031925_07.jpg',
    '/images/program/4/1620363947652-3.jpg',
    '/images/program/4/IMG_8547.jpg',
    '/images/program/1/20200925_115529.jpg',
    '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
  ],
  rural: [
    '/images/program/5/14.JPG',
    '/images/program/5/20210521_095311.jpg',
    '/images/program/5/5555.JPG',
    '/images/program/5/GOPR0430.JPG',
    '/images/program/5/14.JPG',
    '/images/program/5/20210521_095311.jpg',
    '/images/program/5/5555.JPG',
    '/images/program/5/GOPR0430.JPG'
  ]
} as const

export type ProgramCategory = keyof typeof programImages

// 프로그램 카테고리별 제목 매핑
export const programTitles = {
  building: '세상에서 가장 위대한 한평 집짓기',
  'model-building': '모형집짓기 체험교육 사업',
  science: '과학창의교육 및 체험학습 사업',
  remodeling: '공간 재창조 리모델링 사업',
  gardening: '원예프로그램',
  rural: '농촌활성화 사업'
} as const