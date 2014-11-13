var gestures=["Dance","Greeting","Shocked","Eating","Religious Service","Stop","Feeling Cold","Thank You","Depressed"];
var countries=["Iran","China","India","United States","South Korea","Japan","Germany","Great Britain"];

var back="rgb(173,216,230)";
var back_highlight="rgb(79,148,205)";

var videos=new Array(gestures.length);
for(var i=0;i<gestures.length;i++){
	videos[i]=new Array(countries.length);
	for(var j=0;j<countries.length;j++){
		videos[i][j]="gesture"+j+i+".mp4";//"gesture0.mp4";
	}
}

var flag_ges=[],flag_cou=[];
for(var i=0;i<gestures.length;i++)
	flag_ges[i]=0;
for(var i=0;i<countries.length;i++)
	flag_cou[i]=0;

if(gestures.length>10){
	d3.select("body").selectAll(".selection1").select(".gestures_outer").select(".gestures_inner")
	  .style("height",(10*(i+1))+"%");
}
else{
	d3.select("body").selectAll(".selection1").select(".gestures_outer").select(".gestures_inner")
	  .style("height","100%");
}

var s1 = d3.select("body").selectAll(".selection1").select(".gestures_outer").select(".gestures_inner");
var ges1 = s1.selectAll("div")
			.data(gestures)
			.enter()
			.append("div")
			.attr("class",function(data,i){
				var name="ges"+i;
				return name;
			})
			.style("position","relative")
			.style("float","left")
			.style("top",function(data,i){
				var name=(5+i*2.5)+"pt";
				return name;
			})
			.style("left","0")
			.style("width","100%")
			.style("height",function(data,i){
				if(data.length<14) return "38pt";
				else return "52pt";
			})
			.style("background",back);	
ges1.append("p")
   .attr("class","ges")
   .text(function(data){
		return data;
	});
s1.selectAll("div")
  .data(gestures)
  .on("click", function(data,i){
  	var num=clicks_in(countries,flag_cou);
  	if(num>=2){
  		for(var k=0;k<gestures.length;k++){
  			if(flag_ges[k]==1){
  				flag_ges[k]=0;
  				s1.select(".ges"+k)
  	      		  .style("background",back);
  			}
  		}
  		flag_ges[i]=1;
  		s1.select(".ges"+i)
  	  	  .style("background",back_highlight);
  	}
  	else{
  		if(flag_ges[i]==0){
  			flag_ges[i]=1;
	  		s1.select(".ges"+i)
	  	  	  .style("background",back_highlight);
	  	}
	  	else{
	  		flag_ges[i]=0;
	  		s1.select(".ges"+i)
	  	      .style("background",back);
	  	}
  	}
  });
  
if(countries.length>10){
	d3.select("body").selectAll(".selection2").select(".countries_outer").select(".countries_inner")
	  .style("height",(10*(i+1))+"%");
}
else{
	d3.select("body").selectAll(".selection2").select(".countries_outer").select(".countries_inner")
	  .style("height","100%");
}  

var s2 = d3.select("body").selectAll(".selection2").select(".countries_outer").select(".countries_inner");
var ges2 = s2.selectAll("div")
			.data(countries)
			.enter()
			.append("div")
			.attr("class",function(data,i){
				var name="cou"+i;
				return name;
			})
			.style("position","relative")
			.style("float","left")
			.style("top",function(data,i){
				var name=(5+i*2.5)+"pt";
				return name;
			})
			.style("left","0")
			.style("width","100%")
			.style("height",function(data,i){
				if(data.length<21) return "38pt";
				else return "52pt";
			})
			.style("background",back);	
ges2.append("p")
   .attr("class","cou")
   .text(function(data){
		return data;
	});
s2.selectAll("div")
  .data(countries)
  .on("click", function(data,i){
  	var num=clicks_in(gestures,flag_ges);
  	if(num>=2){
  		for(var k=0;k<countries.length;k++){
  			if(flag_cou[k]==1){
  				flag_cou[k]=0;
  				s2.select(".cou"+k)
  	      		  .style("background",back);
  			}
  		}
  		flag_cou[i]=1;
  		s2.select(".cou"+i)
  	  	  .style("background",back_highlight);
  	}
  	else{
  		if(flag_cou[i]==0){
	  		flag_cou[i]=1;
	  		s2.select(".cou"+i)
	  	  	  .style("background",back_highlight);
	  	}
	  	else{
	  		flag_cou[i]=0;
	  		s2.select(".cou"+i)
	  	      .style("background",back);
	  	}
  	}
  });

var clicks_in=function(array,flag){
	var num=0;
	for(var k=0;k<array.length;k++){
		if(flag[k]==1) num++;
	}
	return num;
};

