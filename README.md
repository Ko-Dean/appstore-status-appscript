# App Store Connect Status to Slack Notifier

이 프로젝트는 App Store Connect의 상태 값을 Google Apps Script를 사용하여 Slack으로 자동으로 전송하는 오픈소스 애플리케이션입니다. 이를 통해 앱의 상태 변경을 실시간으로 알림 받을 수 있습니다.

## 소개
- 비 개발자인 팀원들과 앱 심사 상태를 슬랙으로 공유해볼 방법이 없을까 고민하던중 애플 개발자센터에서 앱 상태가 변경되면 이메일을 통해 앱 상태를 알려주게되는데 이를 활용하여 Google App Script로 주기적으로 이메일함을 폴링하여 앱 상태를 실시간으로 슬랙으로 보낼수있지 않을까 라는 생각에서 개발하게 되었습니다.

## 동작 조건
  - 애플 앱 개발자센터에 등록된 이메일로 앱 심사 상태 메일을 받는 구글 메일 계정이어야합니다.

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
   - index.gs의 코드를 복사하여 Google App Script 편집기에 붙여넣습니다.
   - 그리고 ```var slackWebhookUrl = 'slack webhook url; // 발급받은 Slack Webhook URL로 변경해주세요.``` 이 부분을 찾아서 0에서 발급 받은 url로 변경해줍니다.

3. **
