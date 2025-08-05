// 홈페이지용 이미지 데이터
export const homeImages = [
  '/images/home/KakaoTalk_20240516_190354456_11.jpg',
  '/images/home/KakaoTalk_20240516_190354456_16.jpg', 
  '/images/home/KakaoTalk_20240528_130049921_02.jpg',
  '/images/home/KakaoTalk_20240528_130049921_07.jpg',
  '/images/home/KakaoTalk_20240528_130049921_08.jpg',
  '/images/home/KakaoTalk_20240528_130049921_09.jpg',
  '/images/home/KakaoTalk_20240528_130049921_15.jpg',
  '/images/home/KakaoTalk_20240528_130049921_22.jpg',
  '/images/home/KakaoTalk_20240528_130049921_23.jpg',
  '/images/home/KakaoTalk_20240528_130049921_27.jpg'
] as const

// 이미지 그룹별로 나누기 (필요시 사용)
export const homeImageGroups = {
  activities: [
    '/images/home/KakaoTalk_20240528_130049921_02.jpg',
    '/images/home/KakaoTalk_20240528_130049921_07.jpg',
    '/images/home/KakaoTalk_20240528_130049921_08.jpg',
    '/images/home/KakaoTalk_20240528_130049921_09.jpg'
  ],
  facilities: [
    '/images/home/KakaoTalk_20240516_190354456_11.jpg',
    '/images/home/KakaoTalk_20240516_190354456_16.jpg'
  ],
  events: [
    '/images/home/KakaoTalk_20240528_130049921_15.jpg',
    '/images/home/KakaoTalk_20240528_130049921_22.jpg',
    '/images/home/KakaoTalk_20240528_130049921_23.jpg',
    '/images/home/KakaoTalk_20240528_130049921_27.jpg'
  ]
} as const