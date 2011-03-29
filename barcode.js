// UPC Info: http://en.wikipedia.org/wiki/Universal_Product_Code
var UPC = (function UPC() {
    // Digits 0 - 9: left side, right side
    var Encoding = [
        "0001101", "1110010",  // 0
        "0011001", "1100110",  // 1
        "0010011", "1101100",  // 2
        "0111101", "1000010",  // 3
        "0100011", "1011100",  // 4
        "0110001", "1001110",  // 5
        "0101111", "1010000",  // 6
        "0111011", "1000100",  // 7
        "0110111", "1001000",  // 8
        "0001011", "1110100"]; // 9

    // bar code: START (LLLLLL) MIDDLE (RRRRRR) END
    var Wall = ["000000000101", "01010", "101000000000"];

    return {
        bits: function(upc_code) {
            // ***** Pre Condition - UPC is string of 12 digits ******
            var i, left = "", right = "", digit;

            for (i = 0; i < 12; i++) {
                digit = upc_code.charCodeAt(i) - 48;
                if (i < 6) {
                    left += Encoding[digit * 2];
                } else {
                    right += Encoding[digit * 2 + 1];
                }
            }

            return Wall[0] + left + Wall[1] + right + Wall[2];            
        },
        
        render: function(canvas_name, upc_code, width) { 
            var i, len, x, y, bits;
            bits = this.bits(upc_code);
            len = bits.length;
            console.log(bits);
            y = 120;
            canvas = document.getElementById(canvas_name);
            if (canvas.getContext) {    
                context = canvas.getContext('2d'); 
                context.lineWidth=width;
                for (i = 0; i < len; i++) {
                   if (bits[i] == '1') {
                       context.strokeStyle='#000';
                       context.beginPath();
                       x = i * width;
                       context.moveTo(x, 0);
                       context.lineTo(x, y);
                       context.stroke(); 
                   } else {
                       context.strokeStyle='#eee';
                       context.beginPath();
                       x = i * width;
                       context.moveTo(x, 0);
                       context.lineTo(x, y);
                       context.stroke(); 
                   }
                }
             }
        }
    };
})();

// to test in node
//    console.log(UPC.bits("785247125975"));




