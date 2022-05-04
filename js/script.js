let btnMail = document.querySelector("#btnForMail");
let mailWindow = document.querySelector(".window");
let mailWindowContent = document.querySelector(".window-block");
let mailWindowBg = document.querySelector(".window-bg");
let mailWindowExitBtn = document.querySelector(".exitBtn");
let btn = document.querySelectorAll(".btnClick");
let btnShadow = document.querySelectorAll(".btn-shadow");
let cs = 1;
let nameLogin = document.getElementById("inp1");
let telLogin = document.getElementById("inp2");
let outLineInp1 = document.querySelector("#outLineInp1");
let outLineInp2 = document.querySelector("#outLineInp2");
let sendMailBtn = document.querySelector("#sendMailBtn");

const arr = new Map([
  [nameLogin, outLineInp1],
  [telLogin, outLineInp2]
]);

$(".phone_mask").mask("+7 (999) 999-99-99");

nameLogin.addEventListener('mousedown',function(){
    unfocus(telLogin);
    focus(nameLogin);
});
telLogin.addEventListener('mousedown',function(){
    unfocus(nameLogin);
    focus(telLogin);
});

sendMailBtn.addEventListener('click', function () {
    unfocus(nameLogin);
    unfocus(telLogin);
    if (nameLogin.value != "" && telLogin.value != "") {
        send(nameLogin.value, telLogin.value);
    } else {
        if (nameLogin.value == "") {
            error(nameLogin);
            nameLogin.placeholder = "Аты-жөнін теріңіз";
        }
        if (telLogin.value == "") {
            error(telLogin);
            telLogin.placeholder = "Телефон нөмерін теріңіз";
        }
    }
})

function unfocus(t){
    arr.get(t).style.border = "none";
}
function focus(t) {
    arr.get(t).style.border = "1px solid gold";
}
function error(t) {
    arr.get(t).style.border = "1px solid red";
}

btnMail.addEventListener('click', function () {
    mailWindow.style.display = "block";
    setTimeout(function () {
        mailWindow.style.opacity = "1";
    }, 100);
    setTimeout(function () {
        mailWindowContent.style.opacity = "1";
        mailWindowContent.style.top = "100px";
    }, 400);
});

mailWindowBg.addEventListener('click', exitStatus);
mailWindowExitBtn.addEventListener('click', exitStatus);


function exitStatus() {
    mailWindow.style.opacity = "0";
    mailWindowContent.style.opacity = "0";
    mailWindowContent.style.top = "0px";
    setTimeout(function () {
        mailWindow.style.display = "none";
    }, 400);
}

for (let n = 0; n < btn.length; n++) {
    btn[n].addEventListener('mouseover', function () {
        hover(n);
    });
    btn[n].addEventListener('mouseout', function () {
        unhover(n);
    });
}

for (let n = 0; n < btn.length; n++) {
    btnAnimate(n);
}

function btnAnimate(n) {
    setInterval(function () {
        if (cs == 1) {
            btn[n].style.transition = "0s";
            setTimeout(function () {
                btn[n].style.backgroundPosition = "80% 50%";
            }, 100);
            setTimeout(function () {
                btn[n].style.transition = ".7s";
                btn[n].style.backgroundPosition = "20% 50%";
            }, 200);
        }
    }, 2500);
};

function hover(d) {
    cs=0;
    btn[d].style.transition="0s";
    btn[d].style.background="#FFC52F";
    setTimeout(function(){
        btn[d].style.background="#DCA618";
    },10);
}
function unhover(d) {
    setTimeout(function(){
        btn[d].style.background="linear-gradient(115deg, rgb(255, 197, 47) 44%, rgb(255, 255, 178) 50%, rgb(255, 197, 47) 56%)";
        btn[d].style.backgroundSize = "400% 400%";
        cs=1;
    },10);

}

function send(name, phone) {
    $.ajax({
        type: "POST",
        url: 'mail.php',
        data: $('#loginform').serialize(),
        success: function (response) {
            var jsonData = JSON.parse(response);

            // user is logged in successfully in the back-end
            // let's redirect
            if (jsonData.success == "1") {
                console.log("Сообщение отправлено");
            } else {
                console.log("Ошибка отправки");
            }
        }
    });
}
