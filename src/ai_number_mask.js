( function(){// class NumberMask {
//  test = function( msg = 'hi' ){
//     return msg;
//   }
// }

// export default NumberMask;



const numberRegex            = /([\#]+)/g;
const nonNumberPatternRegex  = /([^\#])/g;
const numberPattern          = '#';
const nonNumberRegEx         = /([^\d])+/;

parseNumber = function( msg, parserString  ){
}


escapeRegex  = function( str ){
  var res = str;
  var escapeSyntax = '*^~$()[]';
  if( escapeSyntax.indexOf( str ) >= 0 ){
    str =  ( "\\" + str );
  }
  return res;
}; 

generateRegex = function( pattern, _wholeWords ) {
  var str = '';
  var wholeWords = ( _wholeWords || false );
  for( var i = 0; i < pattern.length; i++ ) {
    let _char =  pattern[i];
    if( _char == "#" ){
      str += "\\d";
    } else {
      str += escapeRegex( _char );
    }
  }
  str = '(' + str + ')';
  if( wholeWords === true ) {
    str = '^' + str + "$";
  }
  return  new RegExp( str );
};

getNumberWithPattern = function( a, pattern ){
  var res = a;
  let len = a.length; 
  if( len == 0 ){
    /** return as is **/
  
  } else if( nonNumberRegEx.exec( a ) != null ){
    let patternLen  = pattern.length;
    let currentPatternStr = pattern.substring( 0, len );
    var patternRegex = generateRegex( currentPatternStr, true);
    if( patternLen > len ) {
      let nextChar = pattern[ len ];
      if( nextChar != numberPattern ) {
        /* 
         * if so far pattern matches and next one is the 
         * character then add next charcter. 
         */
        if( patternRegex.exec( res ) ) {
            res += nextChar;          
        }
        
      }
    }
  } else {
    /**
     * TODO: Number Only for Pattern
     */
    let initialString     = '';
    var nonNumberMatchRes = pattern.match( nonNumberPatternRegex )
    if( nonNumberMatchRes != null ) {
      /**
       * Pattern starts from non number. 
       */
      initialString += nonNumberMatchRes[0];
    }
    for( var i = 0; i < len; i ++ ) {
      initialString += a[i];
      initialString = getNumberWithPattern( initialString, pattern );
    }
    res = initialString;  
  }
  return res;
  
}

}).call(this);