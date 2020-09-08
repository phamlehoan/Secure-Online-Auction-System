//Tạo các controller của hệ thống. muốn làm việc với dữ liệu thì phải thông qua service

let homepage = (req,res)=>{
    return res.send("Hello Sercure Online Auction System");
}

//Được import vào file index.js cùng thư mục
module.exports = {
    homepage : homepage
}