# App Store Connect Status to Slack Notifier

이 프로젝트는 App Store Connect의 상태 값을 Google Apps Script를 사용하여 Slack으로 자동으로 전송하는 오픈소스 애플리케이션입니다. 이를 통해 앱의 상태 변경을 실시간으로 알림 받을 수 있습니다.

## 소개
- 비 개발자인 팀원들과 앱 심사 상태를 슬랙으로 공유해볼 방법이 없을까 고민하던중 애플 개발자센터에서 앱 상태가 변경되면 이메일을 통해 앱 상태를 알려주게되는데 이를 활용하여 Google App Script로 주기적으로 이메일함을 폴링하여 앱 상태를 실시간으로 슬랙으로 보낼수있지 않을까 라는 생각에서 개발하게 되었습니다.

## 동작 조건
  - 애플 앱 개발자센터에 등록된 이메일로 앱 심사 상태 메일을 받는 구글 메일 계정이어야합니다.
  - 개발자 센터에서 오는 이메일을 읽지 않아야 작동하며 읽은 경우 슬랙에 공유되지 않습니다.
  - 주기가 긴 경우 메일이 여러건 왔을때는 마지막 메세지만 슬랙에 보내고 그 이전에 왔던 메일은 다 읽음 처리 됩니다.

## 상태 정의
코드 상에 정의된 상태는 다음과 같습니다.
  - "Waiting for Review": "대기 중",
  - "Ready for Distribution": "배포 준비 완료",
  - "Pre-Order Ready for Sale" : "사전 주문 판매 준비 완료",
  - "Pending Developer Release" : "보류 중인 개발자 릴리스",
  - "Metadata Rejected" : "메타 데이터 거부",
  - "Rejected": "거절됨",
  - "Developer Rejected": "개발자 취소",
  - "Ready For Review": "심사 대기중",
  - "In Review": "심사 중",
  - "Ready for Sale": "출시 대기 중",
  - "Prepare for Submission": "제출 준비 중"  
  
https://developer.apple.com/help/app-store-connect/reference/app-and-submission-statuses/ 에서 AppStore submission statuses 더 많은 상태값을 확인할 수 있습니다. 
  
## 기능

- App Store Connect의 앱 상태를 주기적으로 확인합니다.
- 상태 변경 시 Slack 채널로 알림을 전송합니다.
- 간단한 설정으로 빠르게 배포할 수 있습니다.
- 주기에 따라 변경할 수 있습니다. 

## 설치 및 설정
0. **slack webhook url 발급**
   - slack에서 App에서 Incoming WebHooks를 찾아서 WebHook URL을 발급받습니다.

1. **Google Apps Script 프로젝트 생성**
   - https://script.google.com/home/start 로 들어가서 

2. **스크립트 코드 붙여넣기**
   - https://github.com/Ko-Dean/appstore-status-appscript/blob/main/index.gs
   - 코드를 복사하여 Google App Script 편집기에 붙여넣습니다.
   - 그리고 ```var slackWebhookUrl = 'slack webhook url; // 발급받은 Slack Webhook URL로 변경해주세요.``` 이 부분을 찾아서 0에서 발급 받은 url로 변경해줍니다.

3. **트리거 설정**

   - 좌측 메뉴에서 트리거를 클릭합니다.
  <div align="left">
    <img src="https://github.com/Ko-Dean/appstore-status-appscript/blob/develop/images/appscript_menu.png" alt="대체 텍스트" />
</div>


  - 하단의 트리거 추가를 클릭합니다.
   <div align="left">
    <img src="https://github.com/Ko-Dean/appstore-status-appscript/blob/develop/images/triggers.png" alt="대체 텍스트" />
</div>
팝업창에서 실행할 함수를 sendEmailToSlack으로 설정하고 메일함을 폴링할 시간을 설정합니다. 
   <div align="left">
    <img src="https://github.com/Ko-Dean/appstore-status-appscript/blob/develop/images/triggers_time_type.png" alt="대체 텍스트" />
</div>
트리거 기반 시간 유형 선택의 메뉴를 클릭하면 분 단위로도 설정 변경이 가능합니다.
   <div align="left">
    <img src="https://github.com/Ko-Dean/appstore-status-appscript/blob/develop/images/trigger_time_repeat.png" alt="대체 텍스트" />
</div>


## 데모
<div align="center">
    <img src="https://github.com/Ko-Dean/appstore-status-appscript/blob/develop/images/demo.png" alt="대체 텍스트" />
</div>
