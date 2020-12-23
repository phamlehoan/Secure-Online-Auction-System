let userInfo = {};
let userInfoCurrent = {};
let originUserUpdate = {};
let userUpdatePassword={};


//Lay info user hien tai
function getUserInfoCurrent(){
    userInfoCurrent.username = $("#input-ursname").val();
    userInfoCurrent["personalInfo.firstname"]= $("#input-firstname").val();
    userInfoCurrent["personalInfo.lastname"] = $("#input-lastname").val();
    userInfoCurrent["personalInfo.dob"] = $("#input-dob").val();
    userInfoCurrent.gender = $("#input-gender").children("option:selected").val();
    userInfoCurrent.phone = $("#input-phonenumber").val();
    userInfoCurrent["personalInfo.address.city"] = $("#input-city").val();
    userInfoCurrent["personalInfo.address.district"] = $("#input-district").val();
    userInfoCurrent["personalInfo.address.detailAddress"] = $("#input-address").val();
}
//Lay info user sau khi nhap vao
function getUserInfoUpdate(){
    $("#input-ursname").bind("change",function(){
        userInfo.username = $(this).val();
        let regexUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);
        if(!regexUsername.test(userInfo.username) || userInfo.username.length < 1 || userInfo.username.length >30)
        {
            alertify.notify("Username limited from 1-30 characters and does not contain special characters","error",7)
            $(this).val(userInfoCurrent.username);
            delete userInfo.username;
            return false;
        }
    })
    $("#input-firstname").bind("change",function(){
        userInfo["personalInfo.firstname"] = $(this).val();
        let regexUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);
        if(!regexUsername.test(userInfo["personalInfo.firstname"]) || userInfo["personalInfo.firstname"].length < 1 || userInfo["personalInfo.firstname"].length >15)
        {
            alertify.notify("First Name limited from 1-15 characters and does not contain special characters","error",7)
            $(this).val(userInfoCurrent["personalInfo.firstname"]);
            delete userInfo["personalInfo.firstname"];
            return false;
        }
    })
    $("#input-lastname").bind("change",function(){
        userInfo["personalInfo.lastname"] = $(this).val();
        let regexUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);
        if(!regexUsername.test(userInfo["personalInfo.lastname"]) || userInfo["personalInfo.lastname"].length < 1 || userInfo["personalInfo.lastname"].length >15)
        {
            alertify.notify("Last Name limited from 1-15 characters and does not contain special characters","error",7)
            $(this).val(userInfoCurrent["personalInfo.lastname"]);
            delete userInfo["personalInfo.lastname"];
            return false;
        }
    })
    $("#input-dob").bind("change",function(){
        userInfo["personalInfo.dob"] = $(this).val();
        let d = new Date();
        let dataDay = userInfo["personalInfo.dob"].split("-")[2];
        let dataMonth = userInfo["personalInfo.dob"].split("-")[1];
        let dataYear = userInfo["personalInfo.dob"].split("-")[0];
        let dateNow = d.getDate();
        let monthNow = d.getMonth() + 1;
        let yearNow = d.getFullYear();
        let dataDATE = dataYear+"/"+dataMonth+"/"+dataDay
        let nowDATE = yearNow+"/"+monthNow+"/"+dateNow
        if((new Date(dataDATE).valueOf() > new Date(nowDATE).valueOf()))
        {
            alertify.notify("Birthday must be less than current date","error",7)
            $(this).val(userInfoCurrent["personalInfo.dob"]);
            delete userInfo["personalInfo.dob"];
            return false;
        }

    })
    $("#input-gender").bind("change",function(){
        userInfo.gender = $(this).children("option:selected").val();
    });
    $("#input-phonenumber").bind("change",function(){
        userInfo.phone = $(this).val();
        let regexPhone = new RegExp(/^(0)[0-9]{9,10}$/);
        if(!regexPhone.test(userInfo.phone) || userInfo.phone.length < 10 || userInfo.phone.length >11)
        {
            alertify.notify("Number phone is number, start by 0, and limited from 10-11 characters","error",7)
            $(this).val(userInfoCurrent.phone);
            delete userInfo.phone;
            return false;
        }
    })
    $("#input-city").bind("change",function(){
        userInfo["personalInfo.address.city"] = $(this).val();
        if(userInfo["personalInfo.address.city"].length < 1 || userInfo["personalInfo.address.city"].length >30)
        {
            alertify.notify("City limited from 1-30 characters","error",7)
            $(this).val(userInfoCurrent["personalInfo.address.city"]);
            delete userInfo["personalInfo.address.city"];
            return false;
        }
    })
    $("#input-district").bind("change",function(){
        userInfo["personalInfo.address.district"] = $(this).val();
        if(userInfo["personalInfo.address.district"].length < 1 || userInfo["personalInfo.address.district"].length >30)
        {
            alertify.notify("District limited from 1-30 characters","error",7)
            $(this).val(userInfoCurrent["personalInfo.address.district"]);
            delete userInfo["personalInfo.address.district"];
            return false;
        }
    })
    $("#input-address").bind("change",function(){
        userInfo["personalInfo.address.detailAddress"] = $(this).val();
        if(userInfo["personalInfo.address.detailAddress"].length < 1 || userInfo["personalInfo.address.detailAddress"].length >100)
        {
            alertify.notify("Detail address limited from 1-100 characters","error",7)
            $(this).val(userInfoCurrent["personalInfo.address.detailAddress"]);
            delete userInfo["personalInfo.address.detailAddress"];
            return false;
        }
    })
}
//Tra cac field ve mac dinh
function resetInfo(){
    $("#input-ursname").val(userInfoCurrent.username);
    $("#input-firstname").val(userInfoCurrent["personalInfo.firstname"]);
    $("#input-lastname").val(userInfoCurrent["personalInfo.lastname"]);
    $("#input-dob").val(userInfoCurrent["personalInfo.dob"]);
    $("#input-gender").val(userInfoCurrent.gender);
    $("#input-phonenumber").val(userInfoCurrent.phone);
    $("#input-city").val(userInfoCurrent["personalInfo.address.city"]);
    $("#input-district").val(userInfoCurrent["personalInfo.address.district"]);
    $("#input-address").val(userInfoCurrent["personalInfo.address.detailAddress"]);
}
//Update cac field
function updateInfo(){
    $("#input-ursname").val(userInfo.username);
    $("#input-firstname").val(userInfo["personalInfo.firstname"]);
    $("#input-lastname").val(userInfo["personalInfo.lastname"]);
    $("#input-dob").val(userInfo["personalInfo.dob"]);
    $("#input-gender").val(userInfo.gender);
    $("#input-phonenumber").val(userInfo.phone);
    $("#input-city").val(userInfo["personalInfo.address.city"]);
    $("#input-district").val(userInfo["personalInfo.address.district"]);
    $("#input-address").val(userInfo["personalInfo.address.detailAddress"]);
}
//Request gui form
function requestInfo(){
    $.ajax({
        type: "put",
        url: "/user/update-profile",
        data: userInfo,
        success: function (response) {
            $(".user-modal-alert-success").find("span").text(response.message);
            $(".user-modal-alert-success").removeClass("d-none")
            console.log(response);
            // updateInfo();
            userInfoCurrent = Object.assign(userInfoCurrent,userInfo);
            $("#input-btn-reset-user").click();
            location.reload();
        },
        error: function (error){
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").removeClass("d-none")
            // //Reset lại mọi thứ.
            $("#input-btn-reset-user").click();
            // console.log("That bai");
        }
    });

}
//Click reset
function clickResetUserInfo(){
    $("#input-btn-reset-user").bind("click",function(){
        resetInfo()
    })
}
//Click update
function clickSaveUserInfo(){
    $("#input-btn-update-user").bind("click",function(){
        if($.isEmptyObject(userInfo))
        {
             alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu","error",7);
             return false;
        }
        requestInfo();
    })
}