var compare=function(){
	var v=[];
	var sub_title=[];
	var num_ges=0,num_cou=0,ges=0,cou=0;
	for(var k=0;k<flag_ges.length;k++){
		if(flag_ges[k]==1){
			num_ges++;
			ges=k;
		}
	}
	for(var k=0;k<flag_cou.length;k++){
		if(flag_cou[k]==1){
			num_cou++;
			cou=k;
		}
	}
	if(num_ges>=1&&num_cou>=1){
		var height;
		if(num_ges==1&&num_cou>1){
			var num=0;
			for(var k=0;k<flag_cou.length;k++){
				if(flag_cou[k]==1){
					v[num]=new Array(2);
					v[num][0]=videos[ges][k];
					v[num][1]=countries[k];
					num++;
				}
			}
			height=num*169;
		}
		else if(num_ges>=1&&num_cou==1){
			var num=0;
			for(var k=0;k<flag_ges.length;k++){
				if(flag_ges[k]==1){
					v[num]=new Array(2);
					v[num][0]=videos[k][cou];
					v[num][1]=gestures[k];
					num++;
				}
			}
			height=num*169;
		}
		var s1 = d3.select("body").select(".videos").select(".videos_inner");
		s1.attr("height",height+100);
		s1.selectAll("div").remove();
		s1.selectAll("p").remove();
		s1.append("p")
		  .attr("class","title")
		  .text(function(){
		      if(num_ges==1) return "Gesture: "+gestures[ges];
		      return "Countries: "+countries[cou];
    	  });
		var ges1 = s1.selectAll("div")
					.data(v)
					.enter()
					.append("div")
					.attr("class","forvideo")
					.style("position","relative")
					.style("top","0")
					.style("left","0pt")
					.style("width","230pt")
					.style("height","160pt");//larger
		ges1
					.append("p")
					.attr("class","sub_title")
					.text(function(data,i){
						console.log(data);
		    		    return data[1];
    	 			 });
		var ges2=ges1.append("video")
					 .attr("id",function(data, i){
					 	return "myvideo"+i;
					 })
					 .style("position","relative")
					 .style("top","-5pt")
					 .attr("width","230pt")
					 .attr("height","160pt")//larger
					 .attr("preload","metadata")
					 .attr("controls","")
					 .attr("muted","")
					 .attr("autoplay","");
		ges2.append("source")
			.attr("src",function(data){
				return data[0];
			})
			.attr("type","video/mp4");
		ges2.append("source")
			.attr("src",function(data){
				return data[0].substring(0,data[0].length-3)+"ogg";
			})
			.attr("type","video/ogg");
			var canvas_top=-height;
		s1.selectAll("canvas").remove("canvas");	
		s1.append("canvas")
		  .attr("id","myCanvas")
		  .style("position","relative")
		  .style("top",(canvas_top)+"pt")
		  .style("left","190pt")//260
		  .attr("width","700pt")//646
		  .attr("height",(height*1.5)+"pt");
		
        var myCanvas = document.getElementById('myCanvas');
		/*setTimeout(function(){
			console.log(video.duration);
			while(video.currentTime<video.duration){
				var context = myCanvas.getContext('2d');
				console.log(video.currentTime/video.duration*820);
				context.drawImage(video, video.currentTime/video.duration*820, 0, 170, 120);
		        var dataURL = myCanvas.toDataURL();
			}
		}, 80);*/
		var inter=300;
		var ifend=[];
		for(var i=0;i<(num_cou>num_ges? num_cou:num_ges);i++) ifend[i]=0;
		var context = myCanvas.getContext('2d');
		context.globalAlpha = 1;
		var nnn=num_cou>num_ges? num_cou:num_ges;
		var p0=0;
		var interval=setInterval(function(){
			for(var i=0;i<nnn;i++){
				var video;var loc=0;
				if(p0<=2){
				if(ifend[i]!=1){
					var v_name="myvideo"+i;
					video = document.getElementById(v_name);	
					//context.drawImage(video, video.currentTime/video.duration*(820-400), 30+i*330, 400, 240);//larger
					context.drawImage(video, (p0-3)*170, 35+i*228, 190, 160);//larger
				}
				}
				if(p0>2){
				if(ifend[i]!=1){
					var v_name="myvideo"+i;
					video = document.getElementById(v_name);	
					//context.drawImage(video, video.currentTime/video.duration*(820-400), 30+i*330, 400, 240);//larger
					context.drawImage(video, (p0-3)*170, 35+i*228, 190, 160);//larger
				}
		        //var dataURL = myCanvas.toDataURL();
		        if(video.currentTime>=video.duration){
		        	ifend[i]=1;
		        }
		        var k=0;
		        while(ifend[k]!=0&&k<ifend.length){
		        	k++;
		        }
		        if(k==ifend.length) clearInterval(interval);
		       }
	       }
	       p0++;
		}, inter);
	}
	else{
		if(num_ges<1){
			alert("Please select at least a gesture.");			
		}
		else{
			alert("Please select at least a country.");			
		}
	}
};
