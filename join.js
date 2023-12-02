const sendit = () => {
    // Input들을 각각 변수에 대입
    const userid = document.regiform.userid;
    const userpw = document.regiform.userpw;
    const userpw_ch = document.regiform.userpw_ch;
    const username = document.regiform.username;
    const userphone = document.regiform.userphone;
    const useremail = document.regiform.useremail;
    const usertage = document.regiform.usertage;

    // userid값이 비어있으면 실행.
    if (userid.value == '') {
        alert('아이디를 입력해주세요.');
        userid.focus();
        return false;
    }
    // userid값이 4자 이상 12자 이하를 벗어나면 실행.
    if (userid.value.length < 4 || userid.value.length > 12) {
        alert("아이디는 4자 이상 12자 이하로 입력해주세요.");
        userid.focus();
        return false;
    }
    // userpw값이 비어있으면 실행.
    if (userpw.value == '') {
        alert('비밀번호를 입력해주세요.');
        userpw.focus();
        return false;
    }
    // userpw_ch값이 비어있으면 실행.
    if (userpw_ch.value == '') {
        alert('비밀번호 확인을 입력해주세요.');
        userpw_ch.focus();
        return false;
    }
    // userpw값이 6자 이상 20자 이하를 벗어나면 실행.
    if (userpw.value.length < 6 || userpw.value.length > 20) {
        alert("비밀번호는 6자 이상 20자 이하로 입력해주세요.");
        userpw.focus();
        return false;
    }
    // userpw값과 userpw_ch값이 다르면 실행.
    if (userpw.value != userpw_ch.value) {
        alert('비밀번호가 다릅니다. 다시 입력해주세요.');
        userpw_ch.focus();
        return false;
    }
    // username값이 비어있으면 실행.
    if (username.value == '') {
        alert('이름을 입력해주세요.');
        username.focus();
        return false;
    }
    // 한글 이름 형식 정규식
    const expNameText = /[가-힣]+$/;
    // username값이 정규식에 부합한지 체크
    if (!expNameText.test(username.value)) {
        alert("이름 형식이 맞지않습니다. 형식에 맞게 입력해주세요.");
        username.focus();
        return false;
    }
    // userphone값이 비어있으면 실행.
    if (userphone.value == '') {
        alert('핸드폰 번호를 입력해주세요.');
        userphone.focus();
        return false;
    }

    // 번호를 입력 안했을 경우
    if (userphone.value == '') {
        alert('핸드폰 번호를 입력해주세요.');
        userphone.focus();
        return false;
    }
    // 번호 형식이 다를 경우
    const expHpText = /^\d{3}-\d{3,4}-\d{4}$/; // 000-0000-0000 형식!!
    if (!expHpText.test(userphone.value)) {
        alert('핸드폰 번호 형식이 맞지않습니다. 형식에 맞게 입력해주세요.');
        userphone.focus()
        return false;
    }
    // useremail값이 비어있으면 알림창을 띄우고 input에 포커스를 맞춘 뒤 False를 리턴한다.
    if (useremail.value == '') {
        alert('이메일을 입력해주세요.');
        useremail.focus();
        return false;
    }
    // 이메일 형식 정규식
    const expEmailText = /^[A-Za-z0-9\.\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z0-9\.\-]+$/;
    // useremail값이 정규식에 부합한지 체크
    if (!expEmailText.test(useremail.value)) {
        alert('Please check the format your E-mail.');
        useremail.focus();
        return false;
    }
    // usertage를 하나 이상 선택 시 체크할 flag 변수 지정
    let flag = false;
    let i = 0;
    // usertage를 하나 이상 선택 시 flag값에 true 대입
    for (i = 0; i < usertage.length; i++) {
        if (usertage[i].checked) {
            flag = true;
            break;
        }

    }
    // flag값이 false일 때(usertage를 체크하지 않았을 때) 실행.
    if (!flag) {
        alert("3개의 태그를 선택해주세요.");
        return false;
    }
    else if (i > 3) {
        alert("3개의 태그를 선택해주세요.");
    }
    // 유효성 검사 정상 통과 시 true 리턴 후 form 제출.
    return true;
}

const checkId = () => {
    // userid, result 변수에 대입
    const userid = document.regiform.userid;
    const result = document.querySelector('#result');

    // 중복체크 시에 한번 더 userid 입력값 체크
    if (userid.value == '') {
        alert('아이디를 입력해주세요.');
        userid.focus();
        return false;
    }
    if (userid.value.length < 4 || userid.value.length > 12) {
        alert("아이디는 4자 이상 12자 이하로 입력해주세요.");
        userid.focus();
        return false;
    }

    // Ajax를 사용한 아이디 중복 체크
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                let txt = xhr.responseText.trim();
                if (txt == "O") {
                    result.style.display = "block";
                    result.style.color = "green";
                    result.innerHTML = "사용할 수 있는 아이디입니다.";
                } else {
                    result.style.display = "block";
                    result.style.color = "red";
                    result.innerHTML = "중복된 아이디입니다.";
                    userid.focus();
                    // 키 입력 시 result 숨김 이벤트
                    userid.addEventListener("keydown", function () {
                        result.style.display = "none";
                    });
                }
            }
        }
    }
    xhr.open("GET", "checkId_ok.php?userid=" + userid.value, true);
    xhr.send();
}