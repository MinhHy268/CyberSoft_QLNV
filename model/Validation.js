var Validation = function () {
    this.kiemTraRong = function (value, name, selectorError) {
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + 'không được bỏ trống';
            return false;
        } else {
            document.querySelector(selectorError).innerHTML = '';
            switch (name) {
                case 'Mã nhân viên ':
                    return this.kiemTraDoDai(value, name, selectorError, 6, 4);
                case 'Tên nhân viên ':
                    return this.kiemTraKiTu(value, name, selectorError);

                case 'Lương cơ bản ':
                    return this.kiemTraMaxMin(value, name, selectorError, 20000000, 1000000);

                case 'Số giờ làm trong tháng ':
                    return this.kiemTraMaxMin(value, name, selectorError, 150, 50);

            }
            return true;
        }
    }
    this.kiemTraKiTu = function (value, name, selectorError) {
        var regexLetter = /^[a-z A-Z]+$/;
        if (!regexLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = name + ' tất cả phải là chữ!';
            return false;
        } else {
            document.querySelector(selectorError).innerHTML = ' ';
            return true;
        }
    }
    this.kienTraTatCaSo = function (value, name, selectorError) {
        var regexNumber = /^[0-9]+$/;
        if (!regexNumber.test(value)) {
            document.querySelector(selectorError).innerHTML = name + ' tất cả phải là số!';
            return false;
        } else {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
    }
    this.kiemTraMaxMin = function (value, name, selectorError, maxValue, minValue) {
        if (Number(value) < minValue || Number(value) > maxValue) {
            var minValueFix = minValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var maxValueFix = maxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.querySelector(selectorError).innerHTML = name + ' chỉ được phép từ ' + minValueFix + ' đến ' + maxValueFix + ' !';
            return false;
        } else {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
    }
    this.kiemTraDoDai = function (value, name, selectorError, maxLength, minLength) {
        if (value.trim().length < minLength || value.trim().length > maxLength) {
            console.log('object');
            document.querySelector(selectorError).innerHTML = name + ' chỉ được phép từ ' + minLength + ' đến ' + maxLength + ' kí tự!';
            return false;
        } else {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
    }
}