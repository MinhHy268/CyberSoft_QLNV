var validate = new Validation();
var mangNhanVien = [];
document.querySelector('#submitForm').onclick = function () {
    var nv = new NhanVien();
    // 
    nv.maNhanVien = document.querySelector("#maNV").value;
    nv.tenNhanVien = document.querySelector("#tenNV").value;
    nv.chucVu = document.querySelector("#chucVu").value;
    nv.luongCoBan = document.querySelector("#luong").value;
    nv.soGioLamTrongThang = document.querySelector("#gioLam").value;
    // thuộc tính thẻ select
    // .option: trả về mảng các đối tượng option trong thẻ select (giống như DOM đến tag name option)
    var mangOption = document.querySelector("#chucVu").options;
    var viTri = document.querySelector("#chucVu").selectedIndex;
    // Lấy ra thẻ option thứ selectedIndex 
    //.innerHTML => lấy ra innerHTML của thẻ option được chọn trong thẻ select
    nv.chucVu = mangOption[viTri].innerHTML;
    nv.heSoChucVu = mangOption[viTri].value;

     //-----------------------Kiểm tra rỗng-------------------//
     var isValid = true;
     isValid &= validate.kiemTraRong(nv.maNhanVien, 'Mã nhân viên ', '#validate-maNhanVien')
             & validate.kiemTraRong(nv.tenNhanVien, 'Tên nhân viên ', '#validate-tenNhanVien')
             & validate.kiemTraRong(nv.luongCoBan, 'Lương cơ bản ', '#validate-luongCoBan')
             & validate.kiemTraRong(nv.soGioLamTrongThang, 'Số giờ làm trong tháng ', '#validate-soGioLamTrongThang')
     if(!isValid){
         return;
     }
    mangNhanVien.push(nv);
    console.log('mảng sinh viên', mangNhanVien);
    renderTableNhanVien(mangNhanVien);
    saveDataLocalStorage(mangNhanVien);
}
var renderTableNhanVien = function (arrNhanVien) {
    var noiDungTable = '';
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nv = new NhanVien();
        nv.maNhanVien = arrNhanVien[i].maNhanVien;
        nv.tenNhanVien = arrNhanVien[i].tenNhanVien;
        nv.chucVu = arrNhanVien[i].chucVu;
        nv.heSoChucVu = arrNhanVien[i].heSoChucVu;
        nv.luongCoBan = arrNhanVien[i].luongCoBan;
        nv.luongCoBanFix = arrNhanVien[i].luongCoBan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        nv.soGioLamTrongThang = arrNhanVien[i].soGioLamTrongThang;
        
       
        noiDungTable +=
            `
        <tr>
            <td>${nv.maNhanVien}</td>
            <td>${nv.tenNhanVien}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.luongCoBanFix} VND</td>
            <td>${nv.tinhTongLuong()} VND</td>
            <td>${nv.soGioLamTrongThang} giờ</td>
            <td>${nv.xepLoaiTrongThang()}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaSinhVien('${nv.maNhanVien}')">Xóa</button>
            </td>
        </tr>
        `
    }
    document.querySelector('#tableNhanVien').innerHTML = noiDungTable;
}
var saveDataLocalStorage = function () {
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    localStorage.setItem('mangNhanVien', sMangNhanVien)
}
var getDatalocalStorage = function () {
    if (localStorage.getItem('mangNhanVien')) {
        var sMangNhanVien = localStorage.getItem('mangNhanVien');
        mangNhanVien = JSON.parse(sMangNhanVien);
        renderTableNhanVien(mangNhanVien)
    }
}
var xoaSinhVien = function (maSV) {
    for (var i = mangNhanVien.length - 1; i >= 0; i--) {
        var sv = mangNhanVien[i];
        if (sv.maNhanVien === maSV) {
            mangNhanVien.splice(i, 1);
        }
    }
    renderTableNhanVien(mangNhanVien)
    saveDataLocalStorage()
}
getDatalocalStorage();