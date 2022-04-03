$(function(){
    //携帯機種のselect値を読み取り
    var model = document.getElementById('model');
    var mosel = "";
    model.onchange = function(){
        mosel = model.value;
      }
    var type = document.getElementById('type');

    //画像タイプのselect値を読み取り
    var tysel = "";
    type.onchange = function(){
        tysel = type.value;
      }

      //表示順序のselect値を読み取り
      var orsel = "";
      order.onchange = function(){
          orsel = order.value;
        }

    $('#search').on('click',function(){
        mosel = model.value;
        tysel = type.value;
        orsel = order.value;
        if(mosel == ""){
            alert("機種が選択されていません");
        }else if(tysel == ""){
            alert("画像タイプが選択されていません");
        }else{
            console.log(mosel);
            console.log(tysel);
                var url = "https://pixabay.com/api/?key=25206554-682001e1e56cf8a197b163c1e&per_page=200";
                var keyword = $("#keyword").val();

                if(keyword != "") {
                    url += "&q=" + encodeURIComponent(keyword);
                }

                url += "&image_type=" + tysel;
                url += "&order=" + orsel;
                    
                //画像サイズを機種に合わせる
                if(mosel == "all"){
                    
                    //全てを選択した場合はスルーする

                }else if(mosel == "iPhone7"){
                    url += "&orientation=vertical";
                    url += "&min_width=750"
                    url += "&min_height=1334" 
                }else if(mosel == "iPhoneX"){
                    url += "&orientation=vertical";
                    url += "&min_width=1125"
                    url += "&min_height=2436" 
                }else if(mosel == "iPhone11"){
                    url += "&orientation=vertical";
                    url += "&min_width=828"
                    url += "&min_height=1792" 
                }else if(mosel == "PC"){
                    url += "&orientation=horizontal";
                    url += "&min_width=1920"
                    url += "&min_height=1080" 
                }
                
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                })
                .done(function(data) {
                    console.log(data);
                    let len = data['hits']['length'];
                    let result = ""

                    //リザルト分forを回して画像を表示
                    for(let i = 0; i<len; i++){
                        //画像の処理  クリックしたら原寸大画像を表示
                        result += '<div class="pic_frame">'
                        result += '<a href="'+data['hits'][i]['largeImageURL']+'">'
                        result += '<img src="'+data['hits'][i]['previewURL']+'">';
                        result += '</a>'
        
                        //ボタンの処理    クリックしたら保存
                        result += '<p>'
                        result += '<a href="'+data['hits'][i]['largeImageURL']+'" download="'+data['hits'][i]['largeImageURL']+'" class="neon">'
                        result += '⇩DOWNLOAD'
                        result += '</a>'
                        result += '</p>'
        
                        result += '</div>'
                        result += '</src>'
                    }
                    $("#result").html(result);
                });    
        }
    })
})

/*
var colors = new Array(
    [62,35,255],
    [60,255,60],
    [255,35,98],
    [45,175,230],
    [255,0,255],
    [255,128,0]);
  
  var step = 0;
  //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0,1,2,3];
  
  //transition speed
  var gradientSpeed = 0.002;
  
  function updateGradient()
  {
    
    if ( $===undefined ) return;
    
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];
  
  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb("+r1+","+g1+","+b1+")";
  
  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb("+r2+","+g2+","+b2+")";
  
   $('#gradient').css({
     background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
      background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
    
    step += gradientSpeed;
    if ( step >= 1 )
    {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];
      
      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      
    }
  }
  
  setInterval(updateGradient,10);
*/  