function hadlerPassword(){
    //Xử lý textbox nhập mật khẩu cũ
    $("#input-change-current-password").bind("change",function (){
        let currentPassword = $(this).val();
        let regexCurrentPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&_-]{8,}$/);
        if(!regexCurrentPassword.test(currentPassword))
        {
            alertify.notify("Old password must contain at least 8 characters including uppercase, lowercase letters, numbers and special characters!","error",7)
            $(this).val(null);
            delete userUpdatePassword.currentPassword;
            return false;
        }
        userUpdatePassword.currentPassword=currentPassword;
    })
    //Xử lý textbox nhập mật khẩu mới
    $("#input-change-new-password").bind("change",function (){
        let newPassword = $(this).val();
        let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&_-]{8,}$/);

        if(!userUpdatePassword.currentPassword)
        {
            alertify.notify("You must enter old password!","error",7)
            $(this).val(null);
            delete userUpdatePassword.confirmPassword;
            return false;
        }
        if(!regexPassword.test(newPassword))
        {
            alertify.notify("New password must contain at least 8 characters including uppercase, lowercase letters, numbers and special characters!","error",7)
            $(this).val(null);
            delete userUpdatePassword.newPassword;
            return false;
        }
        userUpdatePassword.newPassword=newPassword;
    })
    //Xử lý textbox xác nhận mật khẩu
    $("#input-change-confirm-password").bind("change",function (){
        let confirmPassword = $(this).val();
        if(!userUpdatePassword.currentPassword)
        {
            alertify.notify("You must enter your old password!","error",7)
            $(this).val(null);
            delete userUpdatePassword.confirmPassword;
            return false;
        }
        if(!userUpdatePassword.newPassword)
        {
            alertify.notify("You must enter a new password!","error",7)
            $(this).val(null);
            delete userUpdatePassword.confirmPassword;
            return false;
        }
        if(confirmPassword !== userUpdatePassword.newPassword)
        {
            alertify.notify("Does not match the new password!","error",7)
            $(this).val(null);
            delete userUpdatePassword.confirmPassword;
            return false;
        }
        userUpdatePassword.confirmPassword=confirmPassword;
    })
}


