//Request gui form
function banUser(user_id){
    $.ajax({
        type: "put",
        url: "/admin/user/ban/"+user_id,
        success: function (response) {
            $(".user-modal-alert-success").find("span").text(response.message);
            $(".user-modal-alert-success").removeClass("d-none")
            // updateInfo();
            userInfoCurrent = Object.assign(user_id);
            $("#input-btn-reset-user").click();
        },
        error: function (error){
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").removeClass("d-none")
            // console.log("That bai");
            console.log(error);
        }
    });
}

function banUser(user_id){
    $.ajax({
        type: "put",
        url: "/admin/user/ban/"+user_id,
        success: function (response) {
            $(".user-modal-alert-success").find("span").text(response.message);
            $(".user-modal-alert-success").removeClass("d-none")
            // updateInfo();
            userInfoCurrent = Object.assign(user_id);
            $("#input-btn-reset-user").click();
        },
        error: function (error){
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").removeClass("d-none")
            // console.log("That bai");
            console.log(error);
        }
    });
}

function approve(user_id){
    $.ajax({
        type: "put",
        url: "/admin/user/approve/"+user_id,
        success: function (response) {
            $(".user-modal-alert-success").find("span").text(response.message);
            $(".user-modal-alert-success").removeClass("d-none")
            // updateInfo();
            userInfoCurrent = Object.assign(user_id);
            $("#input-btn-reset-user").click();
        },
        error: function (error){
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").removeClass("d-none")
            // console.log("That bai");
            console.log(error);
        }
    });
}

function cancel(user_id){
    $.ajax({
        type: "put",
        url: "/admin/user/cancel/"+user_id,
        success: function (response) {
            $(".user-modal-alert-success").find("span").text(response.message);
            $(".user-modal-alert-success").removeClass("d-none")
            // updateInfo();
            userInfoCurrent = Object.assign(user_id);
            $("#input-btn-reset-user").click();
        },
        error: function (error){
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").removeClass("d-none")
            // console.log("That bai");
            console.log(error);
        }
    });
}