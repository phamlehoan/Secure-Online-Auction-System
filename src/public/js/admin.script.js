//Request gui form
function banUser(user_id){
    $.ajax({
        type: "put",
        url: "/admin/user/ban/"+user_id,
        success: function (response) {
            document.getElementById(user_id+'_'+'ban').setAttribute("class", "p-1 fa fa-eye text-white bg-primary rounded");
            document.getElementById(user_id+'_'+'approve').removeAttribute("class");
            document.getElementById(user_id+'_'+'stt').setAttribute("class", "label label-danger");
            document.getElementById(user_id+'_'+'stt').innerHTML = "Banned";
            document.getElementById(user_id+'_'+'role').innerHTML = "banned";
            $(".user-modal-alert-success").find("span").text(response.message);
            $(".user-modal-alert-success").removeClass("d-none");
            userInfoCurrent = Object.assign(user_id);
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
            if(response.role == 'seller'){
                document.getElementById(user_id+'_'+'approve').setAttribute("class", "p-1 fa fa-times-circle text-white bg-danger rounded");
                document.getElementById(user_id+'_'+'stt').setAttribute("class", "label label-success");
                document.getElementById(user_id+'_'+'stt').innerHTML = "Accepted";
            }else{
                document.getElementById(user_id+'_'+'approve').setAttribute("class", "p-1 fa fa-check text-white bg-success rounded");
                document.getElementById(user_id+'_'+'stt').setAttribute("class", "label label-primary");
                document.getElementById(user_id+'_'+'stt').innerHTML = "Activated";
            }
            document.getElementById(user_id+'_'+'role').innerHTML = response.role;
            $(".user-modal-alert-success").find("span").text(response.message);
            $(".user-modal-alert-success").removeClass("d-none")
            userInfoCurrent = Object.assign(user_id, user_role);
        },
        error: function (error){
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").removeClass("d-none")
            // console.log("That bai");
            console.log(error);
        }
    });
}


// function toggle(user_id) {

// }

function showUser(user_id){
    $.ajax({
        type: "get",
        url: "/admin/user/"+user_id,
        success: function (response) {
            $(".ava_img").attr("src",response.user.avatarUrl);
            $("#user_name").text(response.user.personalInfo.firstname + ' ' + response.user.personalInfo.lastname);
            $("#user_role").text(response.user.role);
            $("#user_email").text(response.user.local.email);
            $("#user_phone").text(response.user.local.phone);
            $("#user_birthday").text(response.user.personalInfo.dob);
            $("#user_gender").text(response.user.gender);
            $("#user_address").text(response.user.personalInfo.address.detailAddress + ' - ' + response.user.personalInfo.address.district + ' - ' + response.user.personalInfo.address.city);
            $(".f").attr("src",response.user.personalInfo.identifyCard.fontCardUrl);
            $(".b").attr("src",response.user.personalInfo.identifyCard.backCardUrl);
            userInfoCurrent = Object.assign(user_id);
        },
        error: function (error){
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").removeClass("d-none")
            // console.log("That bai");
            console.log(error);
        }
    });
}


function showProduct(product_id){
    $.ajax({
        type: "get",
        url: "/admin/product/"+product_id,
        success: function (response) {
            console.log(response)
            $(".ava_img").attr("src",response.product.image);
            $("#p_name").text(response.product.name);
            $("#start_p").text(response.product.aucStartTime);
            $("#end_p").text(response.product.aucEndTime);
            $("#current_price").text(response.product.price);
            $("#price_step").text(response.product.priceStep);
            $("#reserve_price").text(response.product.reservePrice);
            $("#p_des").text(response.product.description);
            $("#user_id").text(response.product.userId);
        },
        error: function (error){
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").removeClass("d-none")
            // console.log("That bai");
            console.log(error);
        }
    });
}

function banProduct(product_id){
    console.log(product_id);
    $.ajax({
        type: "put",
        url: "/admin/product/ban/"+product_id,
        success: function (response) {
            console.log(response);
            document.getElementById(product_id+'_'+'stt').setAttribute("class", "label label-rounded label-danger");
            document.getElementById(product_id+'_'+'stt').innerHTML = "Rejected";
            document.getElementById(product_id+'_'+'ban').remove();
            $(".user-modal-alert-success").find("span").text(response.message);
            $(".user-modal-alert-success").removeClass("d-none");
            userInfoCurrent = Object.assign(user_id);
        },
        error: function (error){
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").removeClass("d-none")
            // console.log("That bai");
            console.log(error);
        }
    });
}