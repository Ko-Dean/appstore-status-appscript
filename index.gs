function sendEmailToSlack() {  
  var specificSender = 'no_reply@email.apple.com'; 

// 특정 발신자로부터 읽지 않은 메일 검색
  var threads = GmailApp.search('from:' + specificSender + ' is:unread (subject:"The status of your (iOS) app" OR subject:"Your submission was accepted." OR subject:"We noticed an issue with your submission.")');

  if (threads.length > 0) {
      // 마지막 메일 가져오기
      var lastMessage = threads[threads.length - 1].getMessages()[0];
      var emailSubject = lastMessage.getSubject();
      var emailBody = lastMessage.getBody();

      var statusMessage = getStatusMessage(emailSubject);
      
      Logger.log(emailSubject);

      // Slack으로 보낼 메시지 구성
      if (statusMessage) {
          var receivedTime = new Date(); 
          var formattedReceivedTime = receivedTime.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

          var appVersion = extractInfo(emailBody, /App Version Number:\s*([^<]+)/);
          var appName = extractInfo(emailBody, /App Name:\s*([^<]+)/);
          var color = "#36a64f";
          if (emailSubject.includes('Your submission was accepted.')) {
            color = '#ADD8E6';  
          }
          if (emailSubject.includes("We noticed an issue with your submission.")) {
            color = "#FF6347";
            const textBody = emailBody.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
            // 버전 정보 추출
            const versionMatch = textBody.match(/([\d.]+)\s*for\s*iOS/i);
            if (versionMatch) {
                appVersion = versionMatch[1]; // 버전 정보 (예: 1.0.4)
            } else {
                appVersion = '정보 없음'; // 버전 정보가 없을 경우
            }
          } 

          var message = createSlackMessage(appName, appVersion, formattedReceivedTime, statusMessage, color);
          
          sendToSlack(message);
      }

      markMessagesAsRead(threads);
  } else {
      Logger.log('해당 발신자의 읽지 않은 메일이 없습니다.');
  }
}

function getStatusMessage(subject) {
    var status = subject.split('now');

    if (subject.includes("Your submission was accepted")) {
        return "배포 준비됨";
    } else if (subject.includes("We noticed an issue with your submission.")) {
        return "앱 심사 거부됨";
    } else {
        if (status.length > 1) {
            var statusMessage = status[1].trim();
            Logger.log(`statusMessage : ${statusMessage}`);
            var statusMessage = status[1].trim().replace(/\"/g, '');
            return mapStatusMessage(statusMessage);
        } else {
            return '상태를 찾을 수 없습니다.';
        }
    }
}

// 상태 메시지를 매핑하는 함수
function mapStatusMessage(statusMessage) {
    const statusMapping = {
        "Waiting for Review": "대기 중",
        "Ready for Distribution": "배포 준비 완료",
        "Pre-Order Ready for Sale" : "사전 주문 판매 준비 완료",
        "Pending Developer Release" : "보류 중인 개발자 릴리스",
        "Metadata Rejected" : "메타 데이터 거부",
        "Rejected": "거절됨",
        "Developer Rejected": "개발자 취소",
        "Ready For Review": "심사 대기중",
        "In Review": "심사 중",
        "Ready for Sale": "출시 대기 중",
        "Prepare for Submission": "제출 준비 중"
    };

    // 로그를 통해 statusMessage 확인
    
    Logger.log(`Received statusMessage: "${statusMessage}"`);
    
    return statusMapping[statusMessage] || "상태를 알 수 없습니다.";
}

// 정보 추출 함수
function extractInfo(body, regex) {
    var match = body.match(regex);
    return match ? match[1].trim() : '정보 없음';
}

// Slack 메시지 생성 함수
function createSlackMessage(appName, appVersion, receivedTime, statusMessage, color) {
    var message =`\n\n*[IOS] 앱 심사 상태가 변경되었습니다.*\n` +
           `App Name: ${appName}\n` +
           `App Version Number: ${appVersion}\n` +
           `Time : ${receivedTime}\n` +
           `Status: *${statusMessage}*`;
    return {
          attachments: [
              {
                  title: "App Store Connect",
                  text: message ,
                  color: color
              }
          ]
      };
}

// Slack으로 메시지 전송 함수
function sendToSlack(attachments) {
    var options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(attachments)
    };
    var slackWebhookUrl = 'slack webhook url; // 발급받은 Slack Webhook URL로 변경해주세요.
    
    UrlFetchApp.fetch(slackWebhookUrl, options);
}

// 메시지를 읽음으로 표시하는 함수
function markMessagesAsRead(threads) {
    var messagesToMarkRead = [];
    threads.forEach(thread => {
        messagesToMarkRead = messagesToMarkRead.concat(thread.getMessages());
    });

    if (messagesToMarkRead.length > 0) {
        GmailApp.markMessagesRead(messagesToMarkRead);
        Logger.log("모든 메시지를 읽음으로 표시했습니다.");
    }
}