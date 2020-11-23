var quanLyNhanVienService = function(){
    this.layThongTinNhanVien = function () {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
            method: 'GET'// Phương thúc do backend quy định
        });
        return promise;
    }
    this.xoaNhanVien = function (maNhanVien) {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=' + maNhanVien,
            method: 'DELETE'// Phương thúc do backend quy định
        });
        return promise;
    }
    this.themNhanVien = function (nv) {
        var promise = axios({
            url:'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
            method: 'POST',// Phương thúc do backend quy định
            data: nv
        });
        return promise;
    }
    this.layGiaTriNhanVien = function (maNhanVien) {
        var promise = axios({
            url:'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien='+maNhanVien,
            method:'GET',
        });
        return promise;
    }
    this.capNhatNhanVien = function (nv) {
        var promise = axios({
            url:'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien='+nv.maNhanVien,
            method:'PUT',
            data:nv
        });
        return promise;
    }
}