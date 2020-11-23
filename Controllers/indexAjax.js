var validate = new Validation();
var nvService = new quanLyNhanVienService();
var LoadDuLieuNhanVien = function(){
    // var objectAjax ={
    //     url:'http://nvcy.myclass.vn/api/NhanVienApi/LayDanhSachNhanVien',// Đường đẫn đến backend lấy dữ liệu (backend qui định)
    //     method: 'GET'// phương thức do backend qui định
    // }
    // //Dùng thư viện axios gọi về backend cung cấp thông tin cho backend
    // var promise = axios(objectAjax);
    var promise = nvService.layThongTinNhanVien();
    //Trường hợp request thành công
    promise.then(function(result){
        //Function sẽ tự động thực hiện ngay khi có dữ liệu thành công (request thành công)
        console.log(result.data);
        renderTableNhanVien(result.data);
    })
    //Trường hợp thât bại
    promise.catch(function(err){
        //Hàm này được kích hoạt khi request thất bại trả về lỗi
        console.log(err.result.data);
    })
}
//Viết hàm renderTable để hiển thị dữ liệu ra giao diện
var renderTableNhanVien = function (arrNhanVien) {
    var noiDungTable = '';
    for (var i = 0; i < arrNhanVien.length; i++) {


        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên từ trong mangNhanVien
        var nv = new NhanVien();
        nv.maNhanVien = arrNhanVien[i].maNhanVien;
        nv.tenNhanVien = arrNhanVien[i].tenNhanVien;
        nv.chucVu = arrNhanVien[i].chucVu;
        nv.heSoChucVu = arrNhanVien[i].heSoChucVu;
        nv.luongCoBan = arrNhanVien[i].luongCoBan;
        nv.luongCoBanFix = arrNhanVien[i].luongCoBan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        nv.soGioLamTrongThang = arrNhanVien[i].soGioLamTrongThang;
        noiDungTable += `
                <tr>
                    <td>${nv.maNhanVien}</td>
                    <td>${nv.tenNhanVien}</td>
                    <td>${nv.chucVu}</td>
                    <td>${nv.luongCoBanFix} VND</td>
                    <td>${nv.tinhTongLuong()} VND</td>
                    <td>${nv.soGioLamTrongThang} giờ</td>
                    <td>${nv.xepLoaiTrongThang()}</td>
                    <td>
                        <button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button>      
                        <button class="btn btn-primary" onclick="chinhSua('${nv.maNhanVien}')"> chỉnh sửa </button>             
                    </td>
                </tr> 
        `
    }
    //dom đến thẻ tbody gán innerHTML của tbody = noiDungTable
    document.querySelector('#tableNhanVien').innerHTML = noiDungTable;
    // console.log(noiDungTable);
}
//gọi hàm load ngay khi giao diện vừa load lên
LoadDuLieuNhanVien();

//--------------------Post: thêm mới dữ liệu vào server thông qua backend---------------------//
var xuatThongTin = function(){
    //lấy thông tin từ người dùng nhập từ giao diện
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNV').value;
    nv.tenNhanVien = document.querySelector('#tenNV').value;
    nv.chucVu = document.querySelector('#chucVu').value == "1" ? "Nhân viên" : document.querySelector('#chucVu').value == "2" ? "Trưởng phòng" : "Giám đốc" ;
    nv.luongCoBan = document.querySelector('#luong').value;
    nv.soGioLamTrongThang = document.querySelector('#gioLam').value;
    var isValid = true;
     isValid &= validate.kiemTraRong(nv.maNhanVien, 'Mã nhân viên ', '#validate-maNhanVien')
             & validate.kiemTraRong(nv.tenNhanVien, 'Tên nhân viên ', '#validate-tenNhanVien')
             & validate.kiemTraRong(nv.luongCoBan, 'Lương cơ bản ', '#validate-luongCoBan')
             & validate.kiemTraRong(nv.soGioLamTrongThang, 'Số giờ làm trong tháng ', '#validate-soGioLamTrongThang')
     if(!isValid){
         return;
     }
    var promise = nvService.themNhanVien(nv);
    //Xử lý khi request thành công
    promise.then(function(result){
        console.log("Kết quả",result.data);
        // renderTableNhanVien(result.data)
        LoadDuLieuNhanVien();
    })
    //Xử lý ki request thất bại
    promise.catch(function(err){
        console.log(err.response.data);
    })
}
//----------------------------Delete: xóa dữ liệu server dựa vào api-------------------------------//
var xoaNhanVien = function(maNhanVien){
    // // console.log(maNhanVien);
    // //Gọi api request đến backend
    // var promise = axios({
    //     url:'http://nvcy.myclass.vn/api/NhanVienApi/XoaNhanVien?maNhanVien='+maNhanVien,
    //     method:'DELETE',
    // })
    var promise = nvService.xoaNhanVien(maNhanVien);
    //Xử lý khi xóa thông tin thành công
    promise.then(function(res){
        console.log(res.data);
        LoadDuLieuNhanVien();
    })
    //false
    promise.catch(function(err){
        console.log(err);
    })
}
//---------------------------Get: Lây thông tin tham số thông qua backend ------------------------//
var chinhSua = function(maNhanVien){
    // var promise = axios({
    //     url:'http://nvcy.myclass.vn/api/NhanVienApi/LayThongTinNhanVien?maNhanVien='+maNhanVien,
    //     method:'GET',

    // })
    var promise = nvService.layGiaTriNhanVien(maNhanVien);
    promise.then(function(res){
        console.log(res.data);
        document.querySelector('#maNV').value = res.data.maNhanVien;
        document.querySelector('#tenNV').value = res.data.tenNhanVien;
        document.querySelector('#chucVu').value = res.data.chucVu == "Nhân viên" ? "1" : res.data.chucVu == "Trưởng phòng" ? "2" : "3";
        document.querySelector('#luong').value = res.data.luongCoBan;
        document.querySelector('#gioLam').value = res.data.soGioLamTrongThang;
    })
}
var capNhatThongTin = function(){
    //Lấy thông tin ngườu dùng nhập vào giao diện
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNV').value;
    nv.tenNhanVien = document.querySelector('#tenNV').value;
    nv.chucVu = document.querySelector('#chucVu').value == "1" ? "Nhân viên" : document.querySelector('#chucVu').value == "2" ? "Trưởng phòng" : "Giám đốc" ;
    nv.luongCoBan = document.querySelector('#luong').value;
    nv.soGioLamTrongThang = document.querySelector('#gioLam').value;
    //GỌi api
    // var promise = axios({
    //     url:'http://nvcy.myclass.vn/api/NhanVienApi/CapNhatThongTinNhanVien?maNhanVien='+nv.maNhanVien,
    //     method:'PUT',
    //     data:nv
    // })
    var promise = nvService.capNhatNhanVien(nv)
    //Xử lý thành công
    promise.then(function(res){
        console.log(res.data);
        LoadDuLieuNhanVien();
    })
}