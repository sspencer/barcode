function UpcEncoder() {
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

    // 113 bits per 12 digit upc code (must be 12 digits)
    return function(str) {
        // ***** Pre Condition - UPC is string of 12 digits ******
        var i, left = "", right = "", digit, offset;

        for (i = 0; i < 12; i++) {
            digit = str.charCodeAt(i) - 48;
            if (i < 6) {
                left += Encoding[digit * 2];
            } else {
                right += Encoding[digit * 2 + 1];
            }
        }

        return Wall[0] + left + Wall[1] + right + Wall[2];
    };
}

var encode = UpcEncoder();

var upc = "785247125975";
console.log("UPC=" + encode(upc));