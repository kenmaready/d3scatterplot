(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(t,e,a){},16:function(t,e,a){"use strict";a.r(e);var n=a(1),r=a.n(n),o=a(3),i=a.n(o),c=a(4),s=a(5),d=a(7),l=a(6),p=a(8),u=a(0),y=(a(15),function(t){function e(){return Object(c.a)(this,e),Object(d.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){var t=new XMLHttpRequest;t.open("GET","https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json",!0),t.send(),t.onload=function(){var e=JSON.parse(t.responseText).map(function(t){var e=Math.floor(t.Seconds/60),a=t.Seconds%60,n=new Date;n.setMinutes(e),n.setSeconds(a);var r=new Date("January 1, 1960 00:00:00");return r.setFullYear(t.Year),{name:t.Name,country:t.Nationality,time:n,seconds:t.Seconds,year:r,doping:""===t.Doping?0:1,dopingText:t.Doping}}),a=new Date(u.d(e,function(t){return t.year})),n=new Date(u.c(e,function(t){return t.year}));a.setFullYear(a.getFullYear()-1),n.setFullYear(n.getFullYear()+1);var r=u.e().domain([a,n]).range([60,840]),o=new Date(u.d(e,function(t){return t.time}).getTime()),i=new Date(u.c(e,function(t){return t.time}).getTime());o.setSeconds(o.getSeconds()-15),i.setSeconds(i.getSeconds()+15);var c=u.e().domain([i,o]).range([540,60]),s=u.a(r),d=u.b(c).tickFormat(u.g("%M:%S")),l=u.f("#chart").append("svg").attr("preserveASpectRatio","xMinYMin meet").attr("viewBox","0 0 900 600").attr("id","chart-content"),p=u.f("#chart").append("div").attr("class","tooltip").attr("id","tooltip").style("opacity",0);l.selectAll("circle").data(e).enter().append("circle").attr("class","dot").attr("data-xvalue",function(t){return t.year}).attr("data-yvalue",function(t){return t.time}).attr("r",5).attr("cx",function(t){return r(t.year)}).attr("cy",function(t){return c(t.time)}).attr("fill",function(t){return t.doping?"#ff5252":"#607d8b"}).on("mouseover",function(t,e){p.transition().duration(200).style("opacity",.9),p.html("<strong>"+t.name+"</strong><br>\n                                   <strong>Time: </strong>"+t.time.getMinutes()+":"+t.time.getSeconds()+"<br><strong>Country: </strong>"+t.country+"<br>"+(t.doping?t.dopingText:"")).style("left",60+r(t.year)+"px").style("top",c(t.time)+"px").attr("data-year",t.year)}).on("mouseout",function(t){p.transition().duration(200).style("opacity",0)}),l.append("text").attr("x",450).attr("y",30).attr("text-anchor","middle").attr("font-size","24px").attr("id","title").text("Doping in Professional Cycling"),l.append("text").attr("x",450).attr("y",60).attr("text-anchor","middle").attr("font-size","18px").text("35 Fastest Times Up the Alpe D'Huez"),l.append("g").attr("transform","translate(0,540)").attr("id","x-axis").call(s),l.append("g").attr("transform","translate(60, 0)").attr("id","y-axis").call(d);l.append("rect").attr("x",700).attr("y",70).attr("width",140).attr("height",80).style("fill","lightgray"),l.append("text").attr("x",714).attr("y",94).text("legend:"),l.append("circle").attr("cx",720).attr("cy",110).attr("r",6).style("fill","#ff5252"),l.append("circle").attr("cx",720).attr("cy",130).attr("r",6).style("fill","#607d8b"),l.append("text").attr("x",732).attr("y",114).text("doping"),l.append("text").attr("x",732).attr("y",134).text("no doping")}}},{key:"render",value:function(){return r.a.createElement("div",{className:"ui container"},r.a.createElement("div",{className:"ui segment",id:"chart-container"},r.a.createElement("div",{id:"chart"})))}}]),e}(r.a.Component));i.a.render(r.a.createElement(y,null),document.getElementById("root"))},9:function(t,e,a){t.exports=a(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.e9007b41.chunk.js.map