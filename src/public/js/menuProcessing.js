var toggle = false;
document.getElementById('avt-pic').onclick = function(){
    if(toggle == false){
        document.getElementById('user-profile').style.display = 'block';
        toggle = true;
        console.log('Click');
    }
    else{
        document.getElementById('user-profile').style.display = 'none';
        toggle = false;
        console.log('Click');
    }
};
