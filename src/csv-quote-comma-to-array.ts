/*
Copyright 2020 Alex Harui

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included 
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
*/

/**
 * Parse a line of quote-comma into an array of values
 * @param lineOfCSV line of text
 */
export function CSVQuoteCommaToArray(lineOfCSV:string):(string|number)[] {
  let numString = "";
  let textString = "";
  let output:(string|number)[] = [];
  let couldBeInt = true;
  let couldBeNumber = true;
  let inQuote = false;
  let sawDecimal = false;
  let n = lineOfCSV.length;
  for (let i = 0; i < n; i++) {
    let c = lineOfCSV.charAt(i);
	if (c == '\r') continue;
    if (inQuote) {
      if (c === '"') {
        inQuote = false;
      } else {
        textString += c;
        if (c === '.') {
           if (sawDecimal) {
             couldBeNumber = false;
           } else {
             couldBeInt = false;
           }
           sawDecimal = true;
           if (couldBeNumber) {
             numString += c;
           }
        } else if (c >= '0' && c <= '9') {
          numString += c;
        } else if (c !== ',' && c !== '$' && c !== '%' && c !== ' ') {
          couldBeInt = false;
          couldBeNumber = false;
        }
      }    
    } else {
      if (c === '"') {
        inQuote = true;
      } else if (c === ',') {
		if (textString.length === 0) {
		  output.push('');
		} else if (couldBeInt) {
          output.push(parseInt(numString, 10));
        } else if (couldBeNumber) {
          output.push(parseFloat(numString));
        } else {
          output.push(textString);
        }
        numString = "";
        textString = "";
        couldBeInt = true;
        couldBeNumber = true;
		    sawDecimal = false;
      } else {
        textString += c;
        if (c === '.') {
           if (sawDecimal) {
             couldBeNumber = false;
           } else {
             couldBeInt = false;
           }
           sawDecimal = true;
           if (couldBeNumber) {
             numString += c;
           }
        } else if (c >= '0' && c <= '9') {
          numString += c;
        } else if (c !== '$' && c !== '%' && c !== ' ') {
          couldBeNumber = false;
          couldBeInt = false;
        }
      }
    }
  }
  if (textString.length > 0) {
    if (couldBeInt) {
      output.push(parseInt(numString, 10));
    } else if (couldBeNumber) {
      output.push(parseFloat(numString));
    } else {
      output.push(textString);
    }
  }
  return output;
}
