// Supabase 클라이언트 유틸리티

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ogxbygeubwxqkzgvvnhl.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neGJ5Z2V1Ynd4cWt6Z3Z2bmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMzUyMDUsImV4cCI6MjA3NDkxMTIwNX0.tFif44QSCj3_PkSIiTBu3H5s3gijO1xcCf2MW73qjcY';

/**
 * 이미지를 Supabase Storage에 업로드합니다.
 * @param file - 업로드할 파일
 * @param bucket - 스토리지 버킷 이름
 * @param folder - 폴더 경로 (선택사항)
 * @returns 업로드된 파일의 공개 URL
 */
export async function uploadImage(
  file: File,
  bucket: string = 'images',
  folder?: string
): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${bucket}/${filePath}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`이미지 업로드 실패: ${error.message || '알 수 없는 오류'}`);
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`;
}

/**
 * Supabase Storage에서 이미지를 삭제합니다.
 * @param url - 삭제할 이미지의 공개 URL
 * @param bucket - 스토리지 버킷 이름
 */
export async function deleteImage(
  url: string,
  bucket: string = 'images'
): Promise<void> {
  // URL에서 파일 경로 추출
  const urlParts = url.split(`/storage/v1/object/public/${bucket}/`);
  if (urlParts.length < 2) {
    throw new Error('잘못된 이미지 URL 형식입니다.');
  }
  const filePath = urlParts[1];

  const response = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${bucket}/${filePath}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`이미지 삭제 실패: ${error.message || '알 수 없는 오류'}`);
  }
}

/**
 * Supabase REST API를 사용하여 문의를 생성합니다.
 */
export async function createInquiry(data: {
  type: 'general' | 'donation';
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
}): Promise<void> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/inquiries`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`문의 등록 실패: ${error.message || '알 수 없는 오류'}`);
  }
}

/**
 * Supabase REST API를 사용하여 문의 목록을 조회합니다.
 */
export async function getInquiries(filters?: {
  type?: 'general' | 'donation';
  status?: 'unread' | 'completed';
}): Promise<any[]> {
  let url = `${SUPABASE_URL}/rest/v1/inquiries?order=created_at.desc`;

  if (filters?.type) {
    url += `&type=eq.${filters.type}`;
  }
  if (filters?.status) {
    url += `&status=eq.${filters.status}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    }
  });

  if (!response.ok) {
    throw new Error('문의 조회 실패');
  }

  return response.json();
}

/**
 * Supabase REST API를 사용하여 문의 상세를 조회합니다.
 */
export async function getInquiryById(id: string): Promise<any> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/inquiries?id=eq.${id}`,
    {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      }
    }
  );

  if (!response.ok) {
    throw new Error('문의 조회 실패');
  }

  const data = await response.json();
  return data[0];
}

/**
 * Supabase REST API를 사용하여 문의 상태를 업데이트합니다.
 */
export async function updateInquiryStatus(
  id: string,
  status: 'unread' | 'completed'
): Promise<void> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/inquiries?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ status })
    }
  );

  if (!response.ok) {
    throw new Error('상태 업데이트 실패');
  }
}

/**
 * Supabase REST API를 사용하여 크루 신청을 생성합니다.
 */
export async function createCrewApplication(data: {
  name: string;
  email: string;
  phone: string;
  gender: string;
  privacy_consent: string;
  motivation: string;
  questions?: string;
}): Promise<void> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/crew_applications`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`크루 신청 등록 실패: ${error.message || '알 수 없는 오류'}`);
  }
}

/**
 * Supabase REST API를 사용하여 크루 신청 목록을 조회합니다.
 */
export async function getCrewApplications(filters?: {
  status?: 'unread' | 'completed';
}): Promise<any[]> {
  let url = `${SUPABASE_URL}/rest/v1/crew_applications?order=created_at.desc`;

  if (filters?.status) {
    url += `&status=eq.${filters.status}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    }
  });

  if (!response.ok) {
    throw new Error('크루 신청 조회 실패');
  }

  return response.json();
}

/**
 * Supabase REST API를 사용하여 크루 신청 상세를 조회합니다.
 */
export async function getCrewApplicationById(id: string): Promise<any> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/crew_applications?id=eq.${id}`,
    {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      }
    }
  );

  if (!response.ok) {
    throw new Error('크루 신청 조회 실패');
  }

  const data = await response.json();
  return data[0];
}

/**
 * Supabase REST API를 사용하여 크루 신청 상태를 업데이트합니다.
 */
export async function updateCrewApplicationStatus(
  id: string,
  status: 'unread' | 'completed'
): Promise<void> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/crew_applications?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ status, updated_at: new Date().toISOString() })
    }
  );

  if (!response.ok) {
    throw new Error('크루 신청 상태 업데이트 실패');
  }
}

/**
 * Supabase REST API를 사용하여 크루 신청을 삭제합니다.
 */
export async function deleteCrewApplication(id: string): Promise<void> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/crew_applications?id=eq.${id}`,
    {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      }
    }
  );

  if (!response.ok) {
    throw new Error('크루 신청 삭제 실패');
  }
}

