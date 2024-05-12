# SSAFY11_관통_프로젝트

## 광주_5반_14팀 (서동인, 김규형)

## BackEnd Info

- 고객들을 위한 회원관리(로그인, 회원가입, 정보 변경)를 제공
- 여행 계획을 세울 때 각 지역별 유명한 여행지의 정보를 타입(관광지,숙박, 음식점, 축제정보 등..)에 맞게 제공받을 수 있는 서비스로 구현
- 자신의 현재 위치에 기반하여 가장 가까운 위치의 여행지를 제공
- 원하는 여행 정보가 있을 경우 모달로 상세 정보를 제공
- 취향에 맞는 여행 코스 제공 
- 여행지에 대한 후기 및 별점 제공
- 게시판을 통해 회원들끼리 커뮤니티 기능 제공

## 기술 스택
<img src="https://img.shields.io/badge/Vue.js-099268?style=flat&logo=Vue.js&logoColor=white"/>   <img src="https://img.shields.io/badge/vite-228be6?style=flat&logo=vite&logoColor=white"/>
![HTML](https://img.shields.io/badge/HTML-239120?style=flat-square&logo=HTML5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black)



## 요구사항

- [x]  로그인 관리
- [x]  회원 관리
- [x]  지역별 관광지 정보 수집
- [x]  관광지, 숙박, 음식점 조회
- [x]  문화시설, 공연, 여행코스 쇼힝 조회
- [x]  내 위치 기반 여행 정보 제공 
- [x]  관광지 세부정보 제공
- [ ]  관광지에 대한 별점 및 의견 제공
- [ ]  게시판 기능
- [ ]  맞춤 여행 코스 제공 및 등록

## ERD, Use case 다이어그램

<table>
  <tr>
   <td align="center">
      <img src="https://github.com/unggu0704/saffy/assets/130115689/7752ce09-780c-47e0-bcf0-425e5c8060bb" alt="ERD Diagram">
       <span>ERD Diagram</span>
    </td>
    <td align="center">
      <img src="./resources/ssafytrip_usecase.PNG" alt="Use Case Diagram">
      <span>Use Case Diagram</span>
    </td>
  </tr>
</table>






## 메인 화면 및 관광지 조회

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/unggu0704/nhnacademy-study/assets/130115689/ceab0b6d-1ebd-4c0d-ac40-37216b814615" alt="signup">
    </td>
    <td align="center">
      <img src="https://github.com/unggu0704/nhnacademy-study/assets/130115689/8c687e8c-bbd3-4604-a68f-61013637a953" alt="login">
    </td>
  </tr>
</table>

- 관광지 조회는 모두 **attraction-controller** 가 제어합니다.
- 메인화면은 다른 서비스로 가는 네비게이션 기능을 제공합니다.
- 데이터베이스에 저장되어 있는 관광지 4곳을 랜덤으로 보여줍니다.
- 선택한 관광지에 대해서 카카오 맵 api를 활용해 위치 정보를 제공합니다.
- 결과는 서버에 저장되어 있는 사용자 위치를 기반으로 가까운 순서부터 제공합니다. 

## 로그인 및 회원 관리

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/unggu0704/algorithm-study/assets/130115689/7bd6a5b0-7ca4-4149-8a28-eba5cf1d4414" alt="signup">
    </td>
    <td align="center">
      <img src="https://github.com/unggu0704/algorithm-study/assets/130115689/e3be4e51-90d8-47a4-82fc-653c1c004af5" alt="login">
    </td>
  </tr>
</table>


- 유저관련 CRUD는 모두 **memberController** 가 제어합니다.
- 로그인 성공 시 유저의 id, 이름은 session에 저장됩니다.
- 회원가입 시 입력한 ID가 DB에 존재하는 지 ajax를 사용하여 검사합니다.


## 디렉터리 구조
```
└─src
    ├─main
    │  ├─java
    │  │  └─com
    │  │      └─ssafy
    │  │          │  EnjoyTripSpringBootApplication.java
    │  │          │
    │  │          ├─mvc
    │  │          │  ├─controller
    │  │          │  │      AttractionContoller.java
    │  │          │  │      MemberController.java
    │  │          │  │
    │  │          │  └─model
    │  │          │      │  AttractionDistance.java
    │  │          │      │  AttractionDto.java
    │  │          │      │  MemberDto.java
    │  │          │      │  NowLocation.java
    │  │          │      │
    │  │          │      ├─mapper
    │  │          │      │      AttractionMapper.java
    │  │          │      │      MemberMapper.java
    │  │          │      │
    │  │          │      └─service
    │  │          │              AttractionService.java
    │  │          │              AttractionServiceImpl.java
    │  │          │              MemberService.java
    │  │          │              MemberServiceImpl.java
    │  │          │
    │  │          └─util
    │  │              │  DBUtil.java
    │  │              │
    │  │              └─Distance
    │  │                      DistanceSort.java
    │  │                      DistanceUtil.java
    │  │
    │  ├─resources
    │  │  │  application.properties
    │  │  │
    │  │  └─mapper
    │  │          attractionmapper.xml
    │  │          membermapper.xml
    │  │
    │  └─webapp
    │      ├─assets
    │      │  ├─css
    │      │  │      main.css
    │      │  │
    │      │  ├─img
    │      │  │      a.png
    │      │  │      favicon.ico
    │      │  │      main_beach.jpg
    │      │  │      my_position.png
    │      │  │      noimg.jpg
    │      │  │      noimg.png
    │      │  │      profile.png
    │      │  │      ssafy_logo.png
    │      │  │
    │      │  ├─js
    │      │  │      Geolocation.js
    │      │  │      kakaomap.js
    │      │  │      main.js
    │      │  │      map.js
    │      │  │      tour.js
    │      │  │
    │      │  └─map
    │      │          map.html
    │      │
    │      ├─common
    │      │      error.jsp
    │      │      footer.jsp
    │      │      head.jsp
    │      │      modal.jsp
    │      │      nav.jsp
    │      │
    │      ├─META-INF
    │      │      MANIFEST.MF
    │      │
    │      └─WEB-INF
    │          └─views
    │              │  index.jsp
    │              │
    │              ├─member
    │              │      memberInfo.jsp
    │              │
    │              └─tour
    │                      attraction.jsp
    │
```
