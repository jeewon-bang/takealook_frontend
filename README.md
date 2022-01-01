
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8a2e888b-178b-4d62-9fea-2f36c90b7850/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220101T063721Z&X-Amz-Expires=86400&X-Amz-Signature=26b9296ba8df25500bc9bc7272e81e7454851658b2ea0393f4d3a689ca9482f8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject">

❣ [Take a Look! 서비스 바로가기](http://takealook.ekg.kr)

🔗 [Backend github repository](https://github.com/streetnyangfighter/takealook_backend)

🔗 [AI github repository](https://github.com/streetnyangfighter/takealook_ai)

<br>


## 😺 서비스 기획 의도
### `Take a Look! (떼껄룩)`은 길고양이와 사람의 공존을 위한 길고양이 도감 웹서비스입니다.
#### ❓🤷‍♂️ "길고양이를 왜 돌봐야 하나요? 저는 고양이를 싫어하는데요!"
- 길고양이 개체수를 조절하고 소음/악취/환경 훼손 등의 길고양이 관련 문제를 해결하려면, 적절한 먹이주기 및 중성화 등의 길고양이 돌봄 활동이 필수적입니다.
- Take a Look!은 `길고양이 돌봄에 관한 체계화된 정보를 공유`하고 `건강한 길고양이 돌봄 문화를 활성화`하여 지역사회 문제를 해결하는 데 일조합니다.

#### ❓💁‍♀ "고양이가 아파 보여서 약을 먹여야 할 것 같은데.. 누가 이미 먹이지는 않았을까?"
- 길고양이 특성상 불특정 다수가 무작위로 돌봄을 제공할 수밖에 없어 올바르지 못한 처치가 이루어질 위험성이 항상 존재했습니다.
- `같은 고양이를 돌보는 이웃들과 도감을 공유`하게 함으로써 길고양이 돌보미들이 느꼈던 불편함을 해소하고 시의적절한 돌봄이 제공될 기회를 높일 수 있습니다.


<br>

## 👨‍👧‍👧 팀원
- [신지혜](https://github.com/jhshin29) : 백엔드 개발, AWS 배포 관리 (백엔드 서버, DB)
- [배지수](https://github.com/geesuee) : 백엔드 개발, AI 모델 설계
- [장혜민](https://github.com/hyemin-jang) : 프론트엔드 개발
- [방지원](https://github.com/jeewon-bang) : 프론트엔드 개발, AWS 배포 관리 (프론트엔드 서버)
- [박세은](https://github.com/seeun214) : 프론트엔드 개발

<br>

## 🗓 개발 기간
2021.11.05 ~ 2021.12.26 

<br>

## ⚙ 개발 환경

<br>

## 🧬 서비스 구조
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a9347822-3989-4971-aa55-e65a93e8baf2/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220101T063615Z&X-Amz-Expires=86400&X-Amz-Signature=aaa040d37d544c00bb0e896773ba34989b4b649a058a437ce7a78e1241dfc9f6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject">

### 로그인 및 마이페이지

- OAuth2.0 프로토콜을 사용한 Google, Kakao 로그인
- 내가 작성/좋아요 누른 글 모아보기
- 내 도감에 등록된 고양이, 내가 작성한 글에 대한 변경사항 알람 제공

<br>

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a5501b26-9fcb-4f59-bb41-7cb7e8925129/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220101T063633Z&X-Amz-Expires=86400&X-Amz-Signature=35b33edf3cf0418a23148d4ce4e576894a109575f9cb0dd98849022ded4ee2c9&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject">

### 고양이 등록

- 내가 돌보는 길고양이를 내 도감에 등록해서 관리 가능
- 고양이 등록시, **`다른 사용자가 이미 해당 고양이를 등록해놓았다면 그 도감을 공유할 수 있도록 AI 기반 유사 고양이 리스트 제공`** 
  - 사용자가 등록한 고양이 사진으로부터 딥러닝 기반 얼굴 인식 → 고양이 얼굴 랜드마크 표시 
  - 정확도 향상을 위해 랜드마크를 사용자가 직접 검수 및 수정할 수 있는 장치 마련
  - 인식된 얼굴 랜드마크를 기준으로 이미지 전처리 후, 기존에 등록된 고양이 이미지들과 유사도 비교
  - 이미지 유사도 및 추가 정보(고양이 최근 발견 위치, 털패턴 종류)를 바탕으로 유사도 점수 책정, 높은 순으로 리스트 제공  
- 제공된 리스트 중 **등록하려는 고양이와 일치한다고 판단**되는 경우, **해당 고양이를 바로 내 도감에 추가하여 기존 돌보미들과 정보 공유** 가능
- 제공된 리스트 중 등록하려는 고양이가 없는 경우, 새로운 고양이로 내 도감에 등록 가능

<br>

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8f919825-7ea3-4289-84d2-973cef5a6a3e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220101T063655Z&X-Amz-Expires=86400&X-Amz-Signature=276af5f477363e1e04c6cecbc2ceae01069563010dc661261b6c0894bec76930&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject">

### 고양이 관리
- 고양이 관리에 대한 모든 정보는 해당 고양이를 함께 돌보는 이웃들과 공유 가능
  - 사진
  - 현재 건강상태
  - 최근 발견 위치(지도에 마커로 표시)
  - 돌봄 이력 (밥/간식/약 급여/병원치료 등)
  - 입양 혹은 사망 여부
- **`다른 사용자가 등록한 고양이와 일치하는 줄 알고 내 도감에 추가했는데 알고보니 다른 고양이였던 걸로 판단되는 경우, 다른 고양이로 재등록`** 가능
  - 고양이 최초 등록시와 마찬가지로 AI 기반 유사 고양이 리스트 다시 제공
  - 리스트 중 다른 고양이를 내 도감에 추가하거나 아예 새로운 고양이로 내 도감에 재등록 가능 
  
 <br>

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/25cd30f2-6b80-482c-a40a-c23674f93544/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220101%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220101T062349Z&X-Amz-Expires=86400&X-Amz-Signature=71e714c6a879cad33e03c749ada96047b613af2921c63a24c85bbd5950df46a0&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject">

### 커뮤니티
- 카테고리에 맞는 글 작성 및 조회 
- 댓글 작성 및 좋아요 기능


<br>

## 🎞 시연 영상
[![Take a Look! 서비스 시연 영상](https://user-images.githubusercontent.com/74531573/147846465-4ddcbedb-4a8a-43aa-b6f2-04ec3e0c2b3c.png)](https://www.youtube.com/watch?v=NgvGsDKbvok)