/**
 * Supabase REST API를 사용하여 프로그램 목록을 조회합니다.
 */
export async function getPrograms(filters?: {
  category?: string;
  is_active?: boolean;
}): Promise<any[]> {
  let url = `${SUPABASE_URL}/rest/v1/programs?order=created_at.desc`;

  if (filters?.category) {
    url += `&category=eq.${filters.category}`;
  }
  if (filters?.is_active !== undefined) {
    url += `&is_active=eq.${filters.is_active}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    }
  });

  if (!response.ok) {
    throw new Error('프로그램 조회 실패');
  }

  return response.json();
}

/**
 * Supabase REST API를 사용하여 프로그램 상세를 조회합니다.
 */
export async function getProgramById(id: string): Promise<any> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/programs?id=eq.${id}`,
    {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      }
    }
  );

  if (!response.ok) {
    throw new Error('프로그램 조회 실패');
  }

  const data = await response.json();
  if (!data || data.length === 0) {
    throw new Error('프로그램을 찾을 수 없습니다');
  }

  // 세션 정보 조회
  const sessionsResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/program_sessions?program_id=eq.${id}&order=order_num.asc`,
    {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      }
    }
  );

  let sessions = [];
  if (sessionsResponse.ok) {
    sessions = await sessionsResponse.json();

    // 각 세션의 이미지 조회
    for (const session of sessions) {
      const imagesResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/program_session_images?session_id=eq.${session.id}&order=order_num.asc`,
        {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          }
        }
      );

      if (imagesResponse.ok) {
        session.images = await imagesResponse.json();
      } else {
        session.images = [];
      }
    }
  }

  return {
    ...data[0],
    sessions
  };
}

/**
 * Supabase REST API를 사용하여 프로그램을 생성합니다.
 */
export async function createProgram(data: {
  title: string;
  subtitle?: string;
  description?: string;
  target?: string;
  duration?: string;
  max_participants?: string;
  fee?: string;
  location?: string;
  category: string;
  is_active?: boolean;
}): Promise<any> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/programs`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`프로그램 생성 실패: ${error.message || '알 수 없는 오류'}`);
  }

  const result = await response.json();
  return result[0];
}

/**
 * Supabase REST API를 사용하여 프로그램을 업데이트합니다.
 */
export async function updateProgram(
  id: string,
  data: Partial<{
    title: string;
    subtitle: string;
    description: string;
    target: string;
    duration: string;
    max_participants: string;
    fee: string;
    location: string;
    category: string;
    is_active: boolean;
  }>
): Promise<void> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/programs?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    throw new Error('프로그램 업데이트 실패');
  }
}

/**
 * Supabase REST API를 사용하여 프로그램을 삭제합니다.
 */
export async function deleteProgram(id: string): Promise<void> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/programs?id=eq.${id}`,
    {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      }
    }
  );

  if (!response.ok) {
    throw new Error('프로그램 삭제 실패');
  }
}

/**
 * Supabase REST API를 사용하여 프로그램 세션을 생성합니다.
 */
export async function createProgramSession(data: {
  program_id: string;
  order_num: number;
  title: string;
  description?: string;
}): Promise<any> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/program_sessions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`세션 생성 실패: ${error.message || '알 수 없는 오류'}`);
  }

  const result = await response.json();
  return result[0];
}

/**
 * Supabase REST API를 사용하여 프로그램 세션을 업데이트합니다.
 */
export async function updateProgramSession(
  id: string,
  data: Partial<{
    order_num: number;
    title: string;
    description: string;
  }>
): Promise<void> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/program_sessions?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    throw new Error('세션 업데이트 실패');
  }
}

/**
 * Supabase REST API를 사용하여 프로그램 세션을 삭제합니다.
 */
export async function deleteProgramSession(id: string): Promise<void> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/program_sessions?id=eq.${id}`,
    {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      }
    }
  );

  if (!response.ok) {
    throw new Error('세션 삭제 실패');
  }
}

/**
 * Supabase REST API를 사용하여 세션 이미지를 생성합니다.
 */
export async function createSessionImage(data: {
  session_id: string;
  image_url: string;
  order_num: number;
}): Promise<any> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/program_session_images`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`이미지 생성 실패: ${error.message || '알 수 없는 오류'}`);
  }

  const result = await response.json();
  return result[0];
}

/**
 * Supabase REST API를 사용하여 세션 이미지를 삭제합니다.
 */
export async function deleteSessionImage(id: string): Promise<void> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/program_session_images?id=eq.${id}`,
    {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      }
    }
  );

  if (!response.ok) {
    throw new Error('이미지 삭제 실패');
  }
}
