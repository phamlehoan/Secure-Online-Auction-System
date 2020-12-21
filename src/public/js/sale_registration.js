function getUserInfoUpdate1(){
    $("#i-id").bind("change",function(){
        userInfo["personalInfo.identifyCard.ID"] = $(this).val();
        let regexID = new RegExp(/^[0-9]{9}$/);
        if(!regexID.test(userInfo["personalInfo.identifyCard.ID"]) || userInfo["personalInfo.identifyCard.ID"].length!=9 )
        {
            alertify.notify("Identity number must be number and only contains 9 digits","error",7)
            $(this).val(userInfoCurrent["personalInfo.identifyCard.ID"]);
            delete userInfo["personalInfo.identifyCard.ID"];
            return false;
        }
    })

    $("#i-cdate").bind("change",function(){
        userInfo["personalInfo.identifyCard.dateOfIssue"] = $(this).val();
        alertify.notify(user.info,"error",7)
        let d = new Date();
        let dataDay = userInfo["personalInfo.identifyCard.dateOfIssue"].split("-")[2];
        let dataMonth = userInfo["personalInfo.identifyCard.dateOfIssue"].split("-")[1];
        let dataYear = userInfo["personalInfo.identifyCard.dateOfIssue"].split("-")[0];
        let dateNow = d.getDate();
        let monthNow = d.getMonth() + 1;
        let yearNow = d.getFullYear();
        let dataDATE = dataYear+"/"+dataMonth+"/"+dataDay
        let nowDATE = yearNow+"/"+monthNow+"/"+dateNow
        if((new Date(dataDATE).valueOf() > new Date(nowDATE).valueOf()))
        {
            alertify.notify("Invalid day","error",7)
            $(this).val(userInfoCurrent["personalInfo.identifyCard.dateOfIssue"]);
            delete userInfo["personalInfo.identifyCard.dateOfIssue"];
            return false;
        }

    })

    $("#i-issued").bind("change",function(){
        userInfo["personalInfo.identifyCard.address"] = $(this).val();
        let regexUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);
        if(!regexUsername.test(userInfo["personalInfo.identifyCard.address"]) || userInfo["personalInfo.identifyCard.address"].length < 1 || userInfo["personalInfo.identifyCard.address"].length >15)
        {
            alertify.notify("Address is not valid","error",7)
            $(this).val(userInfoCurrent["personalInfo.identifyCard.address"]);
            delete userInfo["personalInfo.identifyCard.address"];
            return false;
        }
    })

    
}

function resetInfo1(){
    $("#i-id").val("");
}

//Click update
function clickSubmitButton(){
    $("#input-btn-submit").bind("click",function(){
        requestInfo1();
    })
}

//Click reset
function clickResetUserInfo1(){
    $("#input-btn-reset").bind("click",function(){
        resetInfo1()
    })
}

//Request gui form
function requestInfo1(){
    $.ajax({
        type: "put",
        url: "/user/update-seller",
        data: userInfo,
        success: function (response) {
            alertify.notify("success","error",7);
        //    $(".user-modal-alert-success").find("span").text(response.message);
        //    $(".user-modal-alert-success").removeClass("d-none")
            // updateInfo();
            console.log(userInfo);
            userInfoCurrent = Object.assign(userInfoCurrent,userInfo);
        //    $("#input-btn-reset-user").click();
        },
        error: function (error){
            alertify.notify("error","error",7);
            console.log("2");
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").removeClass("d-none")
            // //Reset lại mọi thứ.
            $("#input-btn-reset-user").click();
            // console.log("That bai");
            console.log(error);
        }
    });

}

$(document).ready(function () {
    getUserInfoUpdate1();
    clickSubmitButton();
    clickResetUserInfo1();
});