function requestPassword(){
    $.ajax({
        type: "put",
        url: "/user/update-password",
        data: userUpdatePassword,
        success: function (response) {
            $(".user-modal-alert-success").find("span").text(response.message);
            $(".user-modal-alert-success").removeClass("d-none")

            //Reset lại mọi thứ.
            $("#input-btn-reset-pass").click();
            //Logout
            logoutSystem();
        },
        error: function (error){
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").removeClass("d-none")

            //Reset lại mọi thứ.
            $("#input-btn-reset-pass").click();
        }
    });
}

function clickSaveChangePassword(){
    $("#input-btn-update-pass").bind("click",function(){
        //Kiểm tra xem các ô có trống hay không
        if(!userUpdatePassword.currentPassword || !userUpdatePassword.newPassword || !userUpdatePassword.confirmPassword)
        {
            alertify.notify("You must change the information before you can update the data !","error",7);
             return false;
        }
        //Show dialog cần xác nhận thực hiện thay đổi
        Swal.fire({
            title: 'Are you sure to change the password ?',
            text: "You will not be able to undo this function!",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#2ECC71',
            cancelButtonColor: '#ff7675',
            confirmButtonText: 'Agree',
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if(!result.value){
                $("#input_btn_cancel_password").click();
                return false;
            }
            //Gửi request để update mật khẩu vào db
            requestPassword();

          })
    })
}

function clickCancelChangePassword(){
    $("#input-btn-reset-pass").bind("click",function(){
        userUpdatePassword = {}
        //Đưa các textbox về lại giá trị ban đầu
        $("#input-change-current-password").val(null);
        $("#input-change-new-password").val(null);
        $("#input-change-confirm-password").val(null);
    })
}
function logoutSystem(){
    let timeInteval;
    Swal.fire({
        position: 'top-end',
        title: 'Automatically log out after 5 seconds',
        html: "Time <strong></strong>",
        showConfirmButton: false,
        timer: 5000,
        onBeforeOpen : () =>{
            //Hiển thị cái hình tròn loading
            Swal.showLoading();
            timeInteval = setInterval(()=>{
                Swal.getContent().querySelector("strong").textContent = Math.ceil(Swal.getTimerLeft()/1000);
            },1000)
        },
        onClose : ()=>{
            clearInterval(timeInteval);
        }
    }).then(result =>{
        $.get("/logout",()=>{
            location.reload();
        })
    })
}





$(document).ready(function () {
    // //Hàm lấy dữ diệu User để sau này reset
    // getInfoUser();
    // //Hàm xử lý khi update dữ liệu
    // updateUserInfo();
    getUserInfoCurrent();
    getUserInfoUpdate();
    hadlerPassword();
    //Xử lý khi nhấn nút Lưu lại thông tin người dùng
    clickSaveUserInfo();
    clickResetUserInfo();
    // //Xử lý khi nhấn nút Hủy bỏ thông tin người dùng
    // clickResetUserInformation();

    // //Xử lý khi nhấn lưu thay đổi mật khẩu
    clickSaveChangePassword();

    // //Xử lý khi nhấn hủy bỏ thay đổi mật khẩu
    clickCancelChangePassword();
});
