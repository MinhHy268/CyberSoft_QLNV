// Khai báo lớp đối tượng trong javascript (class = prototype)
var NhanVien = function () {
    this.maNhanVien = '';
    this.tenNhanVien = '';
    this.luongCoBan = '';
    this.luongCoBanFix ='';
    this.chucVu = '';
    this.heSoChucVu = '';
    this.soGioLamTrongThang = '';
    this.tinhTongLuong = function () {
        var tongLuong = 0;
        // console.log('nhân viên', nv);
        if (this.chucVu == "Giám đốc") {
            tongLuong = Number(this.luongCoBan) * 3;
        } else if (this.chucVu == "Trưởng phòng") {
            tongLuong = Number(this.luongCoBan) * 2;
        } else {
            tongLuong = Number(this.luongCoBan);
        }
        return tongLuong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    this.xepLoaiTrongThang = function () {
        var xepLoai = '';
        if (this.soGioLamTrongThang >= 120) {
            xepLoai = 'Nhân viên xuất sắc';
        } else if (this.soGioLamTrongThang >= 100 && this.soGioLamTrongThang < 120) {
            xepLoai = 'Nhân viên giỏi';
        } else if (this.soGioLamTrongThang >= 80 && this.soGioLamTrongThang < 100) {
            xepLoai = 'Nhân viên khá';
        } else {
            xepLoai = 'Nhân viên trung bình';
        }
        return xepLoai;
    }
}