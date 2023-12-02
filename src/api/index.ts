const allowMethod: string[] = ['get', 'post', 'put', 'patch', 'delete'];
const API_URL = process.env.API_URL || 'http://localhost:4000';

interface fetchRequest {
  requestApi: <T>(method: string, url: string, data?: {}) => Promise<T>;
}

/**
 * 작성자명   : 원종석
 * 작성일자   : 2023.11.28.(화)
 * 작성내용   : fetch로 요청 보내기
 * 수정일자   : none
 * 수정내용   : none
 * @param method 어떤 형식의 method를 보내는지 설정 (get, post, put, patch, delete)
 * @param url 호출 url 작성. path param은 url에 같이 정의해준다.
 * @param data request body에 해당하는 사항. post, put 시 추가/수정할 객체를 지정해주면 된다. get은 빈 객체를 보낸다.
 */

const apiRequest: fetchRequest = {
  requestApi: async <T>(method: string, url: string, data = {}) => {
    // 이상한 method 넣으면 실행 못하게 미리 에러 처리 한다.
    if (!allowMethod.includes(method.toLowerCase()))
      throw new Error('허용되지 않은 호출 method입니다.');
    try {
      // TODO: interceptor 적용 필요
      // TODO: timeout 설정 필요
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json' // TODO: Content-Type이 다를 경우 변경 필요
        },
        credentials: 'include' as RequestCredentials, // credentials 속성 타입 설정
        cache: 'no-store' as RequestCache // TODO: cashe를 항상 no-store로 해야 할까?
        // body: method.toLowerCase() !== 'get' ? JSON.stringify(data) : null
      };

      const response = await fetch(`${API_URL}/${url}`, options);

      // 응답 코드가 4XX 계열일 때 (400, 403 등)
      if (!response.ok) {
        const errorContent = await response.json();
        const { errorMessage } = errorContent;
        alert(errorMessage); // TODO: 제거 필요. 다른 방법으로 오류를 알릴 수 있어야 함.
        throw new Error(errorMessage);
      }

      const result = await response.json();

      return result.data as T;
    } catch (error) {
      console.log(error); // TODO: 에러 처리
      throw error;
    }
  }
};

export default apiRequest;
