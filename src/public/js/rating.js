$(document).on('click','.btn-review',function(){
  $.ajax({
    type: "POST",
    url: "/user/feedback",
    data: {
      star : $( "input:checked" ).val(),
      content : $( "#new-review" ).val(),
      productId: $('#idProduct').val(),
      sellerId: $('#idSeller').val(),
    },
    success: function (response) {
      let text = "";
      for(var i=0 ; i< response.data.ratingStar; i++) {
        text +='<span class="fa fa-star checked"></span>'
      }
      $( "#new-review" ).val("");
      $(".comment-rating").prepend(`<div class="mt-2">
      <div class="row ">
        <div class="col-2 text-center" >
            <div class="avatar-user mb-1">
              <img src="${response.avatar}" id="avt-pic" alt="Avatar" class="d-inline rounded-circle" style="width:40%;">
            </div>
            <h5>${response.username}</h5>
            <p>2020-11-30 17:35</p>
            <p>${response.productname}</p>
        </div>
        <div class="col-8">
          <div class="rating-star">
            ${text}
          </div>
          <p>${response.data.content}</p>
        </div>
      </div>
    </div>
    <hr>`);
      alertify.notify("Feedback success. Thank you!!!","success",7)
    },
    error: function (error){
      console.log("Error");
    }
  });
});
