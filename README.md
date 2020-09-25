# Secure-Online-Auction-System
This is the Capstone 1 project at Duy Tan University

- Luồng chạy của code trong hệ thống:
Models->Services->Controlers->Router->index.js(file gốc)
+ Models: Tạo các Schema cho các collection và các lệnh truy vấn dữ liệu
+ Services: Viết những hàm làm việc với Database ở trong hệ thống
+ Controllers: Viết các chức năng của một router tương ứng nếu động đến Database thì sẽ gọi đến Services.
+ Router: Viết những router điều hướng của trang web
Ngoài ra:
+ Validation: Dùng để kiểm tra các dữ liệu đầu vào trên hệ thống
+ Lang: là nơi để viết các thông báo lỗi hoặc thành công 
+ Config: là nơi cài đặt cấu hình của hệ thống